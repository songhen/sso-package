"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getState = exports.usePaymentStore = void 0;
const zustand_1 = require("zustand");
const immer_1 = require("zustand/middleware/immer");
const initialState = {
    providers: [],
    byId: {},
};
exports.usePaymentStore = (0, zustand_1.create)()((0, immer_1.immer)((set, get) => (Object.assign(Object.assign({}, initialState), { getProviders: () => get().providers, setProviders: providers => {
        set(state => {
            const byId = providers.reduce((accumulator, provider) => {
                accumulator[provider.id] = provider;
                return accumulator;
            }, {});
            state.providers = providers;
            state.byId = byId;
        });
    }, getProvider: id => get().byId[id] }))));
exports.getState = exports.usePaymentStore.getState;
