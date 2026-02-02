import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

type DbCredentials = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

const currentEnv = process.env.APP_ENV;

function parseDatabaseCredentials(): DbCredentials {
  const raw = process.env.DATABASE_CREDENTIALS;

  if (raw && raw.trim().length > 0) {
    const parsed = JSON.parse(raw) as Partial<DbCredentials> & {
      port?: number | string;
    };

    return {
      host: parsed.host ?? 'localhost',
      port: Number(parsed.port ?? 5432),
      username: parsed.username ?? 'postgres',
      password: parsed.password ?? '',
      database: parsed.database ?? 'postgres',
    };
  }

  return {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'postgres',
  };
}

const databaseCredentials = parseDatabaseCredentials();

const createConnectionOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: databaseCredentials.host,
  port: databaseCredentials.port,
  username: databaseCredentials.username,
  password: databaseCredentials.password,
  database: databaseCredentials.database,
  logging: ['development'].includes(currentEnv) ? true : ['error'],
  synchronize: true,
  migrationsRun: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
};

export default createConnectionOptions;
