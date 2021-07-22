import { ComponentValidation } from '../component-validation'
import ObjectId from 'mongoose'
import { InvalidField } from '../../errors'

export class ObjectIdValidator implements ComponentValidation {
  private readonly paramName: string
  constructor(paramName: string) {
    this.paramName = paramName
  }

  validate(request: any): Error | null {
    if (!ObjectId.isValidObjectId(request[this.paramName])) {
      return new InvalidField(this.paramName)
    }
    return null
  }
}
