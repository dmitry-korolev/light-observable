export class FakeEventEmitter<T = any> {
  handler?: (...values: T[]) => void
  event?: string

  addListener = jest.fn((event: string, handler: (...values: T[]) => void) => {
    this.event = event
    this.handler = handler
  })

  removeListener = jest.fn(() => {
    this.event = undefined
    this.handler = undefined
  })

  emit(...values: T[]) {
    if (this.handler) {
      this.handler(...values)
    }
  }
}
