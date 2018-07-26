import { Observable } from '../core/Observable'

export const EMPTY = new Observable<never>((observer) => observer.complete())

export const empty = () => EMPTY
