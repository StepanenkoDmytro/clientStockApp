import { FormEvent, useState } from 'react';
import './auth.css'
import { saveToken, saveUser } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { IUserDto } from '../Coin/interfaces';

export function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: string) => {
        setEmail(e);
    };

    const handlePasswordChange = (e: string) => {
        setPassword(e);
    };
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = { email, password };

        fetch('http://localhost:8000/api/v1/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((response: IUserDto) => {
                const { token, user } = response;
                saveToken(token);
                saveUser(user);
                navigate('/coins');
            })
            .catch((error) => {
                console.error(error);
            });
    };
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
                <form onSubmit={(e) => handleSubmit(e)}>

                    <div>
                        <input type='text' name='email' placeholder='Enter email' className='form-control form-control-dark'
                            value={email} onChange={(e) => handleUsernameChange(e.target.value)} />
                        <input type='password' name='password' placeholder='Enter password' className='form-control form-control-dark'
                            value={password} onChange={(e) => handlePasswordChange(e.target.value)} />
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