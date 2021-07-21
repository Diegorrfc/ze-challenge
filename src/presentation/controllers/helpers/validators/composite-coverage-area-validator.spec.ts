import { InvalidField } from '../errors'
import { CompositeCoverageAreaValidator } from './composite-coverage-area-validator'

describe('CompositeCoverageAreaValidator', () => {
  test('Should return null when coverageArea is correct', () => {
    const coverageAreaValidator = new CompositeCoverageAreaValidator()
    const validatorresult = coverageAreaValidator.validate({
      coverageArea: {
        type: 'MultiPolygon',
        coordinates: [
          [[[30, 20], [45, 40], [10, 40], [30, 20]]],
          [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
        ]
      }
    })
    expect(validatorresult).toBeNull()
  })

  test('Should return error when coverageArea type is invalid', () => {
    const coverageAreaValidator = new CompositeCoverageAreaValidator()
    const validatorresult = coverageAreaValidator.validate({
      coverageArea: {
        type: 'MultiPolygon-invalid',
        coordinates: [
          [[[30, 20], [45, 40], [10, 40], [30, 20]]],
          [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
        ]
      }
    })
    expect(validatorresult).toEqual(new InvalidField('coverageArea.type'))
  })
})
