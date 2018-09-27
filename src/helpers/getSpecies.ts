import { Observable } from '../core/Observable'

export function getSpecies(obj: any): typeof Observable {
  return obj.constructor || Observable
}
