import { PartialType } from '@nestjs/mapped-types';
import { CheckLog } from '../../database/check-log.entity';

export class CreateCheckLogDto extends PartialType(CheckLog) {}
