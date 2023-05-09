export interface ICoin {
    id: string;
    name: string;
    symbol: string;
    priceUSD: number;
    marketCapUsd: number;
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