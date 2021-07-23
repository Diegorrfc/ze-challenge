import { ComponentValidation } from '../../../presentation/controllers/helpers/validators/component-validation'
import { CompositeValidator } from '../../../presentation/controllers/helpers/validators/composite-validator'
import { CoordinatorValidator } from '../../../presentation/controllers/helpers/validators/search-partner-request/composite-coordinator-validator'
import { CompositeRequiredField } from '../../../presentation/controllers/helpers/validators/composite-required-field'

export const searchPartneValidationFactory = (): ComponentValidation => {
  const fields: string[] = ['longitude', 'latitude']
  const componetsValidation: ComponentValidation[] = []
  fields.forEach((fieldName) => componetsValidation.push(new CompositeRequiredField(fieldName)))
  componetsValidation.push(new CoordinatorValidator())
  return new CompositeValidator(componetsValidation)
}
