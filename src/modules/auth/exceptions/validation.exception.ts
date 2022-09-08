import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * @class
 * @name ValidationException
 * @extends HttpException
 * @classdesc Класс расширяющий стандартный класс ошибки.
 */
export class ValidationException extends HttpException {
  public messages: string[];

  /**
   * @constructor
   * @param {string[]} response - Список сообщений об ошибках.
   */
  constructor(response: string[]) {
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
