import { useEffect, useState } from "react";
import { IAccount, ICompany, ICompanyDto, IPage, IStock } from '../Coin/interfaces';
import { INITIAL_PAGINATION } from "../Coin/CoinList";
import './stockList.css';
import { PurchaseData, PurchaseWidgetStock } from "./components/PurchaseWidgetStock";
import { useStore } from "effector-react";
import { tokenStore, updateAccount, userAccountsStore } from "../../store/store";

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
    }, [typeCompaniesList, companies]);

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
        <div className='stock-page'>
        <div className="companies-search">
                    <input type="search" />
                    <button>Search</button>
                </div>
            <div className="companies-container">
                <div className='list-container'>
                    <div className='type-companies'>
                        <button className='btn btn-light' onClick={() => handleTypeCompaniesList('MOST_ACTIVES')}>Actives</button>
                        <button className='btn btn-info' onClick={() => handleTypeCompaniesList('DAY_GAINERS')}>Gainers</button>
                        <button className='btn btn-info' onClick={() => handleTypeCompaniesList('DAY_LOSERS')}>Losers</button>
                    </div>
                    <table className="table">
                        <thead className='thead-dark'>
                            <tr>
                                <th scope="col">Ticker</th>
                                <th scope="col">Name</th>
                                <th scope="col">Exchange</th>
                                <th scope="col">Asset Type</th>
                                {/* <th scope="col">Price</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {companies ? companies.map((stock: ICompany) => (
                                <tr key={stock.symbol}>
                                    <td>{stock.symbol}</td>
                                    <td className="content-column">
                                        <a onClick={() => handleActiveStock(stock.symbol)}>{stock.name}</a>
                                    </td>
                                    <td className="content-column">{stock.exchange}</td>
                                    <td className="content-column">{stock.assetType}</td>
                                    {/* <td className="content-column">{stock.price}</td> */}
                                </tr>
                            ))
                                : <></>}

                        </tbody>
                    </table>
                    {/* <div>
                        <footer className='footer'>
                            <div>
                                {pagination.totalItems !== 1 ? (
                                    <div className='pag-container'>
                                        <div style={{ color: 'gray' }}>
                                            Total Items: {pagination.totalItems} : Page {pagination.currentPage} of {pagination.totalPages}
                                        </div>

                                        <div className='pagination-container'>
                                            {pagination.currentPage !== 1 ? (
                                                <div>
                                                    <span onClick={() => handlePageChange(1)}>
                                                        {'<<'}
                                                    </span>
                                                    <span onClick={() => handlePageChange(pagination.currentPage - 1)}>
                                                        {'<'}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span></span>
                                            )}

                                            {pagination.visiblePages!.map((page) => (
                                                <div key={page}>
                                                    <span className={pagination.currentPage === page ? 'active' : ''}
                                                        onClick={() => handlePageChange(page)}>
                                                        {page}
                                                    </span>
                                                </div>
                                            ))}

                                            {pagination.currentPage !== pagination.totalPages ? (
                                                <div>
                                                    <span onClick={() => handlePageChange(pagination.currentPage + 1)}>{'>'}</span>
                                                    <span onClick={() => handlePageChange(pagination.totalPages)}>{'>>'}</span>
                                                </div>
                                            ) : (
                                                <span></span>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ color: 'gray' }}>
                                        Total Items: {pagination.totalItems} : Page {pagination.currentPage} of {pagination.totalPages}
                                    </div>
                                )}
                            </div>
                        </footer>

                    </div> */}
                </div>
                <div className="company-container">
                    <div style={{ backgroundColor: '#31d2f2' }}>
                        <h4>Details:</h4>
                    </div>
                    {activeStock
                        ? (<div>
                            <h4>{activeStock.price}</h4>
                            <table>
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
                <div className="buy-container">
                    <div style={{ backgroundColor: '#18c9ed' }}>
                        <h4>Details Buy:</h4>
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