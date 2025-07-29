import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: string; // optional; will default to 'user'
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
