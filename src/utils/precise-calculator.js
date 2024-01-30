"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreciseCalculator = void 0;
const decimal_js_1 = __importDefault(require("decimal.js"));
class PreciseCalculator {
    constructor(initialValue = 0) {
        this.result = new decimal_js_1.default(this.toValidNumber(initialValue));
    }
    toValidNumber(value) {
        if (Number.isNaN(value) || !Number.isFinite(value)) {
            return 0;
        }
        if (typeof value === 'string') {
            // throw new Error(`String is not allowed, Value: ${value}`)
            try {
                return Number(value);
            }
            catch (error) {
                return 0;
            }
        }
        return value;
    }
    mul(value, decimalPlaces = 2) {
        this.result = this.result
            .times(this.toValidNumber(value))
            .toDecimalPlaces(decimalPlaces, decimal_js_1.default.ROUND_HALF_UP);
        return this;
    }
    sub(value, decimalPlaces = 2) {
        this.result = this.result
            .minus(this.toValidNumber(value))
            .toDecimalPlaces(decimalPlaces, decimal_js_1.default.ROUND_HALF_UP);
        return this;
    }
    div(value, decimalPlaces = 2) {
        if (this.toValidNumber(value) === 0) {
            this.result = new decimal_js_1.default(0);
            return this;
        }
        this.result = this.result.dividedBy(value).toDecimalPlaces(decimalPlaces, decimal_js_1.default.ROUND_HALF_UP);
        return this;
    }
    sum(value) {
        this.result = this.result.plus(this.toValidNumber(value));
        return this;
    }
    val() {
        return this.result.toNumber();
    }
}
exports.PreciseCalculator = PreciseCalculator;
