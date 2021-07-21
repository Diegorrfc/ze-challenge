import { ComponentValidation } from './component-validation'

export class CompositeValidator implements ComponentValidation {
  private readonly components: ComponentValidation[] = []

  constructor(componets: ComponentValidation[]) {
    this.components = componets
  }

  validate(request: any): Error | null {
    for (const component of this.components) {
      const validateResult = component.validate(request)
      if (validateResult) {
        return validateResult
      }
    }
    return null
  }
}
