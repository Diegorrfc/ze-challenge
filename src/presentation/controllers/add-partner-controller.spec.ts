import { AddPartnerController } from './add-partner-controller';

describe('Add partner controller', () => {
  const httpRequest = {
    body: {
      id: 1,
      ownerName: "Zé da Silva",
      document: "1432132123891/0001",
      coverageArea: {
        type: "MultiPolygon",
        coordinates: [
          [[[30, 20], [45, 40], [10, 40], [30, 20]]],
          [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
        ]
      },
      address: {
        type: "Point",
        coordinates: [-46.57421, -21.785741]
      }
    }
  }
  test('Should return 400 when tradingName is no provided', async () => {
    const httpRequestWithoutTradingName = {
      body: {
        id: 1,
        ownerName: "Zé da Silva",
        document: "1432132123891/0001",
        coverageArea: {
          type: "MultiPolygon",
          coordinates: [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
          ]
        },
        address: {
          type: "Point",
          coordinates: [-46.57421, -21.785741]
        }
      }
    }
    const teste = new AddPartnerController();
    const response = await teste.handle(httpRequestWithoutTradingName)
    expect(response).toStrictEqual({ statusCode: 400, body: new Error('Missing param tradingName') })
  })

  test('Should return 400 when ownerName is no provided', async () => {
    const httpRequestWithoutOwnerName = {
      body: {
        id: 1,
        tradingName: "Adega da Cerveja - Pinheiros",
        document: "1432132123891/0001",
        coverageArea: {
          type: "MultiPolygon",
          coordinates: [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
          ]
        },
        address: {
          type: "Point",
          coordinates: [-46.57421, -21.785741]
        }
      }
    }
    const teste = new AddPartnerController();
    const response = await teste.handle(httpRequestWithoutOwnerName)
    expect(response).toStrictEqual({ statusCode: 400, body: new Error('Missing param ownerName') })
  })

  test('Should return 400 when document is no provided', async () => {
    const httpRequestWithoutDocument = {
      body: {
        id: 1,
        tradingName: "Adega da Cerveja - Pinheiros",
        ownerName: "Zé da Silva",
        coverageArea: {
          type: "MultiPolygon",
          coordinates: [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
          ]
        },
        address: {
          type: "Point",
          coordinates: [-46.57421, -21.785741]
        }
      }
    }
    const teste = new AddPartnerController();
    const response = await teste.handle(httpRequestWithoutDocument)
    expect(response).toStrictEqual({ statusCode: 400, body: new Error('Missing param document') })
  })

  test('Should return 400 when coverageArea is no provided', async () => {
    const httpRequestWithoutCoverageArea = {
      body: {
        id: 1,
        tradingName: "Adega da Cerveja - Pinheiros",
        ownerName: "Zé da Silva",
        document: "1432132123891/0001",
        address: {
          type: "Point",
          coordinates: [-46.57421, -21.785741]
        }
      }
    }
    const teste = new AddPartnerController();
    const response = await teste.handle(httpRequestWithoutCoverageArea)
    expect(response).toStrictEqual({ statusCode: 400, body: new Error('Missing param coverageArea') })
  })

  test('Should return 400 when address is no provided', async () => {
    const httpRequestWithoutAddress = {
      body: {
        id: 1,
        tradingName: "Adega da Cerveja - Pinheiros",
        ownerName: "Zé da Silva",
        document: "1432132123891/0001",
        coverageArea: {
          type: "MultiPolygon",
          coordinates: [
            [[[30, 20], [45, 40], [10, 40], [30, 20]]],
            [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
          ]
        }
      }
    }
    const teste = new AddPartnerController();
    const response = await teste.handle(httpRequestWithoutAddress)
    expect(response).toStrictEqual({ statusCode: 400, body: new Error('Missing param address') })
  })
})