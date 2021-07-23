import { ComponentValidation } from '../../../presentation/controllers/helpers/validators/component-validation'
import { CompositeRequiredField } from '../../../presentation/controllers/helpers/validators/composite-required-field'
import { CompositeValidator } from '../../../presentation/controllers/helpers/validators/composite-validator'
import { CoordinatorValidator } from '../../../presentation/controllers/helpers/validators/search-partner-request/composite-coordinator-validator'
import { searchPartneValidationFactory } from './search-partner-validator.factory'

jest.mock('../../../presentation/controllers/helpers/validators/composite-validator')

describe('searchPartneValidationFactory', () => {
  test('Should call CompositeValidator with correct validations', () => {
    const fields: string[] = ['longitude', 'latitude']
    const componetsValidation: ComponentValidation[] = []
    fields.forEach((fieldName) => componetsValidation.push(new CompositeRequiredField(fieldName)))
    componetsValidation.push(new CoordinatorValidator())

    searchPartneValidationFactory()
    expect(CompositeValidator).toHaveBeenCalledWith(componetsValidation)
  })
})
