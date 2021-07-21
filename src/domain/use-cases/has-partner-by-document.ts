export interface HasPartnerByDocument {
  hasPartnerByDocument(documentNumber: string): Promise<boolean>
}
