export interface HasPartnerByDocumentRepository {
  hasPartnerByDocument(documentNumber: string): Promise<boolean>
}
