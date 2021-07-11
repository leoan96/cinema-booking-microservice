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
    const publickKey = this.configService.get('jwt.publicKey');
    const secret = Buffer.from(publickKey, 'base64').toString('utf-8');
    let claims;
    try {
      claims = await this.jwtService.verifyAsync(token?.split(' ')[1], {
        secret,
        algorithms: ['RS512'],
      });
    } catch (error) {
      throw new HttpException('Invalid jwt token', HttpStatus.BAD_REQUEST);
    }
    return claims;
  }
}
