import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PersonService, Person } from './person';


@Controller("person")
export class AppController {
  
  
  constructor(private readonly personService: PersonService) {}

  @Delete(":id")
  deleteOnePerson(@Param("id") id:string): Promise<any> {
    return this.personService.deleteOnePerson(id);
  }

  @Put(":id")
  updatePerson(@Param("id") id:string, @Body() person: Person){
    this.personService.updateOnePerson(id, person); 
  }

  //http://localhost:3000/person?sort=firstName
  @Get()
  getAllPeople(@Query("sort") sort:string): Promise<Person[]> {
    return this.personService.getAllPeople(sort)
  }

  @Get(":id")
  getOnePerson(@Param("id") id:string): Promise<Person> {
    return this.personService.getOnePerson(id);
  }

  @Post()
  addPerson(@Body() person: Person){
    this.personService.addPerson(person);
  }


  //Supprimer une personne
  
}
