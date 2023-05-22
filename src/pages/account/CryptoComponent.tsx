import { useStore } from 'effector-react';
import { userStore } from '../../store/store';
import './account.css'
import './crypto.css'
import { IAccount, IUser } from '../Coin/interfaces';
import { useState } from 'react';

export function CryptoComponent() {
    const user: IUser | null = useStore(userStore);
    const { accounts } = user || { accounts: [] };
    const [activeAccount, setActiveAccount] = useState<IAccount | null>(accounts.length > 0 ? accounts[0] : null);


    const handleActiveAccount = (account: IAccount) => {
        setActiveAccount(account);
    }
    return (
        <div className='crypto-container'>

            <select onChange={(e) => handleActiveAccount(JSON.parse(e.target.value))}>
                {accounts.map((account) => (
                    <option key={account.accountName} value={JSON.stringify(account)}>
                        {account.accountName}
                    </option>
                ))}
            </select>
            
            <h1>{activeAccount?.accountName}</h1>
            <h6>{activeAccount?.accountType}</h6>
            <h4>{activeAccount?.balance}</h4>
            <ul>
                {activeAccount?.coins.map( (coin) => (
                    <li>{coin.name}</li>
                ))}
            </ul>

        </div>
    );
}