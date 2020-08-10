import {AccountState} from './types';

export const useSelectors = (state: AccountState) => ({
    loginStatus: () => state.status.login,
    registerStatus: () => state.status.register,
    authorized: () => state.authorized,
    user: () => state.about,
    JWT: () => state.JWT
});