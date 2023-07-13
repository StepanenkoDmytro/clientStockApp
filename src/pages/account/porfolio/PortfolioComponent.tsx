import { useStore } from 'effector-react';
import { saveUser, userStore } from '../../../store/store';
import './porfolio.css'
import '../../components/css/table-assets.css'
import { IUser } from '../../markets/coinMarket/interfaces';
import { FormEvent, useEffect, useState } from 'react';
import { USER_AUTH_TOKEN } from '../../../App';
import HeadOfBlock from '../../components/HeadOfBlock';

export const TYPE_CRYPTO_WALLET = 'CryptoWallet';
export const TYPE_STOCK_WALLET = 'StockWallet';

export function PortfolioComponent() {
    const user: IUser | null = useStore(userStore);

    const { accounts } = user || { accounts: [] };

    const [newAccountName, setNewAccountName] = useState('');
    const [accountType, setAccountType] = useState<string>(TYPE_STOCK_WALLET);

    useEffect(() => { }, [user]);

    const handlNewAccountName = (accountName: string) => {
        setNewAccountName(accountName);
    };

    const token = localStorage.getItem(USER_AUTH_TOKEN);
    const createNewAccount = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = { newAccountName, accountType };
        console.log(accountType);

        fetch(`http://localhost:8000/api/v1/account/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((user: IUser) => {
                console.log(user);
                saveUser(user);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteAccount = (accountID: number) => {
        fetch(`http://localhost:8000/api/v1/account/${accountID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            }
        })
            .catch((error) => {
                console.error(error);
            });
    };

    const [showAccountMap, setShowAccountMap] = useState<{ [key: string]: boolean }>({});

    const handleShowAccount = (accountName: string) => {
        setShowAccountMap((prevShowAccountMap) => ({
            ...prevShowAccountMap,
            [accountName]: !prevShowAccountMap[accountName],
        }));
    };
    return (
        <div className='porfolio-container'>

            <div className='porfolio-info'>
                <HeadOfBlock name='Portfolio info' />
                <h2>{'Total balance: 0$'}</h2>
                <form onSubmit={(e) => createNewAccount(e)}>
                    <input type='text' name='accountName' placeholder='Введіть назву гаманця'
                        onChange={(e) => handlNewAccountName(e.target.value)} />
                    <select name='accountType' defaultValue={TYPE_STOCK_WALLET}
                        onChange={(e) => setAccountType(e.target.value)}>
                        <option value={TYPE_STOCK_WALLET}>{TYPE_STOCK_WALLET}</option>
                        <option value={TYPE_CRYPTO_WALLET}>{TYPE_CRYPTO_WALLET}</option>
                    </select>
                    <button type='submit' className='btn btn-success'>Create</button>
                </form>
            </div>
            <hr />

            <div className='wallets'>
                <div className='wallets-dropdown'>
                    <HeadOfBlock name='Wallets:' />
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
                                    <div className='table-assets'>
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th>Account name</th>
                                                    <th>Account Type</th>
                                                    <th>Account value</th>
                                                    <th>Account money USD</th>
                                                    <th>Account profit</th>
                                                    <th>Delete account</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{account.accountName}</td>
                                                    <td>{account.accountType}</td>
                                                    <td></td>
                                                    <td>{account.balance}$</td>
                                                    <td></td>
                                                    <td>
                                                        <button
                                                            id='button-delete'
                                                            onClick={() => deleteAccount(account.id)}>
                                                            <img src='/delete-icon.svg' />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}