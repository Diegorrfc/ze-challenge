import { InvalidField, MissingField } from '../../errors'
import { CompositeAddressValidator } from './composite-address-validator'

describe('Composite Address Validator', () => {
  test('Should return null when coverageArea is correct', () => {
    const coverageAreaValidator = new CompositeAddressValidator()
    const validatorresult = coverageAreaValidator.validate({
      address: {
        type: 'Point',
        coordinates: [-46.57421, -21.785741]
      }
    })
    expect(validatorresult).toBeNull()
  })

  test('Should return error when address type is invalid', () => {
    const coverageAreaValidator = new CompositeAddressValidator()
    const validatorresult = coverageAreaValidator.validate({
      address: {
        type: 'Point-invalid',
        coordinates: [-46.57421, -21.785741]
      }
    })
    expect(validatorresult).toEqual(new InvalidField('address.type'))
  })

  test('Should return error when address type is no provided', () => {
    const coverageAreaValidator = new CompositeAddressValidator()
    const validatorresult = coverageAreaValidator.validate({
      address: {
        coordinates: [-46.57421, -21.785741]
      }
    })
    expect(validatorresult).toEqual(new MissingField('address.type'))
  })

  test('Should return error when address coordinates is no provided', () => {
    const coverageAreaValidator = new CompositeAddressValidator()
    const validatorresult = coverageAreaValidator.validate({
      address: {
        type: 'Point-invalid'
      }
    })
    expect(validatorresult).toEqual(new MissingField('address.coordinates'))
  })
})
