"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPaymentState = exports.usePaymentStore = void 0;
const zustand_1 = require("zustand");
const immer_1 = require("zustand/middleware/immer");
const constants_1 = require("./constants");
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
    }, getProvider: id => get().byId[id], getPaymentOptions: param => {
        const { providers } = get();
        return (providers.filter(provider => provider.regions.includes(param.region) &&
            provider.services.includes(param.service) &&
            provider.id !== constants_1.PROVIDERS.WINGCOIN) || []);
    }, 
    // INFO: currently our platform only has wingcoin as wallet
    getAvailableWallets: param => {
        const { providers } = get();
        const wingcoinProvider = providers.find(provider => provider.regions.includes(param.region) &&
            provider.services.includes(param.service) &&
            provider.id === constants_1.PROVIDERS.WINGCOIN);
        return wingcoinProvider ? [wingcoinProvider] : [];
    } }))));
exports.getPaymentState = exports.usePaymentStore.getState;
