import { ComponentValidation } from '../component-validation'
import { InvalidField } from '../../errors'

export class CoordinatorValidator implements ComponentValidation {
  private static readonly longitudeParamName = 'longitude'
  private static readonly latitudeParamName = 'latitude'

  validate(request: any): Error | null {
    const longitudeValue: number = request[CoordinatorValidator.longitudeParamName]
    if (longitudeValue < -180 || longitudeValue > 180) {
      return new InvalidField(CoordinatorValidator.longitudeParamName)
    }
    const latitudeValue: number = request[CoordinatorValidator.latitudeParamName]
    if (latitudeValue < -90 || latitudeValue > 90) {
      return new InvalidField(CoordinatorValidator.latitudeParamName)
    }
    return null
  }
}
