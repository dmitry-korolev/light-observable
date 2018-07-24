import { Observable } from '../core/Observable'

export const EMPTY = new Observable<any>((observer) => observer.complete())

export const empty = () => EMPTY
