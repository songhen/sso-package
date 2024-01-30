"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBackHandler = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
function useBackHandler(handler) {
    (0, react_1.useEffect)(() => {
        react_native_1.BackHandler.addEventListener('hardwareBackPress', handler);
        return () => react_native_1.BackHandler.removeEventListener('hardwareBackPress', handler);
    }, [handler]);
}
exports.useBackHandler = useBackHandler;
