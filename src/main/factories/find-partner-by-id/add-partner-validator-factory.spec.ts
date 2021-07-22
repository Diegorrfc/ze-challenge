import { ComponentValidation } from '../../../presentation/controllers/helpers/validators/component-validation'
import { CompositeBodyRequiredField } from '../../../presentation/controllers/helpers/validators/composite-required-field'
import { CompositeValidator } from '../../../presentation/controllers/helpers/validators/composite-validator'
import { ObjectIdValidator } from '../../../presentation/controllers/helpers/validators/find-partner-request/composite-id-validator'
import { findPartnerByIdValidationFactory } from './find-partner-by-id-validator.factory'
jest.mock('../../../presentation/controllers/helpers/validators/composite-validator')

describe('findPartnerByIdValidationFactory', () => {
  test('Should call CompositeValidator with correct validations', () => {
    const componetsValidation: ComponentValidation[] = []
    componetsValidation.push(new CompositeBodyRequiredField('id'))
    componetsValidation.push(new ObjectIdValidator('id'))

    findPartnerByIdValidationFactory()

    expect(CompositeValidator).toHaveBeenCalledWith(componetsValidation)
  })
})
