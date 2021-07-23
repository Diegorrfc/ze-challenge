import { MissingField } from '../errors'
import { CompositeValidator } from './composite-validator'
import { CompositeRequiredField } from './composite-required-field'

describe('CompositeBodyRequiredField', () => {
  test('Should return erro when field not exist', () => {
    const compositeBodyRequiredField = new CompositeRequiredField('field_test')
    const compositeValidator = new CompositeValidator([compositeBodyRequiredField])
    const validateResult = compositeValidator.validate({ name: 'ze' })
    expect(validateResult).toStrictEqual(new MissingField('field_test'))
  })

  test('Should return null when field exist', () => {
    const compositeBodyRequiredField = new CompositeRequiredField('name')
    const compositeValidator = new CompositeValidator([compositeBodyRequiredField])
    const validateResult = compositeValidator.validate({ name: 'ze' })
    expect(validateResult).toBeNull()
  })

  test('Should return the first error when first field failure', () => {
    const compositeNameField = new CompositeRequiredField('field_ze')
    const compositeNumberField = new CompositeRequiredField('number')
    const compositeValidator = new CompositeValidator([compositeNameField, compositeNumberField])
    const validateResult = compositeValidator.validate({ name: 'ze', number: 12356 })
    expect(validateResult).toStrictEqual(new MissingField('field_ze'))
  })

  test('Should return the last error when last field failure', () => {
    const compositeNameField = new CompositeRequiredField('name')
    const compositeNumberField = new CompositeRequiredField('las_error_field')
    const compositeValidator = new CompositeValidator([compositeNameField, compositeNumberField])
    const validateResult = compositeValidator.validate({ name: 'ze', number: 12356 })
    expect(validateResult).toStrictEqual(new MissingField('las_error_field'))
  })
})
