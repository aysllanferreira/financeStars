// src/lambda.ts
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as serverless from 'aws-serverless-express';
import * as CookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import * as express from 'express';
import * as bodyParser from 'body-parser';

let cachedServer;

async function bootstrap(server) {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(CookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.init();
  return server;
}

export async function handler(event, context) {
  if (!cachedServer) {
    const server = express();
    cachedServer = serverless.createServer(await bootstrap(server));
  }
  return serverless.proxy(cachedServer, event, context, 'PROMISE').promise;
}
