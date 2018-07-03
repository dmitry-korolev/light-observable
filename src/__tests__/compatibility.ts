import 'symbol-observable'

function permute(arr: any[]): any[][] {
  if (arr.length === 2) {
    return [arr.slice(), arr.slice().reverse()]
  }

  return [].concat.apply(
    [],
    arr.map((element, index, array) => {
      const newArray = array.slice()
      const lastElement = newArray.splice(index, 1)
      return Array.prototype.map.apply(permute(newArray), [(x: any) => lastElement.concat(x)])
    })
  )
}

describe('compatibility', () => {
  describe('require order', () => {
    const variants = permute([
      () => ({ Rx: require('rxjs') }),
      () => ({ Observable: require('../Observable').Observable }),
      () => ({ most: require('most') }),
      () => ({ createStore: require('redux').createStore })
    ])

    variants.forEach((getters) => {
      const {
        order,
        result: { Rx, most, Observable, createStore }
      } = getters.reduce(
        (result, getter) => {
          const o = getter()
          result.order = result.order.concat(Object.keys(o))
          result.result = Object.assign(result.result, o)

          return result
        },
        {
          order: [],
          result: {}
        }
      )

      const obs = Observable.of(1)
      const store = createStore((state: any = {}) => state)

      it('should not fail: ' + order, () => {
        expect(() => {
          Rx.from(obs)
          most.from(obs)
          Observable.from(store)
          Observable.from(Rx.of(1))
          Observable.from(most.of(1))
        }).not.toThrow()
      })

      for (const moduleId in require.cache) {
        delete require.cache[moduleId]
      }
    })
  })

  it('should be compatible with RxJS', async () => {
    const { from: rFrom } = require('rxjs')
    const { map: rMap } = require('rxjs/operators')
    const { Observable } = require('../Observable')

    const o = Observable.of(1, 2, 3)
    const ro = rFrom(o)
    const result: number[] = []

    await ro.pipe(rMap((x: any) => x * 10)).forEach((x: any) => result.push(x))

    expect(result).toEqual([10, 20, 30])
  })

  it('should be compatible with redux', () => {
    const { createStore } = require('redux')
    const { Observable } = require('../Observable')

    const reduxStore = createStore((state: any[] = [], event: any) => state.concat(event))
    const result: any[] = []
    const o = Observable.from(reduxStore as any).subscribe((x: any) => result.push(x))

    expect(result.length).toEqual(1)

    reduxStore.dispatch({ type: 'test' })
    expect(result.length).toEqual(2)
    expect(result[1][1]).toEqual({ type: 'test' })

    o.unsubscribe()

    reduxStore.dispatch({ type: 'test2' })
    expect(result.length).toEqual(2)
  })
})
