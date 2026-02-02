import 'reflect-metadata';

import { DataSource } from 'typeorm';

import createConnectionOptions from '../../ormconfig';

export const AppDataSource = new DataSource(createConnectionOptions as any);

export default AppDataSource;
