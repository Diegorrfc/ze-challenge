import { CompositeValidator } from '../../presentation/controllers/helpers/validators/composite-validator'
import { ComponentValidation } from '../../presentation/controllers/helpers/validators/component-validation'
import { CompositeBodyRequiredField } from '../../presentation/controllers/helpers/validators/composite-required-field'
import { componentValidationFactory } from './composition-validator'
import { CompositeCoverageAreaValidator } from '../../presentation/controllers/helpers/validators/composite-coverage-area-validator'
import { CompositeAddressValidator } from '../../presentation/controllers/helpers/validators/composite-address-validator'
jest.mock('../../presentation/controllers/helpers/validators/composite-validator')

describe('componentValidationFactory', () => {
  test('Should call CompositeValidator with correct validations', () => {
    const fields: string[] = ['tradingName', 'ownerName', 'document', 'coverageArea', 'address']
    const componetsValidation: ComponentValidation[] = []
    fields.forEach((fieldName) => componetsValidation.push(new CompositeBodyRequiredField(fieldName)))

    const coverageAreaValidator = new CompositeCoverageAreaValidator()
    componetsValidation.push(coverageAreaValidator)

    const addressValidator = new CompositeAddressValidator()
    componetsValidation.push(addressValidator)

    componentValidationFactory()

    expect(CompositeValidator).toHaveBeenCalledWith(componetsValidation)
  })
})
