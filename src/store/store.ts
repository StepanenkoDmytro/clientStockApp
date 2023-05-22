import { createEvent, createStore } from "effector";
import { IUser } from "../pages/Coin/interfaces";

export const USER_AUTH_TOKEN = 'user_auth_token';

export const setSearch = createEvent<string>();
export const clearSearch = createEvent();

export const $search = createStore('')
    .on(setSearch, (state, search) => search)
    .reset(clearSearch);


export const saveToken = createEvent<string>();
export const tokenStore = createStore<string | null>(null)
    .on(saveToken, (_, token) => {
        console.log('Token:',token);
        localStorage.setItem(USER_AUTH_TOKEN, token || '');
        return token;
     });

export const saveUser = createEvent<IUser>();
export const userStore = createStore<IUser | null>(null)
    .on(saveUser, (_, user) => user);
