import Decimal from 'decimal.js'

export class PreciseCalculator {
  result: Decimal

  constructor(initialValue = 0) {
    this.result = new Decimal(this.toValidNumber(initialValue))
  }

  toValidNumber(value: number) {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
      return 0
    }

    if (typeof value === 'string') {
      // throw new Error(`String is not allowed, Value: ${value}`)
      try {
        return Number(value)
      } catch (error) {
        return 0
      }
    }

    return value
  }

  mul(value: number, decimalPlaces = 2) {
    this.result = this.result
      .times(this.toValidNumber(value))
      .toDecimalPlaces(decimalPlaces, Decimal.ROUND_HALF_UP)
    return this
  }

  sub(value: number, decimalPlaces = 2) {
    this.result = this.result
      .minus(this.toValidNumber(value))
      .toDecimalPlaces(decimalPlaces, Decimal.ROUND_HALF_UP)
    return this
  }

  div(value: number, decimalPlaces = 2) {
    if (this.toValidNumber(value) === 0) {
      this.result = new Decimal(0)
      return this
    }
    this.result = this.result.dividedBy(value).toDecimalPlaces(decimalPlaces, Decimal.ROUND_HALF_UP)
    return this
  }

  sum(value: number) {
    this.result = this.result.plus(this.toValidNumber(value))
    return this
  }

  val() {
    return this.result.toNumber()
  }
}
