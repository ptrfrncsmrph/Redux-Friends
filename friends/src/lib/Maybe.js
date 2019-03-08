export class Just {
  constructor(x) {
    this.value = x
  }
  static of(x) {
    return new Just(x)
  }
  map(f) {
    return Just.of(f(this.value))
  }
  // chain :: (a -> Maybe b) ~> Maybe a -> Maybe b
  chain(f) {
    return f(this.value)
  }
}

class Nothing_ {
  constructor() {
    this.value = undefined
  }
  static of() {
    return new Nothing_()
  }
  map(_) {
    return this
  }
  // chain :: (a -> Maybe b) ~> Maybe a -> Maybe b
  chain(_) {
    return this
  }
}

export const Nothing = Nothing_.of()

export const maybe = (x, fn) => ({ constructor, value }) => {
  console.log(constructor)
  switch (constructor) {
    case Just:
      return fn(value)
    case Nothing_:
      return x
    default:
      throw new Error(`${constructor} is not a valid Maybe type`)
  }
}
