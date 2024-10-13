import { Test, TestingModule } from '@nestjs/testing';
import { USERS_SERVICE_TOKEN, UsersService } from '../application/users.service';
import { User } from '../domain/model/user';
import { Repository } from 'typeorm';
import { UserEntity } from '../infrastructure/typeOrm/user.entity';
import { USER_REPO_TOKEN, UserRepositoryInterface } from '../application/ports/user-repository';




describe('UsersService', () => {
  let service: UsersService;
  const userTest = {
    name:"Beatriz Santana",
    email: "beatriz@gmail.com",
    password: "1584biA.",
    yearOfBirth: 2004
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[],
      providers: [UsersService,],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined()
  });

  test('Deve instânciar um usuario',() => {
    const userCreated = service.create(userTest)
    
    expect(userCreated).toBeInstanceOf(User)
  })

  test('Deve instânciar um usuario',() => {
    const userCreated = service.create(userTest)
    
    if(userCreated instanceof User){
      expect(userCreated.getName()).toBe(userTest.name);
      expect(userCreated.getEmail()).toBe(userTest.email)
      expect(userCreated.getPassword()).toBe(userTest.password)
    }
  })

  test("Não deve criar um email se for encontrado", () => {
    const userCreated = service.create(userTest)

    if(userCreated instanceof User) {
      const userClone = service.create(userTest) 
      expect(userClone).toBeInstanceOf(User)
    }
  })
});
