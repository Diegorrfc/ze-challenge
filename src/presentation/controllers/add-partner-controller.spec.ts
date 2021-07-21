import { PartnerModel } from '../../domain/models/partner-model'
import { AddPartner } from '../../domain/use-cases/add-partner'
import { AddPartnerModel } from '../../domain/use-cases/add-partner-model'
import { AddPartnerController } from './add-partner-controller'
import { Controller } from './controller'
import { MissingField } from './helpers/errors'
import { ServerError } from './helpers/errors/server-error'
import { ComponentValidation } from './helpers/validators/component-validation'

interface TestTypes {
  addPartnerController: Controller
  addPartnerStub: AddPartner
  componentValidation: ComponentValidation
}

const makeCompositValidation = (): ComponentValidation => {
  class ComponentValidationStub implements ComponentValidation {
    validate(request: any): Error {
      return null
    }
  }
  return new ComponentValidationStub()
}

const makeAddPartnerStub = (): AddPartner => {
  class AddPartnerStub implements AddPartner {
    async add(partner: AddPartnerModel): Promise<PartnerModel> {
      return Promise.resolve({
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
      })
    }
  }
  return new AddPartnerStub()
}

const addPartnerControllerSut = (): TestTypes => {
  const addPartnerStub = makeAddPartnerStub()
  const compositValidation = makeCompositValidation()
  const addPartnerController = new AddPartnerController(addPartnerStub, compositValidation)

  return {
    addPartnerController: addPartnerController,
    addPartnerStub: addPartnerStub,
    componentValidation: compositValidation
  }
}

describe('Add partner controller', () => {
  test('Should return badRequest if componentValidation validate return error', async () => {
    const httpRequestWithoutAddress = {
      body: {
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001',
        coverageArea: {
          type: 'coverageArea invalid',
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
    }

    const { addPartnerController, componentValidation } = addPartnerControllerSut()
    jest.spyOn(componentValidation, 'validate').mockReturnValue(new MissingField('fieldName'))

    const response = await addPartnerController.handle(httpRequestWithoutAddress)
    expect(response).toStrictEqual({ statusCode: 400, body: new MissingField('fieldName') })
  })

  test('Should call add partner with correct values', async () => {
    const httpRequest = {
      body: {
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
    }

    const { addPartnerController, addPartnerStub } = addPartnerControllerSut()
    const spyAddPartner = jest.spyOn(addPartnerStub, 'add')
    await addPartnerController.handle(httpRequest)
    expect(spyAddPartner).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should returns server error when add partner throws any error', async () => {
    const httpRequest = {
      body: {
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
    }

    const { addPartnerController, addPartnerStub } = addPartnerControllerSut()
    jest.spyOn(addPartnerStub, 'add').mockRejectedValueOnce(new Error('any_error'))
    const addPartnerResult = await addPartnerController.handle(httpRequest)
    expect(addPartnerResult).toStrictEqual({ statusCode: 500, body: new ServerError() })
  })

  test('Should returns partner created', async () => {
    const httpRequest = {
      body: {
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
    }

    const { addPartnerController } = addPartnerControllerSut()
    const addPartnerResult = await addPartnerController.handle(httpRequest)
    expect(addPartnerResult).toStrictEqual({
      statusCode: 200,
      body: {
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
    })
  })
})
