import { ComponentValidation } from '../../presentation/controllers/helpers/validators/component-validation'
import { CompositeAddressValidator } from '../../presentation/controllers/helpers/validators/composite-address-validator'
import { CompositeCoverageAreaValidator } from '../../presentation/controllers/helpers/validators/composite-coverage-area-validator'
import { CompositeBodyRequiredField } from '../../presentation/controllers/helpers/validators/composite-required-field'
import { CompositeValidator } from '../../presentation/controllers/helpers/validators/composite-validator'

export const componentValidationFactory = (): ComponentValidation => {
  const fields: string[] = ['tradingName', 'ownerName', 'document', 'coverageArea', 'address']
  const componetsValidation: ComponentValidation[] = []
  fields.forEach((fieldName) => componetsValidation.push(new CompositeBodyRequiredField(fieldName)))

  const coverageAreaValidator = new CompositeCoverageAreaValidator()
  componetsValidation.push(coverageAreaValidator)

  const addressValidator = new CompositeAddressValidator()
  componetsValidation.push(addressValidator)

  return new CompositeValidator(componetsValidation)
}