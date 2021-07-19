import { PartnerModel } from '../../domain/models/partner-model'
import { AddPartner } from '../../domain/use-cases/add-partner'
import { AddPartnerModel } from '../../domain/use-cases/add-partner-model'
import { AddPartnerController } from './add-partner-controller'
import { Controller } from './controller'
import { InvalidField, MissingField } from './helpers/errors'
import { ServerError } from './helpers/errors/server-error'

interface TestTypes {
  addPartnerController: Controller
  addPartnerStub: AddPartner
}

const addPartnerControllerSut = (): TestTypes => {
  class AddPartnerStub implements AddPartner {
    async add(partner: AddPartnerModel): Promise<PartnerModel> {
      return Promise.resolve(null)
    }
  }
  const addPartnerStub = new AddPartnerStub()

  const addPartnerController = new AddPartnerController(addPartnerStub)
  return {
    addPartnerController: addPartnerController,
    addPartnerStub: addPartnerStub
  }
}

describe('Add partner controller', () => {
  test('Should return 400 when tradingName is no provided', async () => {
    const httpRequestWithoutTradingName = {
      body: {
        id: 1,
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
    const response = await addPartnerController.handle(httpRequestWithoutTradingName)
    expect(response).toStrictEqual({ statusCode: 400, body: new MissingField('tradingName') })
  })

  test('Should return 400 when ownerName is no provided', async () => {
    const httpRequestWithoutOwnerName = {
      body: {
        id: 1,
        tradingName: 'Adega da Cerveja - Pinheiros',
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
    const response = await addPartnerController.handle(httpRequestWithoutOwnerName)
    expect(response).toStrictEqual({ statusCode: 400, body: new MissingField('ownerName') })
  })

  test('Should return 400 when document is no provided', async () => {
    const httpRequestWithoutDocument = {
      body: {
        id: 1,
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
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
    const response = await addPartnerController.handle(httpRequestWithoutDocument)
    expect(response).toStrictEqual({ statusCode: 400, body: new MissingField('document') })
  })

  test('Should return 400 when coverageArea is no provided', async () => {
    const httpRequestWithoutCoverageArea = {
      body: {
        id: 1,
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001',
        address: {
          type: 'Point',
          coordinates: [-46.57421, -21.785741]
        }
      }
    }
    const { addPartnerController } = addPartnerControllerSut()
    const response = await addPartnerController.handle(httpRequestWithoutCoverageArea)
    expect(response).toStrictEqual({ statusCode: 400, body: new MissingField('coverageArea') })
  })

  test('Should return 400 when address is no provided', async () => {
    const httpRequestWithoutAddress = {
      body: {
        id: 1,
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001',
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
          ]
        }
      }
    }
    const { addPartnerController } = addPartnerControllerSut()
    const response = await addPartnerController.handle(httpRequestWithoutAddress)
    expect(response).toStrictEqual({ statusCode: 400, body: new MissingField('address') })
  })

  test('Should return 400 if address type is no provided', async () => {
    const httpRequestWithoutAddress = {
      body: {
        id: 1,
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
          coordinates: [-46.57421, -21.785741]
        }
      }
    }

    const { addPartnerController } = addPartnerControllerSut()
    const response = await addPartnerController.handle(httpRequestWithoutAddress)
    expect(response).toStrictEqual({ statusCode: 400, body: new MissingField('address.type') })
  })

  test('Should return 400 if address coordinates is no provided', async () => {
    const httpRequestWithoutAddress = {
      body: {
        id: 1,
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
          type: 'Point'
        }
      }
    }

    const { addPartnerController } = addPartnerControllerSut()
    const response = await addPartnerController.handle(httpRequestWithoutAddress)
    expect(response).toStrictEqual({ statusCode: 400, body: new MissingField('address.coordinates') })
  })

  test('Should return 400 if coverageArea type is no provided', async () => {
    const httpRequestWithoutAddress = {
      body: {
        id: 1,
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001',
        coverageArea: {
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
    const response = await addPartnerController.handle(httpRequestWithoutAddress)
    expect(response).toStrictEqual({ statusCode: 400, body: new MissingField('coverageArea.type') })
  })

  test('Should return 400 if coverageArea coordinates is no provided', async () => {
    const httpRequestWithoutAddress = {
      body: {
        id: 1,
        tradingName: 'Adega da Cerveja - Pinheiros',
        ownerName: 'Zé da Silva',
        document: '1432132123891/0001',
        coverageArea: {
          type: 'MultiPolygon'
        },
        address: {
          type: 'Point',
          coordinates: [-46.57421, -21.785741]
        }
      }
    }

    const { addPartnerController } = addPartnerControllerSut()
    const response = await addPartnerController.handle(httpRequestWithoutAddress)
    expect(response).toStrictEqual({ statusCode: 400, body: new MissingField('coverageArea.coordinates') })
  })

  test('Should return 400 if coverageArea type is invalid', async () => {
    const httpRequestWithoutAddress = {
      body: {
        id: 1,
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

    const { addPartnerController } = addPartnerControllerSut()
    const response = await addPartnerController.handle(httpRequestWithoutAddress)
    expect(response).toStrictEqual({ statusCode: 400, body: new InvalidField('coverageArea.type') })
  })

  test('Should return 400 if address type is invalid', async () => {
    const httpRequestWithoutAddress = {
      body: {
        id: 1,
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
          type: 'address type invalid',
          coordinates: [-46.57421, -21.785741]
        }
      }
    }

    const { addPartnerController } = addPartnerControllerSut()
    const response = await addPartnerController.handle(httpRequestWithoutAddress)
    expect(response).toStrictEqual({ statusCode: 400, body: new InvalidField('address.type') })
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
})
