"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentProcessingOverlay = void 0;
const react_1 = __importDefault(require("react"));
const PaymentProcessing_1 = require("./PaymentProcessing");
const PaymentWithWebView_1 = require("./PaymentWithWebView");
function PaymentProcessingOverlay(props) {
    return props.with === 'app' ? <PaymentProcessing_1.PaymentProcessing {...props}/> : <PaymentWithWebView_1.PaymentWithWebView {...props}/>;
}
exports.PaymentProcessingOverlay = PaymentProcessingOverlay;
