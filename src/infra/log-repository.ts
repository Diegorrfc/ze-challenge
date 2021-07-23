import { LogRepository } from '../domain/data/db-interfaces/log-repository'
import LogSchemaModel from './mongodb/helpers/log-schema'

export class LogMongoRepository implements LogRepository {
  async log(message: string): Promise<void> {
    const validPartner = new LogSchemaModel({
      message: message,
      date: new Date().toISOString()
    })
    await validPartner.save()
  }
}
