import { ObservableSubscription } from './ObservableSubscription'

export function cleanupSubscription(subscription: ObservableSubscription<any>) {
  const disposer = subscription._disposer
  if (!disposer) {
    return
  }

  subscription._disposer = undefined

  if (typeof disposer === 'function') {
    disposer()
  } else {
    if (disposer.unsubscribe) {
      disposer.unsubscribe()
    }
  }
}
