import { CompositeAddressValidator } from '../../../presentation/controllers/helpers/validators/add-partner-request/composite-address-validator'
import { ComponentValidation } from '../../../presentation/controllers/helpers/validators/component-validation'
import { CompositeValidator } from '../../../presentation/controllers/helpers/validators/composite-validator'
import { addPartnerValidationFactory } from './add-partner-validator-factory'
import { CompositeCoverageAreaValidator } from '../../../presentation/controllers/helpers/validators/add-partner-request/composite-coverage-area-validator'
import { CompositeRequiredField } from '../../../presentation/controllers/helpers/validators/composite-required-field'
jest.mock('../../../presentation/controllers/helpers/validators/composite-validator')

describe('componentValidationFactory', () => {
  test('Should call CompositeValidator with correct validations', () => {
    const fields: string[] = ['tradingName', 'ownerName', 'document', 'coverageArea', 'address']
    const componetsValidation: ComponentValidation[] = []
    fields.forEach((fieldName) => componetsValidation.push(new CompositeRequiredField(fieldName)))

    const coverageAreaValidator = new CompositeCoverageAreaValidator()
    componetsValidation.push(coverageAreaValidator)

    const addressValidator = new CompositeAddressValidator()
    componetsValidation.push(addressValidator)

    addPartnerValidationFactory()

    expect(CompositeValidator).toHaveBeenCalledWith(componetsValidation)
  })
})
