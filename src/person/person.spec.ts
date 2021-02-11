import { Test, TestingModule } from '@nestjs/testing';
import { Person } from './person';

describe('Person', () => {
  let provider: Person;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Person],
    }).compile();

    provider = module.get<Person>(Person);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
