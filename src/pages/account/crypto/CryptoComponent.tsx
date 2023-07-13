import { useStore } from 'effector-react';
import '../account.css'
import './crypto.css'
import '../../components/css/table-assets.css'
import { useEffect, useState } from 'react';
import { USER_AUTH_TOKEN, updateAccount, userAccountsStore } from '../../../store/store';
import { IAccount } from '../../markets/coinMarket/interfaces';
import { DepositForm } from '../porfolio/portfolioComponents/DepositForm';
import { PieAssetsChart } from '../porfolio/portfolioComponents/PieAssetsChart';
import HeadOfBlock from '../../components/HeadOfBlock';

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

    const handleDepositAccount = (account: IAccount) => {
        console.log(account);
        updateAccount(account);
        setActiveAccount(account);
        localStorage.setItem('activeCryptoAccount', JSON.stringify(account));
    };

    return (
        <div className='crypto-container'>
            <div className='up'>
                <div className='info-container'>
                    <HeadOfBlock name='Wallet info:' />
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
                                <td id='crypto-wallet-info'>
                                    <h4>{accountTotalBalance}$</h4>
                                </td>
                            </tr>
                            <tr>
                                <td><p>Unused USD:</p></td>
                                <td id='crypto-wallet-info'><p>{activeAccount?.balance}$</p></td>
                            </tr>
                            <tr>
                                <td><p>Account name:</p></td>
                                <td id='crypto-wallet-info'>
                                    <select className='form-select'
                                        value={storedActiveAccount!}
                                        onChange={(e) => handleActiveAccount(JSON.parse(e.target.value))}>
                                        {cryptoAccounts.map((account) => (
                                            <option key={account.accountName} value={JSON.stringify(account)}>
                                                {account.accountName}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><p>Account type:</p></td>
                                <td id='crypto-wallet-info'><p>{activeAccount?.accountType}</p></td>
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
                {/* <div className='actions-wallet'>
                    <p>Action wallet</p>

                    {activeAccount &&
                        <DepositForm accountID={activeAccount.id} handleDepositAccount={handleDepositAccount} />
                    }
                </div> */}
            </div>

            <hr />
            {/* <div>
                <Speedometer width={200} height={200} value={64} previousValues={[74,76]}/>
            </div> */}
            <div className='info-container'>
                <HeadOfBlock name='Holdings:' />
                <div className='table-assets'>
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
                                <tr key={coin.idCoin} style={{ width: '20px' }}>
                                    <td style={{ width: '20px' }}>
                                        <img src={`https://cryptologos.cc/logos/thumbs/${coin.idCoin}.png?v=024`} alt='Logo'
                                            height='24' />
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
        </div>
    );
}