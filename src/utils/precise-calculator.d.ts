import Decimal from 'decimal.js';
export declare class PreciseCalculator {
    result: Decimal;
    constructor(initialValue?: number);
    toValidNumber(value: number): number;
    mul(value: number, decimalPlaces?: number): this;
    sub(value: number, decimalPlaces?: number): this;
    div(value: number, decimalPlaces?: number): this;
    sum(value: number): this;
    val(): number;
}
