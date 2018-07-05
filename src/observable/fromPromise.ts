import { defer } from './defer'

export const fromPromise = <T>(promise: Promise<T>) => {
  return defer(() => promise)
}
