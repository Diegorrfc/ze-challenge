import { InvalidField } from '../../errors'
import { CompositeValidator } from '../composite-validator'
import { CoordinatorValidator } from './composite-coordinator-validator'

describe('CoordinatorValidator', () => {
  test('Should return erro when longitude is less than -180', () => {
    const coordinatorValidator = new CoordinatorValidator()
    const compositeValidator = new CompositeValidator([coordinatorValidator])
    const validateResult = compositeValidator.validate({ longitude: -180.1, latitude: 10 })
    expect(validateResult).toEqual(new InvalidField('longitude'))
  })

  test('Should return erro when longitude is greater than 180', () => {
    const coordinatorValidator = new CoordinatorValidator()
    const compositeValidator = new CompositeValidator([coordinatorValidator])
    const validateResult = compositeValidator.validate({ longitude: 180.1, latitude: 10 })
    expect(validateResult).toStrictEqual(new InvalidField('longitude'))
  })

  test('Should return erro when latitude is less than -90', () => {
    const coordinatorValidator = new CoordinatorValidator()
    const compositeValidator = new CompositeValidator([coordinatorValidator])
    const validateResult = compositeValidator.validate({ longitude: 150, latitude: -90.1 })
    expect(validateResult).toEqual(new InvalidField('latitude'))
  })

  test('Should return erro when longitude is greater than 90', () => {
    const coordinatorValidator = new CoordinatorValidator()
    const compositeValidator = new CompositeValidator([coordinatorValidator])
    const validateResult = compositeValidator.validate({ longitude: 150, latitude: 90.1 })
    expect(validateResult).toStrictEqual(new InvalidField('latitude'))
  })

  test('Should return null when longitude and latitude are corrects', () => {
    const coordinatorValidator = new CoordinatorValidator()
    const compositeValidator = new CompositeValidator([coordinatorValidator])
    const validateResult = compositeValidator.validate({ longitude: 150, latitude: 80 })
    expect(validateResult).toBeFalsy()
  })
})
