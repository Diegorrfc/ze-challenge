import { ComponentValidation } from '../../../presentation/controllers/helpers/validators/component-validation'
import { CompositeBodyRequiredField } from '../../../presentation/controllers/helpers/validators/composite-required-field'
import { CompositeValidator } from '../../../presentation/controllers/helpers/validators/composite-validator'
import { ObjectIdValidator } from '../../../presentation/controllers/helpers/validators/find-partner-request/composite-id-validator'

export const findPartnerByIdValidationFactory = (): ComponentValidation => {
  return new CompositeValidator([new CompositeBodyRequiredField('id'), new ObjectIdValidator('id')])
}
