export function UserPage() {
    return (
        <div className='container mt-50'>
            <h2>User profile:</h2>
            {/* <form action='/api/v1/user/upload' method='post' enctype='multipart/form-data'>
                <input type='file' name='file' className='form-control' />
                <button type='submit' className='btn btn-success'>save</button>
            </form> */}
            <br />
            <div className='alert alert-info mt-2' style={{display: 'flex', alignItems: 'center'}}>
                <div>
                    {/* <img th:if='${user.image != null}' th:src=''/images/' + ${user.image.getId}' height='300'/>
            <img th:unless='${user.image != null}' src='/img/non-user-photo.png' alt='Preview image' height='300'
                 style={{verticalAlign: 'middle'}}> */}
                </div>
                <div style={{ display: 'inline-block', marginLeft: '10px', width: '70%', height: '40%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <p>{'Username: user'}</p>
                            <p>{'Email:  user@ '}</p>
                        </div>
                        <div className='col-md-6 text-right'>
                            <h2>{'Total balance: 0'}</h2>
                        </div>
                    </div>
                    <div className='container mt-50'>
                        <table className='table'>
                            <thead className='thead-dark'>
                                <tr>
                                    <th scope='col'>Wallets</th>
                                    <th scope='col'>Account type</th>
                                    <th scope='col'>Balance</th>
                                </tr>
                            </thead>
                            {/* <div th:each='wallet : ${user.accounts}'>
                        <tbody>
                        <tr>
                            <td>
                                <a th:text='${wallet.account_name}' th:href=''/api/v1/user/account/' + ${wallet.id}'/>
                            </td>
                            <td>
                                <p th:text='${wallet.account_type}'/>
                            </td>
                            <td>
                                <p th:text=''$' + ${wallet.balance}'/>
                            </td>
                        </tr>
                        </tbody>
                    </div> */}
                        </table>
                        {/* <div className='d-flex justify-content-end'> */}
                            {/* <button onClick='toggleDiv()' className='btn btn-success'>Create Wallet</button> */}
                            {/* <div id='myDiv' style={{ 'display: none; inline-block; vertical-align: middle; margin-top: 10px;'}}>
                                <form action='/api/v1/user/account' method='post'>
                                    <input type='text' name='accountName' placeholder='Введіть назву гаманця'
                                        className='form-control' />
                                    <button type='submit' className='btn btn-success'>Create</button>
                                </form>
                            </div> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>


            {/* <script>
    function toggleDiv() {
        var x = document.getElementById('myDiv');
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
    }
    </script> */}

        </div>
    );
}