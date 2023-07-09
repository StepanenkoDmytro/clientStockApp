import { useEffect, useState } from 'react';
import { IAccount } from '../Coin/interfaces';
import './stock.css'
import './account.css'
import { USER_AUTH_TOKEN } from '../../App';
import { useStore } from 'effector-react';
import { updateAccount, userAccountsStore } from '../../store/store';
import { DepositForm } from './portfolioComponents/DepositForm';
import { PieAssetsChart } from './portfolioComponents/PieAssetsChart';

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
            <div className='coin-details'>
                <div className='left-block'>
                    <h1>{activeAccount?.accountName}</h1>
                    <h6>{activeAccount?.accountType}</h6>
                    {activeAccount &&
                        <DepositForm accountID={activeAccount.id} handleDepositAccount={handleAccount} />
                    }
                </div>
                <div className='pie-chart'>
                    {activeAccount &&
                        <PieAssetsChart account={activeAccount} handleTotalBalance={handleTotalBalance} />
                    }
                </div>
                <div className='right-block'>
                    <select className='form-select'
                        value={storedActiveAccount!}
                        onChange={(e) => handleActiveAccount(JSON.parse(e.target.value))}>
                        {stockAccounts.map((account) => (
                            <option key={account.accountName} value={JSON.stringify(account)}>
                                {account.accountName}
                            </option>
                        ))}
                    </select>
                    <h2>Total balance: {accountTotalBalance}$</h2>
                    <h4>USD: {activeAccount?.balance}$</h4>
                </div>
            </div>
            <hr />
            <div className='stock-porfolio-info'>
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-outline-primary">Left</button>
                    <button type="button" className="btn btn-outline-primary">Middle</button>
                    <button type="button" className="btn btn-outline-primary">Right</button>
                </div><hr/>
                <div className='stock-table'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Buy price</th>
                                <th>Count</th>
                                <th>Asset type</th>
                                <th>Currency</th>
                                <th>Dividend yield</th>
                                <th>Sector</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeAccount ? activeAccount.stocks?.map((stock) => (
                                <tr key={stock.symbol}>
                                    <td>{stock.name}</td>
                                    <td>{stock.buyPrice}$</td>
                                    <td>{stock.countStocks}</td>
                                    <td>{stock.assetType}</td>
                                    <td>{stock.currency}</td>
                                    <td>{stock.dividendYield}</td>
                                    <td>{stock.sector}</td>
                                    <td>{(stock.buyPrice * stock.countStocks).toFixed(2)}$</td>
                                </tr>
                            )) : <></>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}