import { MissingField } from '../../errors'
import { CompositeBodyRequiredField } from './composite-required-field'

describe('CompositeBodyRequiredField', () => {
  test('Should return erro when field not exist', () => {
    const compositeBodyRequiredField = new CompositeBodyRequiredField('field_test')
    const validateResult = compositeBodyRequiredField.validate({ name: 'ze' })
    expect(validateResult).toStrictEqual(new MissingField('field_test'))
  })

  test('Should return null when field exist', () => {
    const compositeBodyRequiredField = new CompositeBodyRequiredField('name')
    const validateResult = compositeBodyRequiredField.validate({ name: 'ze' })
    expect(validateResult).toBeNull()
  })
})
