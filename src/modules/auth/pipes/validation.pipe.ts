import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';

/**
 * @class
 * @name ValidationPipe
 * @implements {PipeTransform}
 * @classdesc Класс для вывода динамических ошибок при валидации.
 */
@Injectable()
export class ValidationPipe implements PipeTransform {
  /**
   * Метод реализующий интерфейс валидации.
   * @public
   * @param {any} value - Значение для проверки.
   * @param {ArgumentMetadata} metadata - Метаинформация для валидации.
   * @throws {ValidationException} - Динамическое сообщение об ошибке.
   * @returns {any} - Валидируемое сообщение.
   */
  public async transform(
    value: any,
    metadata: ArgumentMetadata,
  ): Promise<void> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length) {
      const messages = errors.map(
        (error) =>
          `${error.property} - ${Object.values(error.constraints).join(', ')}`,
      );
      throw new ValidationException(messages);
    }

    return value;
  }
}
