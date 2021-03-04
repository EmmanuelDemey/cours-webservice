import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonService, Person } from './person';


@Controller("person")
@ApiTags("person")
export class AppController {


  constructor(private readonly personService: PersonService) { }

  @ApiOperation({
    description: "Ceci est le endpoint permettant de supprimer une personne"
  })
  @ApiResponse({ status: 200, description: "L'objet a bien été supprimé" })
  @ApiResponse({ status: 404, description: "L'objet n'existe pas" })
  @Delete(":id")
  deleteOnePerson(@Param("id") id: string): Promise<any> {
    return this.personService.deleteOnePerson(id);
  }

  @Put(":id")
  updatePerson(@Param("id") id: string, @Body() person: Person) {
    this.personService.updateOnePerson(id, person);
  }

  //http://localhost:3000/person?sort=firstName
  @Get()
  getAllPeople(@Query("sort") sort: string): Promise<Person[]> {
    return this.personService.getAllPeople(sort)
  }

  @Get(":id")
  getOnePerson(@Param("id") id: string): Promise<Person> {
    return this.personService.getOnePerson(id);
  }

  @Post()
  addPerson(@Body() person: Person) {
    this.personService.addPerson(person);
  }


  //Supprimer une personne

}
