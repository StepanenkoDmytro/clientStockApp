import './account.css'
import './transact.css'

export function TransactComponent() {
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
                        <th scope='col'>Transaction ID</th>
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
                    <tr>
                        <td><p>1</p></td>
                        <td><p>Username</p></td>
                        <td><p>DEPOSIT_ACCOUNT</p></td>
                        <td><p>1000$</p></td>
                        <td><p>BIG_BANK</p></td>
                        <td><p>success</p></td>
                        <td><p>DEPOSIT_SUCCESS</p></td>
                        <td><p>USD</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>2</p></td>
                        <td><p>Username</p></td>
                        <td><p>BUY_CRYPTO</p></td>
                        <td><p>1000$</p></td>
                        <td><p>COINCAP</p></td>
                        <td><p>success</p></td>
                        <td><p>BUY_CRYPTO_SUCCESS</p></td>
                        <td><p>Bitcoin</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>3</p></td>
                        <td><p>Username</p></td>
                        <td><p>DEPOSIT_ACCOUNT</p></td>
                        <td><p>10000$</p></td>
                        <td><p>BIG_BANK</p></td>
                        <td><p>success</p></td>
                        <td><p>DEPOSIT_SUCCESS</p></td>
                        <td><p>USD</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>4</p></td>
                        <td><p>Username</p></td>
                        <td><p>BUY_CRYPTO</p></td>
                        <td><p>500$</p></td>
                        <td><p>COINCAP</p></td>
                        <td><p>success</p></td>
                        <td><p>BUY_CRYPTO_SUCCESS</p></td>
                        <td><p>Bitcoin</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>5</p></td>
                        <td><p>Username</p></td>
                        <td><p>BUY_CRYPTO</p></td>
                        <td><p>500$</p></td>
                        <td><p>COINCAP</p></td>
                        <td><p>success</p></td>
                        <td><p>BUY_CRYPTO_SUCCESS</p></td>
                        <td><p>Dogecoin</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>1</p></td>
                        <td><p>Username</p></td>
                        <td><p>DEPOSIT_ACCOUNT</p></td>
                        <td><p>1000$</p></td>
                        <td><p>BIG_BANK</p></td>
                        <td><p>success</p></td>
                        <td><p>DEPOSIT_SUCCESS</p></td>
                        <td><p>USD</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>2</p></td>
                        <td><p>Username</p></td>
                        <td><p>BUY_CRYPTO</p></td>
                        <td><p>1000$</p></td>
                        <td><p>COINCAP</p></td>
                        <td><p>success</p></td>
                        <td><p>BUY_CRYPTO_SUCCESS</p></td>
                        <td><p>Bitcoin</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>2</p></td>
                        <td><p>Username</p></td>
                        <td><p>BUY_CRYPTO</p></td>
                        <td><p>1000$</p></td>
                        <td><p>COINCAP</p></td>
                        <td><p>success</p></td>
                        <td><p>BUY_CRYPTO_SUCCESS</p></td>
                        <td><p>Bitcoin</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>1</p></td>
                        <td><p>Username</p></td>
                        <td><p>DEPOSIT_ACCOUNT</p></td>
                        <td><p>1000$</p></td>
                        <td><p>BIG_BANK</p></td>
                        <td><p>success</p></td>
                        <td><p>DEPOSIT_SUCCESS</p></td>
                        <td><p>USD</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>2</p></td>
                        <td><p>Username</p></td>
                        <td><p>BUY_CRYPTO</p></td>
                        <td><p>1000$</p></td>
                        <td><p>COINCAP</p></td>
                        <td><p>success</p></td>
                        <td><p>BUY_CRYPTO_SUCCESS</p></td>
                        <td><p>Bitcoin</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>3</p></td>
                        <td><p>Username</p></td>
                        <td><p>DEPOSIT_ACCOUNT</p></td>
                        <td><p>10000$</p></td>
                        <td><p>BIG_BANK</p></td>
                        <td><p>success</p></td>
                        <td><p>DEPOSIT_SUCCESS</p></td>
                        <td><p>USD</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>4</p></td>
                        <td><p>Username</p></td>
                        <td><p>BUY_CRYPTO</p></td>
                        <td><p>500$</p></td>
                        <td><p>COINCAP</p></td>
                        <td><p>success</p></td>
                        <td><p>BUY_CRYPTO_SUCCESS</p></td>
                        <td><p>Bitcoin</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>5</p></td>
                        <td><p>Username</p></td>
                        <td><p>BUY_CRYPTO</p></td>
                        <td><p>500$</p></td>
                        <td><p>COINCAP</p></td>
                        <td><p>success</p></td>
                        <td><p>BUY_CRYPTO_SUCCESS</p></td>
                        <td><p>Dogecoin</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>1</p></td>
                        <td><p>Username</p></td>
                        <td><p>DEPOSIT_ACCOUNT</p></td>
                        <td><p>1000$</p></td>
                        <td><p>BIG_BANK</p></td>
                        <td><p>success</p></td>
                        <td><p>DEPOSIT_SUCCESS</p></td>
                        <td><p>USD</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>2</p></td>
                        <td><p>Username</p></td>
                        <td><p>BUY_CRYPTO</p></td>
                        <td><p>1000$</p></td>
                        <td><p>COINCAP</p></td>
                        <td><p>success</p></td>
                        <td><p>BUY_CRYPTO_SUCCESS</p></td>
                        <td><p>Bitcoin</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    <tr>
                        <td><p>2</p></td>
                        <td><p>Username</p></td>
                        <td><p>BUY_CRYPTO</p></td>
                        <td><p>1000$</p></td>
                        <td><p>COINCAP</p></td>
                        <td><p>success</p></td>
                        <td><p>BUY_CRYPTO_SUCCESS</p></td>
                        <td><p>Bitcoin</p></td>
                        <td><p>2023-05-14 11:20:35</p></td>
                    </tr>
                    
                
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