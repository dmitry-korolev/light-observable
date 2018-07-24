import { Subscribable } from '../core/types.h'
import { reduce } from './reduce'

export const toArray = <T>(stream: Subscribable<T>): Promise<T[]> => {
  return reduce((result, value) => result.concat([value]), [] as T[], stream)
}
