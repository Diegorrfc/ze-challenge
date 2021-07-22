import { InvalidField, MissingField } from '../../errors'
import { ComponentValidation } from '../component-validation'

export class CompositeAddressValidator implements ComponentValidation {
  private readonly fieldsName: string[] = ['type', 'coordinates']

  validate(request: any): Error | null {
    for (const fieldname of this.fieldsName) {
      if (!request.address[fieldname]) {
        return new MissingField(`address.${fieldname}`)
      }
    }

    if (request.address.type !== 'Point') {
      return new InvalidField('address.type')
    }
    return null
  }
}
