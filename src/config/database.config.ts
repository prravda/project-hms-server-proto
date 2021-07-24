import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { Machine } from '../database/machine.entity';
import { Memo } from '../database/memo.entity';
import { CheckLog } from '../database/check-log.entity';
import { Location } from '../database/location.entity';

export interface DatabaseConfigOptions {
  dev: ConnectionOptions;
  local: ConnectionOptions;
  testing: ConnectionOptions;
}

export default registerAs('database', (): DatabaseConfigOptions => {
  const baseOptions = {
    entities: [Location, Machine, Memo, CheckLog],
  };
  return {
    dev: {
      type: 'mysql',
      database: String(process.env.DATABASE_DEV_NAME),
      port: 3306,
      username: process.env.DATABASE_DEV_USER,
      password: process.env.DATABASE_DEV_PASSWORD,
      host: process.env.DATABASE_DEV_HOST,
      synchronize: true,
      ...baseOptions,
    },
    local: {
      type: 'mysql',
      database: String(process.env.DATABASE_DEV_NAME),
      port: 3306,
      username: process.env.DATABASE_LOCAL_USER,
      password: process.env.DATABASE_LOCAL_PASSWORD,
      host: process.env.DATABASE_LOCAL_HOST,
      synchronize: true,
      ...baseOptions,
    },
    testing: {
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      synchronize: true,
      ...baseOptions,
    },
  };
});
