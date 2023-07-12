import { useEffect, useState } from 'react';
import './stock.css'
import '../account.css'
import '../../components/css/table-assets.css'
import { useStore } from 'effector-react';
import { USER_AUTH_TOKEN, updateAccount, userAccountsStore } from '../../../store/store';
import { IAccount } from '../../markets/coinMarket/interfaces';
import { DepositForm } from '../porfolio/portfolioComponents/DepositForm';
import { PieAssetsChart } from '../porfolio/portfolioComponents/PieAssetsChart';

export function StockComponent() {
    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const accounts: IAccount[] = useStore(userAccountsStore);
    const stockAccounts = accounts.filter((account) => account.accountType === 'StockWallet');

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
                        console.log(account);
                        setActiveAccount(account);
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

    return (
        <div className='stock-container'>
            <div className='up'>
                <div className='stock-info'>
                    <label>Wallet info</label>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '250px' }} />
                                <th style={{ width: '200px' }} />
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><h4>Total balance:</h4></td>
                                <td id='stock-wallet-info'>
                                    <h4>{accountTotalBalance}$</h4>
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
                {/* <div className='actions-wallet'>
                    {activeAccount &&
                        <DepositForm accountID={activeAccount.id} handleDepositAccount={handleAccount} />
                    }


                </div> */}
                <div className='pie-chart'>
                    <p>Diagram:</p>
                    {activeAccount &&
                        <PieAssetsChart account={activeAccount} handleTotalBalance={handleTotalBalance} />
                    }
                </div>
            </div>
            <hr />
            <div className='stock-porfolio-info'>
                <p>Holdings:</p>
                {/* <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-outline-primary">Left</button>
                    <button type="button" className="btn btn-outline-primary">Middle</button>
                    <button type="button" className="btn btn-outline-primary">Right</button>
                </div><hr /> */}
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
                                {/* <th>Asset type</th> */}
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
                                    <svg width="23" height="23" fill="#ed230c" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.59 16.005 5.982 7.398l1.414-1.414 8.607 8.606V7.005h2v11h-11v-2h7.587Z"></path>
                                        </svg>
                                    </td>
                                    <td>{(stock.buyPrice * stock.countStocks).toFixed(2)}$</td>
                                    <td>
                                        <div className="truncate-sector" title={stock.sector}>
                                            {stock.sector}
                                        </div>
                                    </td>
                                    <td>{stock.dividendYield}</td>
                                    <td>
                                        <svg width="23" height="23" fill="#ed230c" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14.59 16.005 5.982 7.398l1.414-1.414 8.607 8.606V7.005h2v11h-11v-2h7.587Z"></path>
                                        </svg>
                                    </td>
                                    <td>
                                        <svg width="23" height="23" fill="#0ced1b" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m16.004 9.414-8.607 8.607-1.414-1.414L14.59 8H7.004V6h11v11h-2V9.414Z"></path>
                                        </svg>

                                    </td>
                                    <td>
                                    <svg width="23" height="23" fill="#0ced1b" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m16.004 9.414-8.607 8.607-1.414-1.414L14.59 8H7.004V6h11v11h-2V9.414Z"></path>
                                        </svg>
                                    </td>
                                    {/* <td>{stock.assetType}</td> */}
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