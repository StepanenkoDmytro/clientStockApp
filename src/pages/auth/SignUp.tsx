import './auth.css'

export function SignUp() {
    return (
        <div className='reg'>
            <div className='register-container'>
                <div>
                    <h1 id='name'>Stock Archive</h1>
                    <p >Зареєструйтеся та зростайте разом з нашою аналітикою криптовалютних та фондових портфелів.</p>
                </div> <hr />
                <form action='#' method='post' >
                    <input className='form-control form-control-dark' placeholder='Enter email' type='text' name='email' />
                    <input className='form-control form-control-dark' placeholder='Enter username' type='text' name='username' />
                    <input className='form-control form-control-dark' placeholder='Enter password' type='password' name='password' />
                    <hr />
                    <p style={{ fontSize: '12px' }}>Реєструючись, ви приймаєте наші <a href='#'>Умови, Політику конфіденційності і Політику щодо файлів cookie.</a></p>
                    <input className='btn btn-warning' type='submit' value='Register' />
                </form>
                <hr />
                <p>У вас є обліковий запис?</p>

                <a href='#' className='btn btn-secondary me-2 text-white' style={{ width: '100%' }}>Sign-in</a>
            </div>
        </div>
    );
}