import { useStore } from 'effector-react';
import { $search, saveToken, setSearch, userStore } from '../../store/store'
import './header.css'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { IUser } from '../markets/coinMarket/interfaces';

export function Header() {
    const user: IUser | null = useStore(userStore);

    const search = useStore($search);
    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const navigate = useNavigate();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate('/coins');
    };
    
    const handleLogout = () => {  
        saveToken('');
        navigate('/sign-in');
    };

    return (
        <header>
            <div className='container'>
                <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start'>
                    <a href='/' className='d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none'>
                        <svg className='bi me-2' width='40' height='32' role='img' aria-label='Bootstrap'>
                            <use xlinkHref='#bootstrap'>
                                <svg id='bootstrap' viewBox='0 0 118 94' width='100%' height='100%'>
                                    <title>Bootstrap</title>
                                    <path fillRule='evenodd' clipRule='evenodd' d='M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z'></path>
                                </svg>
                            </use>
                        </svg>
                    </a>

                    <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
                        <li><a href='/coin-market' className='nav-link'>Crypto Market</a></li>
                        <li><a href='/stock-market' className='nav-link'>Stock Market</a></li>
                    </ul>
                    <div className='elements-menu d-flex align-items-center'>
                        <form className='col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3' onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>
                            <input type='search' className='form-control form-control-dark'
                                placeholder='Search...' aria-label='Search'
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </form>
                        {user != null
                            ? (<div className='dropdown text-end'>
                                <a href='#' className='d-block link-dark text-decoration-none dropdown-toggle' id='dropdownUser1' data-bs-toggle='dropdown' aria-expanded='false'>
                                    {user.imageID !== 0 ? (
                                        <img src={`http://localhost:8000/images/${user?.imageID}`} alt='mdo' width='32' height='32' className='rounded-circle' />)
                                        : (
                                            <img src='/src/img/non-user-photo.png' alt='mdo' width='32' height='32' className='rounded-circle'/>
                                        )}
                                </a>

                                <ul className='dropdown-menu text-small' aria-labelledby='dropdownUser1'>
                                    <li>
                                        <NavLink to='/page/porfolio' className='dropdown-item'>Profile Overview</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/page/crypto' className='dropdown-item'>Crypto Portfolio</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/page/stock' className='dropdown-item'>Stock Portfolio</NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink to='/page/transfer' className='dropdown-item'>Transfers Money</NavLink>
                                    </li> */}
                                    <li>
                                        <NavLink to='/page/transactions' className='dropdown-item'>Transactions</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/page/user' className='dropdown-item'>User Settings</NavLink>
                                    </li>
                                    <li><hr className='dropdown-divider' /></li>
                                    <li><a className='dropdown-item' onClick={handleLogout}>Sign out</a></li>
                                </ul>
                            </div>)
                            : (<div className='text-end'>
                                <Link to='/sign-in' style={{ display: 'inline-block' }}>
                                    <button type='submit' className='btn btn-warning'>Sign-in</button>
                                </Link>
                                <Link to='/sign-up' style={{ display: 'inline-block', marginLeft: '5px' }}>
                                    <button type='submit' className='btn btn-secondary me-2 text-white'>Sign-up</button>
                                </Link>
                            </div>)}

                    </div>
                </div>
            </div>
        </header>
    )
}