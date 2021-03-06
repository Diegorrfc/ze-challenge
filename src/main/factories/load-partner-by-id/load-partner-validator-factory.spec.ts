import { ComponentValidation } from '../../../presentation/controllers/helpers/validators/component-validation'
import { CompositeRequiredField } from '../../../presentation/controllers/helpers/validators/composite-required-field'
import { CompositeValidator } from '../../../presentation/controllers/helpers/validators/composite-validator'
import { loadPartnerByIdValidationFactory } from './load-partner-by-id-validator.factory'
jest.mock('../../../presentation/controllers/helpers/validators/composite-validator')

describe('loadPartnerByIdValidationFactory', () => {
  test('Should call CompositeValidator with correct validations', () => {
    const componetsValidation: ComponentValidation[] = []
    componetsValidation.push(new CompositeRequiredField('id'))

    loadPartnerByIdValidationFactory()

    expect(CompositeValidator).toHaveBeenCalledWith(componetsValidation)
  })
})
