import { FormEvent, useEffect, useState } from 'react';
import { IAccount, IPieCoinsData } from '../Coin/interfaces';
import './account.css'
import './stock.css'
import { USER_AUTH_TOKEN } from '../../App';
import { useStore } from 'effector-react';
import { updateAccount, userAccountsStore } from '../../store/store';

export function StockComponent() {
    const accounts: IAccount[] = useStore(userAccountsStore);
    const stockAccounts = accounts.filter((account) => account.accountType === 'StockWallet');
    console.log(stockAccounts);


    const [activeAccount, setActiveAccount] = useState<IAccount | null>(null);
    const [accountTotalBalance, setAccountTotalBalance] = useState<number>(0);

    const handleActiveAccount = (account: IAccount) => {
        setActiveAccount(account);
        localStorage.setItem('activeStockAccount', JSON.stringify(account));
    };

    const storedActiveAccount = localStorage.getItem('activeStockAccount');
    useEffect(() => {
        if (storedActiveAccount) {
            setActiveAccount(JSON.parse(storedActiveAccount));
        } else if (stockAccounts.length > 0) {
            setActiveAccount(stockAccounts[0]);
            localStorage.setItem('activeStockAccount', JSON.stringify(stockAccounts[0]));
        }
    }, [accounts]);

    const [depositAmount, setDepositAmount] = useState(0);

    const handleDepositAmount = (deposit: number) => {
        setDepositAmount(deposit);
    }

    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const handleDeposit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const accountId = activeAccount?.id;

        const formData = { accountId, depositAmount };

        fetch(`http://localhost:8000/api/v1/account/deposit`, {
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
                setActiveAccount(account);
                localStorage.setItem('activeStockAccount', JSON.stringify(account));
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => handleDepositAmount(0));
    }

    return (
        <div className='stock-container'>
            <div className='coin-details'>
                <div className='left-block'>
                    <h1>{activeAccount?.accountName}</h1>
                    <h6>{activeAccount?.accountType}</h6>
                    <form onSubmit={(event) => handleDeposit(event)}>
                        <input type='number' name='depositAmount' placeholder='Введіть суму депозиту'
                            onChange={(e) => handleDepositAmount(Number(e.target.value))} />
                        <button style={{ marginLeft: '5px' }} type='submit' className='btn btn-success'>Accept</button>
                    </form>
                </div>
                {/* <div className='pie-chart'>
                    <PieChart data={coinsPriceList} width={250} height={150} />
                </div> */}
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

            {/* <div>
                <ul>
                    {activeAccount?.stocks.map((stock) => (
                        <li>{stock.name}, {stock.buyPrice}$, {stock.countStocks}</li>

                    ))}
                </ul>
            </div> */}


            <div className='coin-table'>
                <table className='table'>
                    <thead className='thead-dark'>
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
                    {activeAccount?.stocks.map((stock) => (
                            <tr key={stock.symbol}>
                                <td>{stock.name}</td>
                                <td>{stock.buyPrice}$</td>
                                <td>{stock.countStocks}</td>
                                <td>{stock.assetType}</td>
                                <td>{stock.currency}</td>
                                <td>{stock.dividendYield}</td>
                                <td>{stock.sector}</td>
                                <td>{stock.buyPrice*stock.countStocks}$</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}