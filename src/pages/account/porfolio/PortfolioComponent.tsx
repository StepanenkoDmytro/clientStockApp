import { useStore } from 'effector-react';
import { saveUser, updateAccount, userStore } from '../../../store/store';
import './porfolio.css'
import '../account.css'
import '../../components/css/table-assets.css'
import { IAccount, IUser } from '../../markets/coinMarket/interfaces';
import { FormEvent, useEffect, useState } from 'react';
import { USER_AUTH_TOKEN } from '../../../App';
import HeadOfBlock from '../../components/HeadOfBlock';
import { DepositForm } from './portfolio-components/DepositForm';
import SummaryProfitPortfolio from './portfolio-components/SummaryProfitPortfolio';

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

    const handleClick = () => {
        const input = document.querySelector('#inputFile')!;
        input.click();
    }
   
    return (
        <div className='porfolio-container'>
            <div className='up'>
                <div className='info-container'>
                    <HeadOfBlock name='Dmytro Stepanenko:' />

                    <div className='user-photo' onClick={() => handleClick()}>
                        <img
                            src={user?.imageID ? `http://localhost:8000/images/${user?.imageID}` : '/src/img/non-user-photo.png'}
                        />
                        <span> update photo </span>
                        <input type="file" name="" id="inputFile" style={{ display: 'none' }}
                        //   onChange={}
                        />
                    </div>
                    {/* <div>
                        <h2>{'Total balance: 0$'}</h2>
                        <p>{'Dmytro Stepanenko'}</p>
                        <p>{user?.email}</p>
                        <p>{'0982846242'}</p>
                    </div> */}
                </div>
                <div className='info-container'>
                    <HeadOfBlock name='Portfolio info' />
                    {/* <h2>{'Total balance: 0$'}</h2> */}
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
                    {accounts
                        ? <div>
                            <select className='form-select'
                                // value={depositAccount!.accountName}
                                // onChange={(e) => handleAccount(JSON.parse(e.target.value))}
                                >
                                {accounts.map((account) => (
                                    <option key={account.accountName} value={JSON.stringify(account)}>
                                        {account.accountName}
                                    </option>
                                ))}
                            </select>
                            {/* <DepositForm accountID={depositAccount!.id} handleDepositAccount={handleDepositAccount} /> */}
                        </div>
                        : <></>}
                </div>
                <div className='info-container'>
                    <HeadOfBlock name='Summary profit:' />
                    <SummaryProfitPortfolio />
                </div>
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