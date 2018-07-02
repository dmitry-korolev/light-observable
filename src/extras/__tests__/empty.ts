import { EMPTY } from '../empty'

describe('(Observable) empty', () => {
  it('should return empty observable', async () => {
    const o = EMPTY
    const observer = {
      next: jest.fn(),
      error: jest.fn(),
      complete: jest.fn()
    }

    o.subscribe(observer)

    await null

    expect(observer.next.mock.calls.length).toEqual(0)
    expect(observer.error.mock.calls.length).toEqual(0)
    expect(observer.complete.mock.calls.length).toEqual(1)
  })
})
