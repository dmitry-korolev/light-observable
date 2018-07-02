import { Observable } from '../Observable'

export function getSpecies<T>(obj: any): typeof Observable {
  return obj.constructor || Observable
}
