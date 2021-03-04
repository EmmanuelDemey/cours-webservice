import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Person, PersonService } from './person';
import * as mysql from 'mysql2'
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    controllers: [AppController],
    imports: [
        SequelizeModule.forFeature([Person]),
    ],
    providers: [
        PersonService,
        {
            provide: 'BDD_CONNEXION',
            useValue: mysql.createConnection({
                host: 'localhost',
                port: 3307,
                user: 'root',
                password: 'root',
                database: 'test_db'
            })
        }
    ]
})
export class ProductModule { }
