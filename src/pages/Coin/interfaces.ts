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