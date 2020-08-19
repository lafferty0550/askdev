import {AccountState} from './types';

export const useSelectors = (state: AccountState) => ({
    authorized: state.authorized,
    about: state.about,
    JWT: state.JWT
});