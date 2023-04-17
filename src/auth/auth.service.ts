import { UpdatePasswordDto } from './dto/UpdatePassword.dto';
import { BadRequestException, HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/SignUpDto.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/LoginDto.dto';
import { User } from 'src/entities/user.entity';
import { ChangeProfile } from './dto/ChangeProfile.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(private userService: UserService, private jwtService: JwtService) {}

  // SignUp User
  async signupUser(signUpDto: SignUpDto): Promise<any> {
    const user = await this.userService.getUser(signUpDto.email);

    if (user) {
      this.logger.error('User already exists');
      throw new HttpException('Conflict, user exists', HttpStatus.CONFLICT);
    }

    const hashed = await this.hashPassword(signUpDto.password);
    const newUser = await this.userService.create({
      ...signUpDto,
      password: hashed
    });

    const token = await this.loginToken(newUser);
    return token;
  }

  //Validate user
  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser(email);

    if (!user) throw new BadRequestException('User does not exist');

    const matchPasswords = await bcrypt.compare(user.password, password);

    if (!matchPasswords) throw new BadRequestException('Password is incorrect!');

    const token = await this.loginToken(user);
    return token;
  }

  //Login User
  async loginUser(loginDto: LoginDto): Promise<any> {
    const { email } = loginDto;
    const emailExist = await this.userService.getUser(email);
    const validateUser = await this.validateUser(loginDto.email, loginDto.password);

    try {
      if (!validateUser) {
        if (!emailExist) {
          this.logger.error(`User with this email: ${loginDto.email} does not exist`);
          throw new UnauthorizedException('Email does not exist!');
        } else {
          this.logger.error('User attempted to login with invalid credentials - email');
          throw new UnauthorizedException('Invalid credentials entered');
        }
      }
      const accessToken = await this.loginToken(validateUser);
      return accessToken;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials entered');
    }
  }

  //Login Token
  async loginToken(user: any) {
    const payload = { username: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  //Hash Password (validation)
  async hashPassword(password: string): Promise<any> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  // Update user Info
  async updateUserInfo(user: User, userInfo: ChangeProfile) {
    const { firstName, lastName, email } = userInfo;

    try {
      const loggedUser = await this.userService.getUser(email);
      loggedUser.firstName = firstName;
      loggedUser.lastName = lastName;
      loggedUser.email = email;

      this.logger.verbose(`User ${loggedUser.firstName} ${loggedUser.lastName} has successfully updated his data `);
    } catch (error) {
      this.logger.error(`User with email ${email} already exists`);
      throw new UnauthorizedException('User already exists');
    }
  }

  /*  async changePassword(updatePassword: UpdatePasswordDto, id: number): Promise<any> {
    const user = await this.userService.getUser();

    if (!user) throw new BadRequestException('User does not exist');

    const checkPass = user.password === updatePassword.password;

    if (!checkPass) throw new BadRequestException('Password is incorrect!');

    const newPassword = updatePassword.newPassword === updatePassword.retypeNewPassword;

    if (!newPassword) throw new BadRequestException('Password does not match! Please enter same password');

    const hashed = await this.hashPassword(updatePasswordDto.newPassword);

    const newUser = await this.userService.create({
      ...user,
      password: hashed
    });

    const token = await this.loginToken(newUser);
    return token;
  } */

  async logout(request: any, response: any): Promise<any> {
    const user = request['user'].sub;
    const userExists = await this.userService.getUser(user.email);
    if (!userExists) throw new Error('404 Not Found! User does not exist');

    try {
      response.setCookie('access_token', '', { expires: new Date(0) }).clearCookie('access_token');
      response.setCookie('refresh_token', '', { expires: new Date(0) }).clearCookie('refresh_token');
    } catch (error) {
      throw new Error('500 Internal server error');
    }
  }
}
