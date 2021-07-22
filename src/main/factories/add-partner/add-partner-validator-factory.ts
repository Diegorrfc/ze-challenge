import { CompositeAddressValidator } from '../../../presentation/controllers/helpers/validators/add-partner-request/composite-address-validator'
import { ComponentValidation } from '../../../presentation/controllers/helpers/validators/component-validation'
import { CompositeCoverageAreaValidator } from '../../../presentation/controllers/helpers/validators/add-partner-request/composite-coverage-area-validator'
import { CompositeValidator } from '../../../presentation/controllers/helpers/validators/composite-validator'
import { CompositeBodyRequiredField } from '../../../presentation/controllers/helpers/validators/composite-required-field'

export const addPartnerValidationFactory = (): ComponentValidation => {
  const fields: string[] = ['tradingName', 'ownerName', 'document', 'coverageArea', 'address']
  const componetsValidation: ComponentValidation[] = []
  fields.forEach((fieldName) => componetsValidation.push(new CompositeBodyRequiredField(fieldName)))

  const coverageAreaValidator = new CompositeCoverageAreaValidator()
  componetsValidation.push(coverageAreaValidator)

  const addressValidator = new CompositeAddressValidator()
  componetsValidation.push(addressValidator)

  return new CompositeValidator(componetsValidation)
}
