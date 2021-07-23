import { LogMongoRepository } from './log-repository'
import LogSchemaModel from './mongodb/helpers/log-schema'
import mongoose from 'mongoose'


//jest.mock('./mongodb/helpers/log-schema')
describe('LogRepository', () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true })
  })

  beforeEach(async () => {
    await LogSchemaModel.deleteMany({}).exec()
  })

  afterAll(async () => {
    await mongoose.disconnect()
  })

  test('Check if LogSchemaModel is called with correct values', async () => {
    const date = new Date('2020-01-01').toISOString()
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(date);
    const logRepository = new LogMongoRepository()
    await logRepository.log('msg_error')
    
    const log = await LogSchemaModel.find({})    
    expect(log).toBeTruthy()   
  })
})