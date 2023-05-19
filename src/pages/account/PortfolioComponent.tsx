import './porfolio.css'

export function PortfolioComponent() {
    return (
        <div className='porfolio-container'>
            <h2>{'Total balance: 0'}</h2><hr/>
            <div className="dropdown">
                <h3>Wallets</h3>
                <ul className="list-unstyled">
                    <li>
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="cryptoDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            Crypto portfolios
                        </button>
                        <ul className="dropdown-menu dropdown-menu-start" aria-labelledby="cryptoDropdown">
                            <li>
                                <table className="table">
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
                                            <td>CryptoTest</td>
                                            <td>9876$</td>
                                            <td>1500$</td>
                                            <td>2%</td>
                                        </tr>
                                        <tr>
                                            <td>CryptoTest2</td>
                                            <td>9276$</td>
                                            <td>1000$</td>
                                            <td>10%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="stockDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            Stock portfolios
                        </button>
                        <ul className="dropdown-menu dropdown-menu-start" aria-labelledby="stockDropdown">
                            <li>
                                <table className="table">
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
                                            <td>FoundTest1</td>
                                            <td>9876$</td>
                                            <td>1500$</td>
                                            <td>2%</td>
                                        </tr>
                                        <tr>
                                            <td>FoundTest1</td>
                                            <td>9276$</td>
                                            <td>1000$</td>
                                            <td>10%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}