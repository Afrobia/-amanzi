import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmUserPersistenceModule } from "../infrastructure/typeorm/typeorm-persistence.module";
import { ApplicationBootstrapOptions } from "./application-bootstrap-options.interface";


@Module({})
export class CoreModule {
  static forRoot(options: ApplicationBootstrapOptions): DynamicModule {
    const imports = [];
    
    if (options.driver === 'typeorm') {
      imports.push(TypeOrmUserPersistenceModule)
    } else {
      throw new Error('Não foi implementado.')
    }

    return {
      module: CoreModule,
      imports,
    };
  }
}