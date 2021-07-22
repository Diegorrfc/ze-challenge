import { makeDbPartnerSut, partnerToAdd } from './db-partner-test-fixures'

describe('Db Partner', () => {
  describe('Add partner', () => {
    test('Should call MongoRespository add with correct values', async () => {
      const { dbPartner, addPartnerRepository } = makeDbPartnerSut()
      const spyMongoRespositoryAdapter = jest.spyOn(addPartnerRepository, 'add')

      await dbPartner.add(partnerToAdd)

      expect(spyMongoRespositoryAdapter).toHaveBeenCalledWith(partnerToAdd)
    })

    test('Should call return partner with success', async () => {
      const { dbPartner } = makeDbPartnerSut()

      const partner = await dbPartner.add(partnerToAdd)

      expect(partner).toStrictEqual({
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
    })

    test('Should throws error when add partner throws error', async () => {
      const { dbPartner, addPartnerRepository } = makeDbPartnerSut()
      jest.spyOn(addPartnerRepository, 'add').mockRejectedValueOnce(new Error('any_error'))

      const partner = dbPartner.add(partnerToAdd)
      await expect(partner).rejects.toThrow()
    })
  })

  describe('hasPartnerByDocument', () => {
    const documentNumber = '123456'
    test('Should return true when hasPartnerByDocument returns true', async () => {
      const { dbPartner } = makeDbPartnerSut()

      const result = await dbPartner.hasPartnerByDocument(documentNumber)

      expect(result).toBeTruthy()
    })

    test('Should return false when hasPartnerByDocument returns false', async () => {
      const { dbPartner, hasPartnerByDocumentRepository } = makeDbPartnerSut()

      jest.spyOn(hasPartnerByDocumentRepository, 'hasPartnerByDocument').mockResolvedValueOnce(false)
      const result = await dbPartner.hasPartnerByDocument(documentNumber)

      expect(result).toBeFalsy()
    })

    test('Should throw error when hasPartnerByDocument throw error', async () => {
      const { dbPartner, hasPartnerByDocumentRepository } = makeDbPartnerSut()

      jest.spyOn(hasPartnerByDocumentRepository, 'hasPartnerByDocument').mockRejectedValueOnce(new Error())
      const result = dbPartner.hasPartnerByDocument(documentNumber)

      await expect(result).rejects.toThrow()
    })
  })

  describe('loadPartnerById', () => {
    const partnerId = '123456'
    test('Should return partner with success', async () => {
      const { dbPartner } = makeDbPartnerSut()

      const result = await dbPartner.loadPartnerById(partnerId)

      expect(result).toStrictEqual(
        {
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
      )
    })

    test('Should return null when loadPartnerByIdRepository returns null', async () => {
      const { dbPartner, loadPartnerByIdRepository } = makeDbPartnerSut()

      jest.spyOn(loadPartnerByIdRepository, 'loadPartnerById').mockResolvedValueOnce(null)
      const result = await dbPartner.loadPartnerById(partnerId)

      expect(result).toBeFalsy()
    })

    test('Should throw error when loadPartnerByIdRepository throw error', async () => {
      const { dbPartner, loadPartnerByIdRepository } = makeDbPartnerSut()

      jest.spyOn(loadPartnerByIdRepository, 'loadPartnerById').mockRejectedValueOnce(new Error())
      const result = dbPartner.loadPartnerById(partnerId)

      await expect(result).rejects.toThrow()
    })
  })
})
