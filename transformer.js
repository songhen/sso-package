"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPaymentProvider = void 0;
function transformPaymentProvider(raw) {
    return Object.assign(Object.assign({}, raw), { saveCard: raw.save_card });
}
exports.transformPaymentProvider = transformPaymentProvider;
