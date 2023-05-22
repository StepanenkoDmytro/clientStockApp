export interface ICoin {
    id: string;
    name: string;
    symbol: string;
    priceUSD: string;
    marketCapUsd: string;
}

export interface ICoinVM extends ICoin {
    iconUrl: string;
}

export interface ICoinDto extends IPage{
    data: ICoin[];
}

export interface IPage {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    visiblePages?: number[];
}

// User and his friends
export interface IUserDto {
    user: IUser;
    token: string;
}

export interface IUser {
    username: string;
    email: string;
    imageID: number;
    accounts: IAccount[];
}

export interface IAccount {
    accountName: string;
    accountType: string;
    balance: number;
    coins: IAccountCoin[];
}

export interface IAccountCoin {
    idCoin: string;
    name: string;
}
