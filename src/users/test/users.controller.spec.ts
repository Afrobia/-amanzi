import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../application/users.service';
import { UsersController } from '../http/users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {};

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
});
