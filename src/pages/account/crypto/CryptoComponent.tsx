import { useStore } from 'effector-react';
import '../account.css'
import './crypto.css'
import '../../components/css/table-assets.css'
import { useEffect, useState } from 'react';
import { USER_AUTH_TOKEN, updateAccount, userAccountsStore } from '../../../store/store';
import { IAccount } from '../../markets/coinMarket/interfaces';
import { DepositForm } from '../porfolio/portfolio-components/DepositForm';
import { PieAssetsChart } from '../porfolio/portfolio-components/PieAssetsChart';
import HeadOfBlock from '../../components/HeadOfBlock';
import CryptoWalletInfoTable from './crypto-components/CryptoWalletInfoTable';
import CryptoHoldingsTable from './crypto-components/CryptoHoldingsTable';
import Gauge from '../../components/d3/GaugeChart';
import CryptoProfitTable from './crypto-components/CryptoProfitTable';
import FearGreeIndex from './crypto-components/FearGreedIndex';

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
                <div className='up-inline'>
                    <div className='info-container'>
                        <HeadOfBlock name='Wallet info:' />

                        {activeAccount && <CryptoWalletInfoTable account={activeAccount} actualTotalBalance={accountTotalBalance} />}

                        <select className='form-select'
                            value={storedActiveAccount!}
                            onChange={(e) => handleActiveAccount(JSON.parse(e.target.value))}>
                            {cryptoAccounts.map((account) => (
                                <option key={account.accountName} value={JSON.stringify(account)}>
                                    {account.accountName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='info-container'>
                        <HeadOfBlock name='Profit:' />
                        <CryptoProfitTable />
                    </div>
                    
                </div>
                <div className='up-inline'>
                    <div className='info-container'>
                        <HeadOfBlock name='Diagram:' />
                        {activeAccount &&
                            <PieAssetsChart account={activeAccount} handleTotalBalance={handleTotalBalance} />
                        }
                    </div>
                    <div className='info-container'>
                        <HeadOfBlock name='Fear & Greed Index:' />
                        <FearGreeIndex />
                    </div>
                </div>
                {/* <div className='actions-wallet'>
                    <p>Action wallet</p>

                    {activeAccount &&
                        <DepositForm accountID={activeAccount.id} handleDepositAccount={handleDepositAccount} />
                    }
                </div> */}

            </div>

            <hr />
            <div className='info-container'>
                <HeadOfBlock name='Holdings:' />
                {activeAccount && <CryptoHoldingsTable account={activeAccount} />}
            </div>

        </div>
    );
}