import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtAuthenticationService } from './jwt.service';

// https://rietta.com/blog/openssl-generating-rsa-key-from-command/
@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const privateKey = configService.get('jwt.privateKey');
        const expiresIn = configService.get('jwt.expiresIn');
        const algorithm = configService.get('jwt.algorithm');
        const secret = Buffer.from(privateKey, 'base64').toString('utf-8');
        const options: JwtModuleOptions = {
          secret,
          signOptions: { expiresIn, algorithm },
        };
        return options;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthenticationService],
  exports: [JwtAuthenticationService],
})
export class JwtAuthenticationModule {}
