
export interface LogRepository {
  log(message: string): Promise<void>
}