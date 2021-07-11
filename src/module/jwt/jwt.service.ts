import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtSigned } from './interface/jwt.interface';

@Injectable()
export class JwtAuthenticationService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signToken(sign: JwtSigned) {
    return await this.jwtService.signAsync(sign);
  }

  async verifyClaims(token) {
    const publicKey = this.configService.get('jwt.publicKey');
    const algorithms = [this.configService.get('jwt.algorithm')];
    const secret = Buffer.from(publicKey, 'base64').toString('utf-8');
    let claims;

    try {
      claims = await this.jwtService.verifyAsync(token?.split(' ')[1], {
        secret,
        algorithms,
      });
    } catch (error) {
      throw new HttpException('Invalid jwt token', HttpStatus.BAD_REQUEST);
    }
    return claims;
  }
}
