import { v4 as uuidv4 } from 'uuid';
import * as httpContext from 'express-http-context';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { CORRELATION_ID } from './constant/httpContext.constants';

export const setCorrelationId = (req, res, next) => {
  const correlationId = (req.correlationId = createUUID());
  httpContext.set(CORRELATION_ID, correlationId);
  next();
};

export const createUUID = (): string => {
  return uuidv4();
};

export const verifyBackendToken = (
  request: Request,
  configService: ConfigService,
) => {
  const token = request.headers.authorization?.split(' ')[1];
  const backendToken = configService.get<string>('BACKEND_TOKEN');
  return backendToken === token;
};
