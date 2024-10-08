import { Module } from '@nestjs/common';
import { TypeOrmUserPersistenceModule } from './typeorm-persistence.module';

@Module({})
export class UserInfrastructureModule {
  static use(driver: 'in-file' | 'in-memory' | 'typeorm') {
    let persistenceModule;

    if (driver === 'typeorm') {
      persistenceModule = TypeOrmUserPersistenceModule;
    } else if (driver === 'in-file' || driver === 'in-memory') {
      throw new Error('Persistencia ainda nao implementada.');
    } else {
      throw new Error('Driver invalido.');
    }

    return {
      module: UserInfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    };
  }
}
