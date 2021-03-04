import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { DefaultScope, Column, Table, Model, PrimaryKey, AutoIncrement, HasOne, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';

@Table({ tableName: "address", timestamps: false })
export class Address extends Model {
    departement: string;

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

    @ApiProperty({})
    @ForeignKey(() => Person)
    @Column
    parent_1: string

    @ApiProperty({})
    @ForeignKey(() => Person)
    @Column
    parent_2: string

    @ApiProperty({})
    @BelongsTo(() => Person, 'parent_1')
    parent1: Person

    @ApiProperty({})
    @BelongsTo(() => Person, 'parent_2')
    parent2: Person

    @ApiProperty({})
    @BelongsToMany(() => Address, () => AddressPerson)
    addresses: Address[]

    @ApiProperty({})
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number

    @ApiProperty({})
    @Column
    firstName: string

    @ApiProperty({})
    @Column
    @IsString()
    lastName: string

    @ApiProperty({
        description: "Email de la personne",
        example: "mail@company.org"
    })
    @Column
    @IsString()
    @IsEmail()
    email: string;
}


@Injectable()
export class PersonService {
    constructor(
        @InjectModel(Person) private personModel: typeof Person,
        private httpService: HttpService) { }

    getAllPeople(sort: string = "id"): Promise<Person[]> {
        return this.personModel.findAll({
            order: [[sort, 'DESC']],
            include: { all: true }
        })
    }
    async getOnePerson(id: string): Promise<Person> {


        const person = await this.personModel.findOne({
            where: {
                id
            },
            include: { all: true }
        })

        const addresses = await Promise.all(person.addresses.map(async address => {
            const departement = address.zipCode.substr(0, 2);
            const result = await this.httpService.get("https://geo.api.gouv.fr/departements/" + departement + "?fields=nom,code,codeRegion").toPromise()
            address.departement = result.data
            return address
        }))

        return person
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
