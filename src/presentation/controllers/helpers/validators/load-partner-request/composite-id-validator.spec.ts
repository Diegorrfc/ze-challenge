import { InvalidField } from '../../errors'
import { CompositeValidator } from '../composite-validator'
import { ObjectIdValidator } from './composite-id-validator'

describe('ObjectIdValidator', () => {
  test('Should return erro when id is invalid', () => {
    const objectIdValidator = new ObjectIdValidator('id')
    const compositeValidator = new CompositeValidator([objectIdValidator])
    const validateResult = compositeValidator.validate({ id: 'id_invalid' })
    expect(validateResult).toStrictEqual(new InvalidField('id'))
  })

  test('Should return null when id is valid', () => {
    const objectIdValidator = new ObjectIdValidator('id')
    const compositeValidator = new CompositeValidator([objectIdValidator])
    const validateResult = compositeValidator.validate({ id: '60f8e8dc8228af587e0e4c83' })
    expect(validateResult).toBeFalsy()
  })
})
