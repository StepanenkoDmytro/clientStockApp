import './stock.css'
import '../account.css'
import '../../components/css/table-assets.css'
import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { USER_AUTH_TOKEN, updateAccount, userAccountsStore } from '../../../store/store';
import { IAccount } from '../../markets/coinMarket/interfaces';
import { DepositForm } from '../porfolio/portfolio-components/DepositForm';
import { PieAssetsChart } from '../porfolio/portfolio-components/PieAssetsChart';
import HeadOfBlock from '../../components/HeadOfBlock';
import StockHoldingsTable from './stock-components/StockHoldingsTable';
import StockWalletInfoTable from './stock-components/StockWalletInfoTable';
import StockProfitTable from './stock-components/StockProfitTable';
import CalculatorTable from './stock-components/CalculatorTable';

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
                <div className='up-group'>
                    <div className='info-container'>
                        <HeadOfBlock name='Wallet info:' />
                        {activeAccount && <StockWalletInfoTable account={activeAccount} actualTotalBalance={accountTotalBalance} />}
                        <select className='form-select'
                            value={storedActiveAccount!}
                            onChange={(e) => handleActiveAccount(JSON.parse(e.target.value))}>
                            {stockAccounts.map((account) => (
                                <option key={account.accountName} value={JSON.stringify(account)}>
                                    {account.accountName}
                                </option>
                            ))}
                        </select>
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
                        <StockProfitTable />
                    </div>
                    <div className='info-container'>
                        <HeadOfBlock name='Calculator:' />
                        <CalculatorTable />
                    </div>
                </div>
            </div>

            <div className='info-container'>
                <HeadOfBlock name='Holdings:' />
                {activeAccount && <StockHoldingsTable account={activeAccount} />}
            </div>
        </div>
    );
}
