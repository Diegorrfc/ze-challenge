import { PartnerModel } from '../../../domain/models/partner-model'
import { LoadPartnerById } from '../../../domain/use-cases/interfaces/load-partner-by-id-interface'
import { MissingField } from '../helpers/errors'
import { ServerError } from '../helpers/errors/server-error'
import { HttpRequest } from '../helpers/http/http'
import { badRequest, Ok } from '../helpers/http/http-response-status-code'
import { ComponentValidation } from '../helpers/validators/component-validation'
import { LoadPartnerByIdController } from './load-partner-by-id-controller'

const partnerObject = {
  id: '1',
  tradingName: 'Adega da Cerveja - Pinheiros',
  ownerName: 'Zé da Silva',
  document: '1432132123891/0001',
  coverageArea: {
    type: 'MultiPolygon',
    coordinates: [
      [[[30, 20], [45, 40], [10, 40], [30, 20]]],
      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    ]
  },
  address: {
    type: 'Point',
    coordinates: [-46.57421, -21.785741]
  }
}

const makeLoadPartnerStub = (): LoadPartnerById => {
  class LoadPartnerStub implements LoadPartnerById {
    async loadPartnerById(id: string): Promise<PartnerModel> {
      return Promise.resolve(partnerObject)
    }
  }
  return new LoadPartnerStub()
}

const makeComponentValidation = (): ComponentValidation => {
  class ComponentValidatorStub implements ComponentValidation {
    validate(request: any): Error {
      return null
    }
  }
  return new ComponentValidatorStub()
}

describe('Load Partner by id controller', () => {
  test('Should return badRequest if no params is provided', async () => {
    const httpRequest: HttpRequest = { }
    const validation = makeComponentValidation()
    jest.spyOn(validation, 'validate').mockReturnValue(new MissingField('id'))
    const loadById = new LoadPartnerByIdController(makeLoadPartnerStub(), validation)

    const result = await loadById.handle(httpRequest)

    expect(result).toStrictEqual(badRequest(new MissingField('id')))
  })

  test('Should return 200 if all data is provided', async () => {
    const httpRequest: HttpRequest = {
      params: { id: 'Partner' }
    }
    const loadById = new LoadPartnerByIdController(makeLoadPartnerStub(), makeComponentValidation())
    const result = await loadById.handle(httpRequest)
    expect(result).toStrictEqual(Ok(partnerObject))
  })

  test('Should return server error when loadPartnerById throws any error', async () => {
    const httpRequest: HttpRequest = {
      params: { id: 'Partner' }
    }
    const loadPartnerStub = makeLoadPartnerStub()
    const error = new Error('any_error')
    error.stack = 'error LoadPartnerByIdController' 
    
    jest.spyOn(loadPartnerStub, 'loadPartnerById').mockRejectedValueOnce(error)
    const loadById = new LoadPartnerByIdController(loadPartnerStub, makeComponentValidation())

    const searchPartnerResult = await loadById.handle(httpRequest)
    expect(searchPartnerResult).toStrictEqual({ statusCode: 500, body: new ServerError(error.stack) })
  })

  test('Should return notFound when loadPartnerById return undefined', async () => {
    const httpRequest: HttpRequest = {
      params: { id: 'Partner' }
    }
    const loadPartnerStub = makeLoadPartnerStub()
    jest.spyOn(loadPartnerStub, 'loadPartnerById').mockResolvedValueOnce(undefined)
    const loadById = new LoadPartnerByIdController(loadPartnerStub, makeComponentValidation())

    const searchPartnerResult = await loadById.handle(httpRequest)
    expect(searchPartnerResult).toStrictEqual({ statusCode: 404 })
  })
})
