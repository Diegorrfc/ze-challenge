import { ComponentValidation } from '../../../presentation/controllers/helpers/validators/component-validation'
import { CompositeBodyRequiredField } from '../../../presentation/controllers/helpers/validators/composite-required-field'
import { CompositeValidator } from '../../../presentation/controllers/helpers/validators/composite-validator'
import { ObjectIdValidator } from '../../../presentation/controllers/helpers/validators/load-partner-request/composite-id-validator'
import { loadPartnerByIdValidationFactory } from './load-partner-by-id-validator.factory'
jest.mock('../../../presentation/controllers/helpers/validators/composite-validator')

describe('loadPartnerByIdValidationFactory', () => {
  test('Should call CompositeValidator with correct validations', () => {
    const componetsValidation: ComponentValidation[] = []
    componetsValidation.push(new CompositeBodyRequiredField('id'))
    componetsValidation.push(new ObjectIdValidator('id'))

    loadPartnerByIdValidationFactory()

    expect(CompositeValidator).toHaveBeenCalledWith(componetsValidation)
  })
})
