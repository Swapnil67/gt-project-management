import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { DB_CONN_URL, DB_PASSWORD } from './gt.properties';

const MONGO_URL = DB_CONN_URL.replace('<password>', DB_PASSWORD);

@Module({
  imports: [AdminModule, MongooseModule.forRoot(MONGO_URL)],
  controllers: [],
})
export class AppModule {}
