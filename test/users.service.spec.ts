import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/users/application/users.service';
import { User } from '../src/users/domain/user';

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
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(UsersService)
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

  test.failing("Não deve criar um email se for encontrado", () => {
    const userCreated = service.create(userTest)

    if(userCreated instanceof User) {
      const userClone = service.create(userTest) 
      expect(userClone).toBeInstanceOf(User)
    }
  })
});
