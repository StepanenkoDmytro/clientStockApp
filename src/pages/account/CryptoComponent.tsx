import { useStore } from 'effector-react';
import { updateAccount, userAccountsStore } from '../../store/store';
import './account.css'
import './crypto.css'
import { IAccount, IPieCoinPrice, IPieCoinsData } from '../Coin/interfaces';
import { FormEvent, useEffect, useState } from 'react';
import { USER_AUTH_TOKEN } from '../../App';
import PieChart from '../d3/PieChart';

export function CryptoComponent() {
    const accounts = useStore(userAccountsStore);
    const [activeAccount, setActiveAccount] = useState<IAccount | null>(null);
    const [accountTotalBalance, setAccountTotalBalance] = useState<number>(0);
    const [coinsPriceList, setCoinsPriceList] = useState<IPieCoinPrice[]>([]);

    const handleActiveAccount = (account: IAccount) => {
        setActiveAccount(account);
        localStorage.setItem('activeAccount', JSON.stringify(account));
        getPriceForCoins(account);
    };

    const storedActiveAccount = localStorage.getItem('activeAccount');
    useEffect(() => {
        if (storedActiveAccount) {
            setActiveAccount(JSON.parse(storedActiveAccount));
            getPriceForCoins(JSON.parse(storedActiveAccount));
        } else if (accounts.length > 0) {
            setActiveAccount(accounts[0]);
            localStorage.setItem('activeAccount', JSON.stringify(accounts[0]));
        }
    }, [accounts]);

    const getPriceForCoins = (account: IAccount) => {
        // const formData = {...account, id: account.id};
        fetch(`http://localhost:8000/api/v1/account/price-for-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            },
            body: JSON.stringify(account),
        })
            .then((response) => response.json())
            .then((response: IPieCoinsData) => {
                console.log(response);
                setAccountTotalBalance(response.totalBalance);
                setCoinsPriceList(response.pieCoins);
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => handleDepositAmount(0));
    }

    return (
        <div className='crypto-container'>
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
                <div className='pie-chart'>
                    <PieChart data={coinsPriceList} width={250} height={150} />
                </div>
                <div className='right-block'>
                    <select className='form-select'
                        value={storedActiveAccount!}
                        onChange={(e) => handleActiveAccount(JSON.parse(e.target.value))}>
                        {accounts.map((account) => (
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



            <div className='coin-table'>
                <table className='table'>
                    <thead className='thead-dark'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Amount coin</th>
                            <th>Amount usd</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeAccount?.coins.map((coin) => (
                            <tr key={coin.idCoin}>
                                <td><img src={`https://cryptologos.cc/logos/thumbs/${coin.idCoin}.png?v=024`} alt='Logo'
                                    height='32' />
                                </td>
                                <td>{coin.name}</td>
                                <td>{coin.amountCOIN}</td>
                                <td>{coin.amountUSD}$</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}