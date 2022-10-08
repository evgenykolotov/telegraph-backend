import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from '../exceptions/validation.exception';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  public async transform(value: any, data: ArgumentMetadata): Promise<void> {
    const errors = await validate(plainToClass(data.metatype, value));
    if (errors.length) {
      throw new ValidationException(this.getErrorMessages(errors));
    }
    return value;
  }

  private getErrorMessages(erorrs: ValidationError[]): string[] {
    return erorrs.map((error) => this.mapErrorMessage(error));
  }

  private mapErrorMessage(error: ValidationError): string {
    return `${error.property} - ${this.parseConstraint(error.constraints)}`;
  }

  private parseConstraint(constraints: ValidationError['constraints']): string {
    return Object.values(constraints).join(', ');
  }
}
