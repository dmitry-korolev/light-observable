import { Observable } from '../Observable'

describe('(Core) Ecmascript tests', () => {
  it.skip('should pass es-observable-tests', () => {
    require('es-observable-tests').runTests(Observable)
  })
})
