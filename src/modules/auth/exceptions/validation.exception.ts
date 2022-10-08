import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  public messages: string[];

  constructor(response: string[]) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
