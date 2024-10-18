import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../application/users.service';
import { UsersController } from '../http/users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {
    createOrFind: jest.fn(),
    findUserByEmail: jest.fn(),
    modifyWeight: jest.fn(),
    modifyCityAndState: jest.fn(),
    deleteUser: jest.fn()
  };
  const dtoTest = {
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
      controllers: [UsersController],
      providers: [{provide: UsersService, useValue: mockUsersService}],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call the service to create a user', async () => {
    jest.spyOn(mockUsersService, 'createOrFind').mockResolvedValue('Usuário cadastrado com sucesso');
    const createUserDto = {
      ...dtoTest
    };
    const result = await controller.create(createUserDto);
    expect(result).toBe('Usuário cadastrado com sucesso');
  });

  it('should call the service to find a user by email', async () => {
    jest.spyOn(mockUsersService, 'findUserByEmail').mockResolvedValue({
      ...dtoTest
    });
    const result = await controller.findUserByEmail(dtoTest.email);
    expect(result).toEqual(dtoTest);
  });

  it('should call the service to update the user weight', async () => {
    jest.spyOn(mockUsersService, 'modifyWeight').mockResolvedValue('Peso atualizado');
    const updateUser = {
      password: dtoTest.password,
      weight: 60
    };
    const result = await controller.updateWeight(dtoTest.email, updateUser);
    expect(result).toBe('Peso atualizado');
  });

  it('should call the service to update the user location', async () => {
    jest.spyOn(mockUsersService, 'modifyCityAndState').mockResolvedValue('Localização atualizada');
    const updateUser = {
      password: dtoTest.password,
      city: 'São Paulo',
      state: 'SP'
    };
    const result = await controller.updateLocation(dtoTest.email, updateUser);
    expect(result).toBe('Localização atualizada');
  });

  it('should call the service to delete a user', async () => {
    jest.spyOn(mockUsersService, 'deleteUser').mockResolvedValue('Usuário deletado com sucesso');
    const deleteUserDto = {
      password: dtoTest.password
    };
    const result = await controller.deleteUser(dtoTest.email, deleteUserDto);
    expect(result).toBe('Usuário deletado com sucesso');
  });
});
