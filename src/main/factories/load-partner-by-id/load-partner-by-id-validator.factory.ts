import { ComponentValidation } from '../../../presentation/controllers/helpers/validators/component-validation'
import { CompositeRequiredField } from '../../../presentation/controllers/helpers/validators/composite-required-field'
import { CompositeValidator } from '../../../presentation/controllers/helpers/validators/composite-validator'

export const loadPartnerByIdValidationFactory = (): ComponentValidation => {
  return new CompositeValidator([new CompositeRequiredField('id')])
}
