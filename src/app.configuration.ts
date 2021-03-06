import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

export const appConfiguration = (configService: ConfigService) => ({
  cors: {
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Headers',
      'DNT',
      'X-CustomHeader',
      'Keep-Alive',
      'User-Agent',
      'X-Requested-With',
      'If-Modified-Since',
      'Cache-Control',
      'Content-Type',
    ],
  },
  session: {
    /* might exsist some difference if maxAge (session) & ttl (redis) since we are not using the redisStore for
        the store options here (due to configuring CacheModule to use redis)
      */
    secret: configService.get('app.session.secret'),
    resave: false,
    saveUninitialized: false,
    cookie: {
      // best practice is to set to true during production
      secure:
        configService.get('app.environment') === 'development' ? false : true,
      httpOnly: false,
      maxAge: 1000 * 60 * 10, // millisecond * second * minute (ToDo: put configuration to .env file)
    },
  },
});

export const initializeSwagger = (
  app: NestExpressApplication,
  configService: ConfigService,
) => {
  const appBaseUrl = configService.get('app.baseUrl');
  // Refer to link below: explains that the 'backendToken' is important for matching up with @ApiBearerAuth() in the controller
  // https://stackoverflow.com/questions/54802832/is-it-possible-to-add-authentication-to-access-to-nestjs-swagger-explorer
  const config = new DocumentBuilder()
    .setTitle('Booking API')
    .setDescription('Reserve ticket for purchase')
    .setVersion('1.0.0')
    .addTag('booking')
    .addTag('ticket')
    .addTag('admin')
    .addBearerAuth(
      {
        type: 'http',
        description: 'Auth for bearer token',
      },
      'backendToken',
    )
    .addBearerAuth(
      {
        type: 'apiKey',
        description: 'Auth for redis session',
        in: 'cookie',
        name: 'connect.sid',
      },
      'redisSessionCookie',
    )
    .addServer(appBaseUrl)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const writeSwaggerJson = (path: string, document) => {
    fs.writeFileSync(
      `${path}/swagger.json`,
      JSON.stringify(document, null, 2),
      {
        encoding: 'utf8',
      },
    );
  };
  writeSwaggerJson(`${process.cwd()}`, document);
  SwaggerModule.setup('api', app, document);
};
