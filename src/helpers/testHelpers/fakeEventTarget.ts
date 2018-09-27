export class FakeEventTarget implements EventTarget {
  handler?: (value: any) => void
  event?: string

  addEventListener = jest.fn((event: string, handler: (value: any) => void) => {
    this.event = event
    this.handler = handler
  })

  removeEventListener = jest.fn(() => {
    this.event = undefined
    this.handler = undefined
  })

  dispatchEvent(value: any) {
    if (this.handler) {
      this.handler(value)
    }
    return true
  }
}
