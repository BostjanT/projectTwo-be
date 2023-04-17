import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangeProfile } from 'src/auth/dto/ChangeProfile.dto';
import { SignUpDto } from 'src/auth/dto/SignUpDto.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async getUser(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create(signUp: SignUpDto) {
    return await this.userRepository.save(signUp);
  }

  async update(updateUserDto: ChangeProfile, id: string) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
