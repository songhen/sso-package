"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSubscribeTransaction = void 0;
const react_1 = require("react");
const database_1 = __importDefault(require("@react-native-firebase/database"));
const PAYMENT_STATUS_PATH = 'wingshopping_payment_status';
const useSubscribeTransaction = (txnId) => {
    const [transaction, setTransaction] = (0, react_1.useState)('pending');
    (0, react_1.useEffect)(() => {
        const subscription = (0, database_1.default)().ref(`${PAYMENT_STATUS_PATH}/${txnId}`);
        const onDataChange = (snapshot) => {
            const data = snapshot.val();
            setTransaction(data);
        };
        subscription.on('value', onDataChange);
        return () => {
            subscription.off('value', onDataChange);
        };
    }, [txnId]);
    return transaction;
};
exports.useSubscribeTransaction = useSubscribeTransaction;
