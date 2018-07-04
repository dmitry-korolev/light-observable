import { Observable } from '../Observable'

export const EMPTY = new Observable<any>((observer) => observer.complete())
