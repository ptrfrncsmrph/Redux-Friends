export class Right {
  constructor(x) {
    this.value = x
  }
  static of(x) {
    return new Right(x)
  }
  map(f) {
    return Right.of(f(this.value))
  }
  // chain :: (a -> Either b) ~> Either a -> Either b
  chain(f) {
    return f(this.value)
  }
}

export class Left {
  constructor(x) {
    this.value = x
  }
  static of(x) {
    return new Left(x)
  }
  map(_) {
    return this
  }
  // chain :: (a -> Either b) ~> Either a -> Either b
  chain(_) {
    return this
  }
}

export const either = (f, g) => ({ constructor, value }) => {
  switch (constructor) {
    case Left:
      return f(value)
    case Right:
      return g(value)
    default:
      throw new Error(`${constructor} is not a valid Either type`)
  }
}
