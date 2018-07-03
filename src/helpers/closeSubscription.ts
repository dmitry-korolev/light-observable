import { ObservableSubscription } from '../ObservableSubscription'

export function closeSubscription(subscription: ObservableSubscription<any>) {
  subscription._observer = undefined
  subscription._closed = true
}
