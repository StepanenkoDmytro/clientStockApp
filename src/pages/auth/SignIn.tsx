import './auth.css'

export function SignIn() {
    return (
        <div className='container'>
            <div className='welcome'>

                <h2>Ласкаво просимо до <b>Stock Archive</b></h2>
                <p>
                    Ви знайдете зручне поєднання криптовалют та фондових портфелів одночасно. Ми надаємо вам унікальну можливість отримати доступ до аналітики та статистики щодо цих активів, допомагаючи вам приймати обґрунтовані торгові рішення.
                </p>
            </div>

            <div className='form-container'>
                <h1 id='name'>Stock Archive</h1>
                <form action='http://localhost:8000/api/v1/auth/sign-in' method='post'>
                    <div>
                        {/* <label>Email:</label> */}
                        <div>
                            <input type='text' name='username' placeholder='Enter email' className='form-control form-control-dark' />
                            <input type='password' name='password' placeholder='Enter password' className='form-control form-control-dark' />
                        </div>
                    </div>

                    <div>
                        <input type='submit' value='Sign In' className='btn btn-warning' />
                    </div>
                    <a href='#'>Забули пароль?</a>
                </form>
                <hr />
                <a href='#' className='btn btn-secondary me-2 text-white'>Sign-up</a>

            </div>
        </div>

    );
}