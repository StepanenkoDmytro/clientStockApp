import { createEvent, createStore } from "effector";
import { IAccount, IUser } from "../pages/Coin/interfaces";

export const USER_AUTH_TOKEN = 'user_auth_token';

export const setSearch = createEvent<string>();
export const clearSearch = createEvent();

export const $search = createStore('')
    .on(setSearch, (state, search) => search)
    .reset(clearSearch);


export const saveToken = createEvent<string>();
export const tokenStore = createStore<string | null>(null)
    .on(saveToken, (_, token) => {
        console.log('Token:', token);
        localStorage.setItem(USER_AUTH_TOKEN, token || '');
        return token;
    });

export const saveUser = createEvent<IUser>();
export const userStore = createStore<IUser | null>(null)
    .on(saveUser, (_, user) => {
        if (user && user.accounts) {
            saveAccounts(user.accounts);
        }

        return user;
    });

export const saveAccounts = createEvent<IAccount[]>();
export const updateAccount = createEvent<IAccount>();
export const userAccountsStore = createStore<IAccount[]>([])
    .on(saveAccounts, (state, accounts) => accounts)
    .on(updateAccount, (state, account) => {
        const accountIndex = state.findIndex(acc => acc.id = account.id);
        if(accountIndex > -1) {
            state[accountIndex] = {...account};
        } else {
            state.push({...account});
        }

        return state;
    });
