import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IsEmail, IsString } from 'class-validator';
import { Column, Table, Model, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({ tableName: 'person', timestamps: false, })
export class Person extends Model<Person>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    firstName: string

    @Column
    @IsString()
    lastName: string

    @Column
    @IsString()
    @IsEmail()
    email: string;
}

@Injectable()
export class PersonService {
    constructor(@InjectModel(Person) private personModel: typeof Person) { }

    getAllPeople(sort: string = "id"): Promise<Person[]> {
        return this.personModel.findAll({
            order: [[sort, 'DESC']]
        })
    }
    getOnePerson(id: string): Promise<Person> {
        return this.personModel.findOne({
            where: {
                id
            }
        })
    }
    addPerson(person: Person) {
        this.personModel.create(person)
    }

    deleteOnePerson(id: string): Promise<any> {
        return this.personModel.destroy({ where: { id } })
    }

    updateOnePerson(id: string, person: Person) {
        return this.personModel.update(person, {
            where: { id }
        })
    }
}
