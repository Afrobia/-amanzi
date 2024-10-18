import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../application/users.service';
import { User } from '../domain/model/user';
import { USER_REPO_TOKEN, UserRepositoryInterface } from '../application/ports/user-repository';
import { CreateUserDto } from '../http/dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepositoryInterface: UserRepositoryInterface;
  const userTest = {
    name:"Beatriz Santana",
    email: "beatriz@gmail.com",
    password: "1584biA.",
    weight: 50,
    yearOfBirth: 2004,
    city: "cidade",
    state: "estado"
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[],
      providers: [UsersService, {
        provide: USER_REPO_TOKEN,
        useValue: {
          registerUser: jest.fn(),
          findEmail: jest.fn(),
          getAllUsers: jest.fn(),
          modifySave: jest.fn(),
          deleteUser: jest.fn()
        }
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepositoryInterface = module.get<UserRepositoryInterface>(USER_REPO_TOKEN);
  });

  it('service should be defined', () => {
    expect(service).toBeDefined()
  });

  it('repository should be defined', () => {
    expect(userRepositoryInterface).toBeDefined()
  });

  it('should call the interface to create a user', async () => {
    jest.spyOn(userRepositoryInterface, 'registerUser').mockResolvedValue(new User(
      userTest.name,
      userTest.email,
      userTest.password,
      userTest.weight,
      userTest.yearOfBirth,
      userTest.city,
      userTest.state
    ));
    const userCreated = await service.create(userTest);
    expect(userRepositoryInterface.registerUser).toHaveBeenCalled();
    expect(userCreated).toBeInstanceOf(User);
  })

  it('Deve instânciar um usuario com os dados devidos', async () => {
    const userToBeCreated = new User(
      userTest.name,
      userTest.email,
      userTest.password,
      userTest.weight,
      userTest.yearOfBirth,
      userTest.city,
      userTest.state
    );
    jest.spyOn(userRepositoryInterface, 'registerUser').mockResolvedValue(userToBeCreated);

    const userCreated = await service.create(userTest);
    expect(userCreated).toMatchObject(userToBeCreated);
  })
  
  it('finds user by email when it exists', async () => {
    const userToBeFound = new User(
      userTest.name,
      userTest.email,
      userTest.password,
      userTest.weight,
      userTest.yearOfBirth,
      userTest.city,
      userTest.state
    );
    jest.spyOn(userRepositoryInterface, 'findEmail').mockResolvedValue(userToBeFound);

    const userFound = await service.findUserByEmail(userTest.email);
    expect(userFound).toMatchObject(userToBeFound);
  });

  it('does not find user by email when it does not exists', async () => { 
    expect(
    service.findUserByEmail(userTest.email)
    ).rejects.toThrowError(NotFoundException);
  });

  it('should return all users', async () => {
    const users = [new User(
      userTest.name,
      userTest.email,
      userTest.password,
      userTest.weight,
      userTest.yearOfBirth,
      userTest.city,
      userTest.state
    ),
    new User(
      "Ava Pimmel Correa",
      "avapcorrea@gmail.com",
      "senha123*",
      80,
      2000,
      'Goiânia',
      'GO'
    )
  ];
    jest.spyOn(userRepositoryInterface, 'getAllUsers').mockResolvedValue(users);

    const usersFound = await service.findAllUsers();
    expect(usersFound).toMatchObject(users);
  });

  it('should modify weight', async () => {
    const userToBeModified = new User(
      userTest.name,
      userTest.email,
      userTest.password,
      userTest.weight,
      userTest.yearOfBirth,
      userTest.city,
      userTest.state
    );
    jest.spyOn(userRepositoryInterface, 'findEmail').mockResolvedValue(userToBeModified);
    jest.spyOn(userRepositoryInterface, 'modifySave').mockResolvedValue(userToBeModified);

    const userModified = await service.modifyWeight(userTest.email, userTest.password, 60);
    expect(userModified.getWeight()).toBe(60);
  });

  it('should throw an error when the password is incorrect', async () => {
    const userToBeModified = new User(
      userTest.name,
      userTest.email,
      userTest.password,
      userTest.weight,
      userTest.yearOfBirth,
      userTest.city,
      userTest.state
    );
    jest.spyOn(userRepositoryInterface, 'findEmail').mockResolvedValue(userToBeModified);

    await expect(service.modifyWeight(userTest.email, "wrongPassword", 60)).rejects.toThrowError('Senha incorreta');
  });

  it('should modify city and state', async () => {
    const userToBeModified = new User(
      userTest.name,
      userTest.email,
      userTest.password,
      userTest.weight,
      userTest.yearOfBirth,
      userTest.city,
      userTest.state
    );
    jest.spyOn(userRepositoryInterface, 'findEmail').mockResolvedValue(userToBeModified);
    jest.spyOn(userRepositoryInterface, 'modifySave').mockResolvedValue(userToBeModified);

    const userModified = await service.modifyCityAndState(userTest.email, userTest.password, "Goiânia", "GO");
    expect(userModified.getCity()).toBe("Goiânia");
    expect(userModified.getState()).toBe("GO");
  });

  it('should delete a user', async () => {
    const userToBeDeleted = new User(
      userTest.name,
      userTest.email,
      userTest.password,
      userTest.weight,
      userTest.yearOfBirth,
      userTest.city,
      userTest.state
    );
    jest.spyOn(userRepositoryInterface, 'findEmail').mockResolvedValue(userToBeDeleted);
    jest.spyOn(userRepositoryInterface, 'deleteUser').mockResolvedValue(userToBeDeleted);

    const userDeleted = await service.deleteUser(userTest.email, userTest.password);
    expect(userDeleted).toEqual('Usuário deletado com sucesso!');
  });
});
