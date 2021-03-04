import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ProductModule } from './person/product.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Address, AddressPerson, Person } from './person/person';

@Module({
  imports: [ProductModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'bssgj5mfj4jjtglndhrv-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'ubavlvariht7wz6h',
      password: 'mWVRQVIQCqL2QU6OrUNk',
      database: 'bssgj5mfj4jjtglndhrv',
      models: [
        Person as any,
        AddressPerson as any,
        Address as any
      ],
    })],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
