import { useStore } from 'effector-react';
import { userStore } from '../../store/store';
import './porfolio.css'
import { IUser } from '../Coin/interfaces';
import { useState } from 'react';

export function PortfolioComponent() {
    const user: IUser | null = useStore(userStore);

    const { accounts } = user || { accounts: [] };

    const [showAccountMap, setShowAccountMap] = useState<{ [key: string]: boolean }>({});

    const handleShowAccount = (accountName: string) => {
        setShowAccountMap((prevShowAccountMap) => ({
            ...prevShowAccountMap,
            [accountName]: !prevShowAccountMap[accountName],
        }));
    };
    return (
        <div className='porfolio-container'>
            <h2>{'Total balance: 0'}</h2><hr />
            <div className='dropdown'>
                <h3>Wallets</h3>
                <ul className='list-unstyled'>
                    {accounts.map((account) => (
                        <li key={account.accountName}>
                            <button
                                className={showAccountMap[account.accountName] 
                                    ? 'btn btn-secondary dropdown-toggle active' 
                                    : 'btn btn-secondary dropdown-toggle'}
                                type='button' id='cryptoDropdown'
                                onClick={() => handleShowAccount(account.accountName)}>
                                {account.accountName}
                            </button>

                            {showAccountMap[account.accountName] && (
                                <table>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Account name</th>
                                                <th>Account value</th>
                                                <th>Account money USD</th>
                                                <th>Account profit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{account.accountName}</td>
                                                <td>9876$</td>
                                                <td>{account.balance}$</td>
                                                <td>2%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </table>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}