import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductModule } from './person/product.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Person } from './person/person';

@Module({
  imports: [ProductModule, 
    SequelizeModule.forRoot({
    dialect: 'mysql',
    host: 'localhost',
    port: 3307,
    username: 'root',
    password: 'root',
    database: 'test_db',
    models: [Person as any],
  })],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
