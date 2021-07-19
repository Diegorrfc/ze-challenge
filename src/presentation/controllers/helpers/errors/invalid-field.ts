export class InvalidField extends Error {  
  constructor(fieldName: string) {
    super(`Invalid field: ${fieldName}`);

  }
}