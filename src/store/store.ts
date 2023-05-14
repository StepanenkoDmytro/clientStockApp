import { createEvent, createStore } from "effector";

export const setSearch = createEvent<string>();
export const clearSearch = createEvent();

export const $search = createStore('')
    .on(setSearch, (state, search) => search)
    .reset(clearSearch);