/**
 * Lazily initialized Rx resource.
 */

const {Subject, Observable} = require('rxjs')

const Lazy = module.exports = (acquire, release) => {
  const subject = new Subject()
      , next = x => subject.next(x)
      , error = err => subject.error(err)
      , complete = x => subject.complete(x)

  let state = null
  function toggle() {
    state = state ? release({next, error, complete}, state)
      : acquire({next, error, complete}, state)
  }

 let subscribers = 0 
  return Observable.create(obs => {
    subscribers++ || toggle()
    const subscription = subject.subscribe(obs)
    return () => {
      subscription.unsubscribe()
      --subscribers || toggle()
    }
  })
}