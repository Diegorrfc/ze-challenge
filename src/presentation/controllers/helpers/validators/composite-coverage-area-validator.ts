import { InvalidField, MissingField } from '../errors'
import { ComponentValidation } from './component-validation'

export class CompositeCoverageAreaValidator implements ComponentValidation {
  private readonly fieldsName: string[] = ['type', 'coordinates']

  validate(request: any): Error | null {
    for (const fieldname of this.fieldsName) {
      if (!request.coverageArea[fieldname]) {
        return new MissingField(`coverageArea.${fieldname}`)
      }
    }

    if (request.coverageArea.type !== 'MultiPolygon') {
      return new InvalidField('coverageArea.type')
    }
    return null
  }
}
