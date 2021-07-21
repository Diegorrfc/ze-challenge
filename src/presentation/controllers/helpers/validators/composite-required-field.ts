import { MissingField } from '../errors'
import { ComponentValidation } from './component-validation'

export class CompositeBodyRequiredField implements ComponentValidation {
  private readonly fieldName: string
  constructor(fieldName: string) {
    this.fieldName = fieldName
  }

  validate(request: any): Error | null {
    if (!request[this.fieldName]) {
      return new MissingField(this.fieldName)
    }
    return null
  }
}
