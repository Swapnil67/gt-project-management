import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DB_CONN_URL, DB_PASSWORD } from './db_constants';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';

dotenv.config({
    path: './.env'
})



const MONGO_URL = DB_CONN_URL.replace('<password>', DB_PASSWORD);

@Module({
  imports: [MongooseModule.forRoot(MONGO_URL), UserModule, AuthModule],
})
export class AppModule {}
