import { useStore } from 'effector-react';
import { updateAccount, userAccountsStore } from '../../store/store';
import './account.css'
import './crypto.css'
import { IAccount } from '../Coin/interfaces';
import { useEffect, useState } from 'react';
import { USER_AUTH_TOKEN } from '../../App';
import { DepositForm } from './portfolioComponents/DepositForm';
import { PieAssetsChart } from './portfolioComponents/PieAssetsChart';

export function CryptoComponent() {
    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const accounts: IAccount[] = useStore(userAccountsStore);
    const cryptoAccounts = accounts.filter((account) => account.accountType === 'CryptoWallet');


    const [activeAccount, setActiveAccount] = useState<IAccount | null>(null);
    const [accountTotalBalance, setAccountTotalBalance] = useState<number>(0);

    const handleActiveAccount = (account: IAccount) => {
        setActiveAccount(account);
        localStorage.setItem('activeCryptoAccount', JSON.stringify(account));
    };

    const storedActiveAccount = localStorage.getItem('activeCryptoAccount');

    const getSavedAccountFromLocalStorage = () => {
        if (storedActiveAccount) {
            setActiveAccount(JSON.parse(storedActiveAccount));
        } else if (cryptoAccounts.length > 0) {
            handleActiveAccount(cryptoAccounts[0]);
        }
    }

    useEffect(() => {
        getSavedAccountFromLocalStorage();
        {activeAccount &&
            fetch(`http://localhost:8000/api/v1/account/${activeAccount.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer_${token}`
                }})
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

    const handleDepositAccount = (account: IAccount) => {
        console.log(account);
        updateAccount(account);
        setActiveAccount(account);
        localStorage.setItem('activeCryptoAccount', JSON.stringify(account));
    };

    return (
        <div className='crypto-container'>
            <div className='coin-details'>
                <div className='left-block'>
                    <h1>{activeAccount?.accountName}</h1>
                    <h6>{activeAccount?.accountType}</h6>
                    {activeAccount &&
                        <DepositForm accountID={activeAccount.id} handleDepositAccount={handleDepositAccount} />
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
                        {cryptoAccounts.map((account) => (
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