import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UserEntity } from '../users/infrastructure/typeOrm/user.entity';


config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  port: 6543,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity],
  synchronize: false,
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