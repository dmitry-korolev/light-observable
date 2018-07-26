import { Observable } from '../index'

export const NEVER = new Observable(() => undefined)
export const never = () => NEVER
