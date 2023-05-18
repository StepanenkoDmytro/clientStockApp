import './account.css'

export function UserContainer() {
    return (
        <div className='user-container'>

                <div className='profile-info'>
                    <div className='user-photo'>
                        <img src='/src/img/non-user-photo.png' />
                    </div>

                    <div className='user-details'>
                        <div>
                            <p>{'Username: user'}</p>
                            <p>{'Email:  user@ '}</p>
                        </div>
                        <div>
                            <h2>{'Total balance: 0'}</h2>
                        </div>
                    </div>
                </div>

                <div>
                    <table>
                        <thead>
                            <tr>
                                <th scope='col'>Wallets</th>
                                <th scope='col'>Account type</th>
                                <th scope='col'>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <a href='#'>Мій кріпто портфель</a>
                                </td>
                                <td>
                                    <p>CryptoWallet</p>
                                </td>
                                <td>
                                    <p>1000$</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href='#'>Мій кріпто портфель</a>
                                </td>
                                <td>
                                    <p>CryptoWallet</p>
                                </td>
                                <td>
                                    <p>1000$</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
    );
}