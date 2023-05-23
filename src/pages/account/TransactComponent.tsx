import { useEffect, useState } from 'react';
import './account.css'
import './transact.css'
import { userStore } from '../../store/store';
import { useStore } from 'effector-react';
import { ITransact, IUser } from '../Coin/interfaces';
import { USER_AUTH_TOKEN } from '../../App';

export function TransactComponent() {
    const user: IUser | null = useStore(userStore);
    const token = localStorage.getItem(USER_AUTH_TOKEN);

    const[transacts, setTransacts] = useState<ITransact[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/transacts?userId=${user?.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer_${token}`
            }
        })
        .then(response => response.json())
        .then((response: ITransact[]) => {
            console.log(response);
            setTransacts(response);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);
    return (
        <div className='transact-container'>
            {/* <h3>Transaction History</h3> */}
            {/* <div className='date-container'>
                <input type='date' className='form-control form-control-dark'/>
                <input type='date' className='form-control form-control-dark' />
            </div> */}
            <div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {/* <th scope='col'>Transaction ID</th> */}
                        <th scope='col'>
                            {/* Account Name */}
                            <select className="form-select" aria-label="Default select example">
                                <option value='hidden' hidden selected>Account</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </th>
                        <th scope='col'>
                            {/* Transaction Type */}
                            <select className="form-select" aria-label="Default select example">
                                <option value='hidden' hidden selected>Transact Type</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Source</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Reason Code</th>
                        <th scope='col'>Purchase Details</th>
                        <th scope='col'>Created at</th>
                    </tr>
                </thead>
                <tbody>
                    {transacts.map((transact) => (
                        <tr>
                        <td>{transact.accountID}</td>
                        <td>{transact.transactionType}</td>
                        <td>{transact.amount}</td>
                        <td>{transact.source}</td>
                        <td>{transact.status}</td>
                        <td>{transact.reasonCode}</td>
                        <td>{transact.purchaseDetails}</td>
                        <td>{transact.created.toLocaleString()}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </div>
            {/* <nav aria-label='...' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ul className='pagination pagination-sm'>
                    <li className='page-item active' aria-current='page'>
                        <span className='page-link'>1</span>
                    </li>
                    <li className='page-item'><a className='page-link' href='#'>2</a></li>
                    <li className='page-item'><a className='page-link' href='#'>3</a></li>
                </ul>
            </nav> */}
        </div>
    );
}