import { registerAs } from '@nestjs/config';
import { Machine } from '../database/machine.entity';
import { Memo } from '../database/memo.entity';
import { CheckLog } from '../database/check-log.entity';
import { Location } from '../database/location.entity';

export default registerAs('database', () => {
  const baseOptions = {
    entities: [Location, Machine, Memo, CheckLog],
  };
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        type: 'mysql',
        database: String(process.env.DATABASE_DEV_NAME),
        port: 3306,
        username: process.env.DATABASE_DEV_USER,
        password: process.env.DATABASE_DEV_PASSWORD,
        host: process.env.DATABASE_DEV_HOST,
        synchronize: true,
        ...baseOptions,
      };
    case 'local':
      return {
        type: 'mysql',
        database: String(process.env.DATABASE_LOCAL_NAME),
        port: 3306,
        username: process.env.DATABASE_LOCAL_USER,
        password: process.env.DATABASE_LOCAL_PASSWORD,
        host: process.env.DATABASE_LOCAL_HOST,
        synchronize: true,
        ...baseOptions,
      };
    default:
      return {
        type: 'mysql',
        database: String(process.env.DATABASE_DEV_NAME),
        port: 3306,
        username: process.env.DATABASE_LOCAL_USER,
        password: process.env.DATABASE_LOCAL_PASSWORD,
        host: process.env.DATABASE_LOCAL_HOST,
        synchronize: true,
        ...baseOptions,
      };
  }
});
