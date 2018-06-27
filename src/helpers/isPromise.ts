export const isPromise = <T>(p: any): p is Promise<T> =>
  !!p && (typeof p === 'object' || typeof p === 'function') && typeof p.then === 'function'
