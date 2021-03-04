import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IsEmail, IsString } from 'class-validator';
import { DefaultScope, Column, Table, Model, PrimaryKey, AutoIncrement, HasOne, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';

@Table({ tableName: "address", timestamps: false })
export class Address extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @Column
    numero: number;

    @Column
    street: string;

    @Column
    zipCode: string;

    @Column
    city: string;

    @BelongsToMany(() => Person, () => AddressPerson)
    addresses: Person[]
}

@Table({ tableName: "address_person", timestamps: false })
export class AddressPerson extends Model {

    @ForeignKey(() => Person)
    @Column
    person_id: string;

    @ForeignKey(() => Address)
    @Column
    address_id: string;
}

@Table({ tableName: 'person', timestamps: false, })
export class Person extends Model {

    @ForeignKey(() => Person)
    @Column
    parent_1: string

    @ForeignKey(() => Person)
    @Column
    parent_2: string

    @BelongsTo(() => Person, 'parent_1')
    parent1: Person

    @BelongsTo(() => Person, 'parent_2')
    parent2: Person

    @BelongsToMany(() => Address, () => AddressPerson)
    addresses: Address[]

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
            order: [[sort, 'DESC']],
            include: { all: true }
        })
    }
    getOnePerson(id: string): Promise<Person> {
        return this.personModel.findOne({
            where: {
                id
            },
            include: { all: true }
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
