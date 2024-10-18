import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UserEntity } from '../users/infrastructure/typeOrm/user.entity';


config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: 5433,
  host: 'localhost',
  username: 'postgres',
  password: '3060908070',
  database: 'postgres',
  entities: [UserEntity],
  synchronize: true,
  migrations: [__dirname + '/migrations/*.ts'],
  migrationsRun: true,
});

AppDataSource.initialize()
.then(() => {
  console.log("Data Source has been initialized!")
})
.catch((err) => {
  console.error("Error during Data Source initialization", err)
});