"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppStateChange = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
const useAppStateChange = (onChange) => {
    const [appState, setAppState] = (0, react_1.useState)(react_native_1.AppState.currentState);
    (0, react_1.useEffect)(() => {
        const handleAppStateChange = (nextAppState) => {
            setAppState(nextAppState);
            if (onChange) {
                onChange(nextAppState);
            }
        };
        const appStateSubscription = react_native_1.AppState.addEventListener('change', handleAppStateChange);
        return () => {
            appStateSubscription.remove();
        };
    }, [onChange]);
    return appState;
};
exports.useAppStateChange = useAppStateChange;
