import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  gethello(): string {
    return 'hello world!';
  }
}
