import { MissingField } from '../errors'
import { CompositeRequiredField } from './composite-required-field'

describe('CompositeBodyRequiredField', () => {
  test('Should return erro when field not exist', () => {
    const compositeBodyRequiredField = new CompositeRequiredField('field_test')
    const validateResult = compositeBodyRequiredField.validate({ name: 'ze' })
    expect(validateResult).toStrictEqual(new MissingField('field_test'))
  })

  test('Should return null when field exist', () => {
    const compositeBodyRequiredField = new CompositeRequiredField('name')
    const validateResult = compositeBodyRequiredField.validate({ name: 'ze' })
    expect(validateResult).toBeNull()
  })
})
