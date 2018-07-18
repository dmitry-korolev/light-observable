export const getTestObserver = () => ({
  next: jest.fn(),
  complete: jest.fn(),
  error: jest.fn()
})
