export interface ICompany {
    symbol: string;
    name: string;
    // price?: number;
    exchange: string;
    assetType: string;
}

export interface ICompanyDto {
    data: ICompany[];
}

export interface IStock {
    symbol: string;
    assetType: string;
    name: string;
    price: number;
    exchange: string;
    currency: string;
    country: string;
    sector: string;
    industry: string;
    marketCapitalization: string;
    dividendYield: number;
    dividendDate: string;
    exDividendDate: string;
}

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

export interface ICoinDetails {
    coin: ICoin;
    candles: CandlesData[];
}

export interface CandlesData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

export interface ICoinDto extends IPage {
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
    id: number;
    username: string;
    email: string;
    imageID: number;
    accounts: IAccount[];
}

export interface IAccount {
    id: number,
    accountName: string;
    accountType: string;
    balance: number;
    coins: IAccountCoin[];
    stocks: IAccountStock[];
}

export interface IAccountCoin {
    idCoin: string;
    name: string;
    symbol: string;
    countCoin: number;
    avgPrice: number;
}

export interface IAccountStock {
    symbol: string;
    assetType: string;
    name: string;
    currency: string;
    buyPrice: number;
    countStocks: number;
    sector: string;
    dividendYield: number;
}

export interface ITransact {
    accountID: number;
    transactionType: string;
    amount: number;
    source: string;
    status: string;
    reasonCode: string;
    purchaseDetails: string;
    created: Date;
}

export interface IPiePrice {
    label: string;
    value: number;
}

export interface IPieData {
    data: IPiePrice[];
    actualTotalBalance: number;
}

export interface IActualPricesData {
    data: IPiePrice[];
}
