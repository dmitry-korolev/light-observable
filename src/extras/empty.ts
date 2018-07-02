import { Observable } from '../Observable'

export const EMPTY = new Observable((observer) => observer.complete())
