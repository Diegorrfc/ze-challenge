import { HttpRequest, HttpResponse } from './helpers/http/http'

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
