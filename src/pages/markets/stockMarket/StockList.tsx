import { useEffect, useState } from "react";
import { IAccount, ICompany, IPage, IStock } from '../coinMarket/interfaces';
import { INITIAL_PAGINATION } from "../coinMarket/CoinList";
import './stockList.css';
import '../../components/css/table-assets.css'
import { PurchaseData, PurchaseWidgetStock } from "./components/PurchaseWidgetStock";
import { useStore } from "effector-react";
import { tokenStore, updateAccount, userAccountsStore } from "../../../store/store";

export function StockList() {
    const token = useStore(tokenStore);

    const [companies, setCompanies] = useState<ICompany[]>([]);
    // const [pagination, setPagination] = useState<IPage>(INITIAL_PAGINATION);
    const accounts = useStore(userAccountsStore);
    const stockAccounts = accounts.filter((account) => account.accountType === 'StockWallet');

    const [activeStock, setActiveStock] = useState<IStock | null>(null);

    const [typeCompaniesList, setTypeCompaniesList] = useState<string>('MOST_ACTIVES');
    const handleTypeCompaniesList = (type: string) => {
        setTypeCompaniesList(type);
    };

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/stocks/movers/${typeCompaniesList}`)
            .then(response => response.json())
            .then((companies: ICompany[]) => {
                // console.log(companies);
                setCompanies(companies);
                // mapPagination(pages);
            })
    }, [typeCompaniesList]);

    // const mapPagination = (pages: IPage) => {
    //     let visiblePages = [];
    //     if (pages.currentPage <= 3) {
    //         let endIndex = Math.min(8, pages.totalPages + 1);
    //         visiblePages = createSequence(1, endIndex);
    //     } else if (pages.currentPage > pages.totalPages - 3) {
    //         visiblePages = createSequence(pages.currentPage - 3, pages.totalPages + 1);
    //     } else {
    //         visiblePages = createSequence(pages.currentPage - 3, pages.currentPage + 4);
    //     }
    //     setPagination({ ...pages, visiblePages });
    // }

    // const createSequence = (from: number, to: number) => {
    //     const sequence = [];
    //     for (let i = from; i < to; i++) {
    //         sequence.push(i);
    //     }
    //     return sequence;
    // }

    // const handlePageChange = (currentPage: number) => {

    //     setPagination({
    //         ...pagination,
    //         currentPage
    //     });
    // }

    const handleActiveStock = (symbol: string) => {

        fetch(`http://localhost:8000/api/v1/stocks/${symbol}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            }
        })
            .then((response) => response.json())
            .then((stock: IStock) => {
                console.log(stock);
                setActiveStock(stock);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handleBuyStock = (data: PurchaseData) => {


        const formData = { activeStock, data };
        console.log(formData);

        fetch(`http://localhost:8000/api/v1/stocks/buyStock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((account: IAccount) => {
                console.log(account);
                updateAccount(account);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className='stock-market-container'>
            {/* <div className="companies-search">
                <input type="search" />
                <button>Search</button>
            </div> */}
            <div className="companies-container">
                <div className='info-container'>
                    <div className="table-assets">
                        <p>Stock market:</p>
                        <div className='type-companies'>
                            <button className='button-table' onClick={() => handleTypeCompaniesList('MOST_ACTIVES')}>Actives</button>
                            <button className='button-table' onClick={() => handleTypeCompaniesList('DAY_GAINERS')}>Gainers</button>
                            <button className='button-table' onClick={() => handleTypeCompaniesList('DAY_LOSERS')}>Losers</button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Ticker</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Exchange</th>
                                    <th scope="col">Asset Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies ? companies.map((stock: ICompany) => (
                                    <tr key={stock.symbol}>
                                        <td>{stock.symbol}</td>
                                        <td>
                                            <a onClick={() => handleActiveStock(stock.symbol)}>{stock.name}</a>
                                        </td>
                                        <td>{stock.exchange}</td>
                                        <td>{stock.assetType}</td>
                                    </tr>
                                ))
                                    : <></>}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="info-container">
                    <div className="table-assets">
                        <p>Details:</p>
                    
                    {activeStock
                        ? (<div>
                            <h4>{activeStock.price}</h4>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Symbol:</td>
                                        <td className="data">{activeStock.symbol}</td>
                                    </tr>
                                    <tr>
                                        <td>Name:</td>
                                        <td className="data">{activeStock.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Currency:</td>
                                        <td className="data">{activeStock.currency}</td>
                                    </tr>
                                    <tr>
                                        <td>Country:</td>
                                        <td className="data">{activeStock.country}</td>
                                    </tr>
                                    <tr>
                                        <td>Sector:</td>
                                        <td className="data">{activeStock.sector}</td>
                                    </tr>
                                    <tr>
                                        <td>Industry:</td>
                                        <td className="data">{activeStock.industry}</td>
                                    </tr>
                                    <tr>
                                        <td>Market Capitalization:</td>
                                        <td className="data">{activeStock.marketCapitalization}$</td>
                                    </tr>
                                    <tr>
                                        <td>Dividend Yield:</td>
                                        <td className="data">{activeStock.dividendYield}</td>
                                    </tr>
                                    <tr>
                                        <td>Dividend Date:</td>
                                        <td className="data">{activeStock.dividendDate}</td>
                                    </tr>
                                    <tr>
                                        <td>Last Dividend Date:</td>
                                        <td className="data">{activeStock.exDividendDate}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>)
                        : (<div>
                            <h4 style={{ color: 'red' }}>Виберіть акцію</h4>
                        </div>)
                    }
                    </div>
                </div>
                <div className="info-container">
                    <div>
                        <p>Details Buy:</p>
                    </div>
                    {activeStock ? (
                        <div>
                            <PurchaseWidgetStock accounts={stockAccounts} activeStock={activeStock} onBuyStocks={handleBuyStock} />
                        </div>
                    ) : (<div>
                        <h4 style={{ color: 'red' }}>Виберіть акцію</h4>
                    </div>)}
                </div>

            </div>
        </div>
    );
}