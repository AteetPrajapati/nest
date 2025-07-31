import { CreateUserDto, LoginDto } from '@/common/dto';
import { User, UserDocument } from '@/database/mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtservice: JwtService,
  ) {}

  async register(data: CreateUserDto) {
    try {
      const item = await this.userModel.create(data);
      return item;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(data: LoginDto) {
    const user = await this.userModel.findOne({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };
    const accessToken = this.jwtservice.sign(payload, {
      expiresIn: '1h',
      secret: process.env.jwtSecret,
    });
    const refreshToken = this.jwtservice.sign(payload, {
      expiresIn: '7d',
      secret: process.env.jwtSecret,
    });
    return {
      status: true,
      message: 'Login successful!!',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    };
  }

  async refreshToken(token: string) {
    try {
      const decoded = this.jwtservice.verify(token);
      const payload = await this.userModel.findById(decoded.sub);
      if (!payload) {
        throw new UnauthorizedException('Invalid Token');
      }
      const newAccessToken = this.jwtservice.sign(
        { sub: payload._id, email: payload.email, role: payload.role },
        { expiresIn: '15m' },
      );
      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
