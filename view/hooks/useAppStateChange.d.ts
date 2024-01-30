import { AppStateStatus } from 'react-native';
export declare const useAppStateChange: (onChange: (nextAppState: AppStateStatus) => void) => "active" | "background" | "inactive" | "unknown" | "extension";
