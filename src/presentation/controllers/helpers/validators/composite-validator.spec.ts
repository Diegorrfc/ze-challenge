import { MissingField } from '../errors'
import { CompositeValidator } from './composite-validator'
import { CompositeBodyRequiredField } from './composite-required-field'

describe('CompositeBodyRequiredField', () => {
  test('Should return erro when field not exist', () => {
    const compositeBodyRequiredField = new CompositeBodyRequiredField('field_test')
    const compositeValidator = new CompositeValidator([compositeBodyRequiredField])
    const validateResult = compositeValidator.validate({ name: 'ze' })
    expect(validateResult).toStrictEqual(new MissingField('field_test'))
  })

  test('Should return null when field exist', () => {
    const compositeBodyRequiredField = new CompositeBodyRequiredField('name')
    const compositeValidator = new CompositeValidator([compositeBodyRequiredField])
    const validateResult = compositeValidator.validate({ name: 'ze' })
    expect(validateResult).toBeNull()
  })

  test('Should return the first error when first field failure', () => {
    const compositeNameField = new CompositeBodyRequiredField('field_ze')
    const compositeNumberField = new CompositeBodyRequiredField('number')
    const compositeValidator = new CompositeValidator([compositeNameField, compositeNumberField])
    const validateResult = compositeValidator.validate({ name: 'ze', number: 12356 })
    expect(validateResult).toStrictEqual(new MissingField('field_ze'))
  })

  test('Should return the last error when last field failure', () => {
    const compositeNameField = new CompositeBodyRequiredField('name')
    const compositeNumberField = new CompositeBodyRequiredField('las_error_field')
    const compositeValidator = new CompositeValidator([compositeNameField, compositeNumberField])
    const validateResult = compositeValidator.validate({ name: 'ze', number: 12356 })
    expect(validateResult).toStrictEqual(new MissingField('las_error_field'))
  })
})
