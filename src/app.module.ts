import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/application/user.module';
import { UserService } from './user/application/user.service';
import { CoreModule } from './user/core/core.module';
import { UserInfrastructureModule } from './user/infrastructure/typeorm/user-infrastructure.module';
import { ApplicationBootstrapOptions } from './user/core/application-bootstrap-options.interface';

@Module({
  imports: [ CoreModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options), // Aqui entram as opções de configuração do banco de dados
        UserModule.withInfrastructure(
          UserInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
