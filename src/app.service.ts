import { injectable } from '@nestjs/common';

@injectable()
export class appservice {
  gethello(): string {
    return 'hello world!';
  }
}
