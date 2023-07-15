import { useEffect, useState } from 'react';
import './stock.css'
import '../account.css'
import '../../components/css/table-assets.css'
import { useStore } from 'effector-react';
import { USER_AUTH_TOKEN, updateAccount, userAccountsStore } from '../../../store/store';
import { IAccount, IAccountStock, IActualPricesData, IPiePrice } from '../../markets/coinMarket/interfaces';
import { DepositForm } from '../porfolio/portfolioComponents/DepositForm';
import { PieAssetsChart } from '../porfolio/portfolioComponents/PieAssetsChart';
import HeadOfBlock from '../../components/HeadOfBlock';

export function StockComponent() {
    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const accounts: IAccount[] = useStore(userAccountsStore);
    const stockAccounts = accounts.filter((account) => account.accountType === 'StockWallet');

    const [currentStockPrices, setCurrentStockPrices] = useState<IPiePrice[]>([]);

    const [activeAccount, setActiveAccount] = useState<IAccount | null>(null);
    const [accountTotalBalance, setAccountTotalBalance] = useState<number>(0);

    const handleActiveAccount = (account: IAccount) => {
        setActiveAccount(account);
        localStorage.setItem('activeStockAccount', JSON.stringify(account));
    };

    const storedActiveAccount = localStorage.getItem('activeStockAccount');

    const getSavedAccountFromLocalStorage = () => {
        if (storedActiveAccount) {
            setActiveAccount(JSON.parse(storedActiveAccount));
        } else if (stockAccounts.length > 0) {
            handleActiveAccount(stockAccounts[0]);
        }
    }

    useEffect(() => {
        getSavedAccountFromLocalStorage();
        {
            activeAccount &&
                fetch(`http://localhost:8000/api/v1/account/${activeAccount.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer_${token}`
                    }
                })
                    .then((response) => response.json())
                    .then((account: IAccount) => {
                        // console.log(account);
                        setActiveAccount(account);
                        getPrices(account);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
        }

    }, [accounts]);

    const handleTotalBalance = (totalBalance: number) => {
        setAccountTotalBalance(totalBalance);
    };

    const handleAccount = (account: IAccount) => {
        console.log(account);
        updateAccount(account);
        setActiveAccount(account);
        localStorage.setItem('activeStockAccount', JSON.stringify(account));
    }

    const getPrices = (account: IAccount) => {

        fetch(`http://localhost:8000/api/v1/account/actual-prices-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            },
            body: JSON.stringify(account)
        })
            .then((response) => response.json())
            .then((actual: IActualPricesData) => {
                console.log(actual);
                setCurrentStockPrices(actual.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handlePrices = (ticker: string) => {
        const priceObj = currentStockPrices?.find((item) => (item.label === ticker));
        return priceObj ? priceObj.value : 0;
    };

    const costAccount = (activeAccount: IAccount) => {
        const coast = activeAccount.stocks.reduce((sum: number, el: IAccountStock) => {
            return sum + (el.buyPrice * el.countStocks)
        }, 0);
        return coast;
    };

    const getShareOfStock = (stock: IAccountStock) => {
        return ((costStock(stock)) / costAccount(activeAccount!)) * 100;
    };

    const costStock = (stock: IAccountStock) => {
        return stock.buyPrice * stock.countStocks;
    };

    const profitStock = (stock: IAccountStock) => {
        return ((handlePrices(stock.symbol) - stock.buyPrice) * stock.countStocks).toFixed(2);
    }

    const growthStock = (stock: IAccountStock) => {
        return ((((handlePrices(stock.symbol) - stock.buyPrice) * stock.countStocks) / (stock.buyPrice * stock.countStocks)) * 100).toFixed(2);
    }

    return (
        <div className='stock-container'>
            <div className='up'>
                <div className='up-group'>
                    <div className='info-container'>
                        <HeadOfBlock name='Wallet info:' />
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '250px' }} />
                                    <th style={{ width: '100px' }} />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><h4>Total balance:</h4></td>
                                    <td id='stock-wallet-info'>
                                        <h4>
                                            {accountTotalBalance}
                                            $</h4>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p>Unused USD:</p></td>
                                    <td id='stock-wallet-info'><p>{activeAccount?.balance}$</p></td>
                                </tr>
                                <tr>
                                    <td><p>Account name:</p></td>
                                    <td id='stock-wallet-info'>
                                        <select className='form-select'
                                            value={storedActiveAccount!}
                                            onChange={(e) => handleActiveAccount(JSON.parse(e.target.value))}>
                                            {stockAccounts.map((account) => (
                                                <option key={account.accountName} value={JSON.stringify(account)}>
                                                    {account.accountName}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p>Account type:</p></td>
                                    <td id='stock-wallet-info'><p>{activeAccount?.accountType}</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='info-container'>
                        <HeadOfBlock name='Diagram:' />
                        {activeAccount &&
                            <PieAssetsChart account={activeAccount} handleTotalBalance={handleTotalBalance} />
                        }
                    </div>
                </div>
                {/* <div className='actions-wallet'>
                    {activeAccount &&
                        <DepositForm accountID={activeAccount.id} handleDepositAccount={handleAccount} />
                    }
                </div> */}

                <div className='up-group'>

                    <div className='info-container'>
                        <HeadOfBlock name='Profit:' />
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        style={{ width: '150px' }}
                                    />
                                    <th
                                        style={{ width: '100px' }}
                                    />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><p>Day profit:</p></td>
                                    <td id='stock-profit-positive'>
                                        <p>10$</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p>Week profit:</p></td>
                                    <td id='stock-profit-negative'>
                                        <p>-100$</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p>Month profit:</p></td>
                                    <td id='stock-profit-positive'>
                                        <p>200$</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p>Total profit:</p></td>
                                    <td id='stock-profit-positive'>
                                        <p>1200$</p>
                                    </td>
                                </tr>
                               <tr><hr/></tr>
                                <tr>
                                    <td><p>Received dividend:</p></td>
                                    <td id='stock-profit-positive'>
                                        <p>20$</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p>Forecast dividend</p></td>
                                    <td id='stock-profit-positive'><p>120$</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='info-container'>
                        <HeadOfBlock name='Calculator:' />
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        style={{ width: '150px' }}
                                    />
                                    <th
                                        style={{ width: '100px' }}
                                    />
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><p>USD:</p></td>
                                    <td id='stock-profit-positive'>
                                        <p>100$</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p>EUR:</p></td>
                                    <td id='stock-profit-negative'>
                                        <p>89.57€</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td><p>UAH:</p></td>
                                    <td id='stock-profit-positive'>
                                        <p>200₴</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className='info-container'>
                <HeadOfBlock name='Holdings:' />
                <div className='table-assets'>
                    <table className='table'>
                        <thead>
                        <tr>
                                <th>Name</th>
                                <th>Count</th>
                                <th>Entry price</th>
                                <th>Price</th>
                                <th>Cost</th>
                                <th>Sector</th>
                                <th>Dividends</th>
                                <th>Share</th>
                                <th>Profit</th>
                                <th>Growth</th>
                                <th>Currency</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeAccount ? activeAccount.stocks?.map((stock) => (
                                <tr key={stock.symbol}>
                                    <td>
                                        <div className="truncate-name" title={stock.name}>
                                            {stock.name}
                                        </div>
                                    </td>
                                    <td>{stock.countStocks}</td>
                                    <td>{stock.buyPrice}$</td>
                                    <td>
                                        {(handlePrices(stock.symbol) > stock.buyPrice)
                                            ? <div style={{ display: 'flex' }}>
                                                <img className='right-element' src="/icons/positive-growth.svg" alt="Icon" />
                                                <p id='positive-growth'>
                                                    {handlePrices(stock.symbol).toFixed(2)}
                                                </p>
                                            </div>
                                            : <div style={{ display: 'flex' }}>
                                                <img className='right-element' src="/icons/negative-growth.svg" alt="Icon" />
                                                <p id='negative-growth'>
                                                    {handlePrices(stock.symbol).toFixed(2)}
                                                </p>
                                            </div>
                                        }
                                    </td>
                                    <td>{(stock.buyPrice * stock.countStocks).toFixed(2)}$</td>
                                    <td>
                                        <div className="truncate-sector" title={stock.sector}>
                                            {stock.sector}
                                        </div>
                                    </td>
                                    <td>{stock.dividendYield}</td>
                                    <td>{getShareOfStock(stock).toFixed(2)}%</td>
                                    <td>
                                        {parseInt(profitStock(stock)) < 0
                                            ? <div style={{ display: 'flex' }}>
                                                <img className='right-element' src="/icons/negative-growth.svg" alt="Icon" />
                                                <p id='negative-growth'>
                                                    {profitStock(stock)}
                                                </p>
                                            </div>
                                            : <div style={{ display: 'flex' }}>


                                                <img className='right-element' src="/icons/positive-growth.svg" alt="Icon" />
                                                <p id='positive-growth'>
                                                    {profitStock(stock)}
                                                </p>
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        {parseInt(growthStock(stock)) < 0
                                            ? <div style={{ display: 'flex' }}>
                                                <img className='right-element' src="/icons/negative-growth.svg" alt="Icon" />
                                                <p id='negative-growth'>
                                                    {growthStock(stock)}%
                                                </p>
                                            </div>
                                            : <div style={{ display: 'flex' }}>
                                                <img className='right-element' src="/icons/positive-growth.svg" alt="Icon" />
                                                <p id='positive-growth'>
                                                    {growthStock(stock)}%
                                                </p>
                                            </div>
                                        }
                                    </td>
                                    <td>{stock.currency}</td>
                                </tr>
                            )) : <></>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
