import { Link, NavLink } from 'react-router-dom';
import './account.css'

export function UserMenu() {
    const menuItems = [
        {
            link: '/account/porfolio',
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-home align-text-bottom' aria-hidden='true'><path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path><polyline points='9 22 9 12 15 12 15 22'></polyline></svg>",
            title: 'Portfolio Overview'
        },
        {
            link: '/account/crypto',
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-file align-text-bottom' aria-hidden='true'><path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'></path><polyline points='13 2 13 9 20 9'></polyline></svg>",
            title: 'Crypto Portfolio'
        },
        {
            link: '/account/stock',
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-shopping-cart align-text-bottom' aria-hidden='true'><circle cx='9' cy='21' r='1'></circle><circle cx='20' cy='21' r='1'></circle><path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path></svg>",
            title: 'Stock Portfolio'
        },
        {
            link: '/account/transfer',
            icon: "<svg xmlns='http://www.w3.org/2000/svg ' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-users align-text-bottom ' aria-hidden='true'><path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path><circle cx='9 ' cy='7 ' r='4 '></circle><path d='M23 21v-2a4 4 0 0 0-3-3.87 '></path><path d='M16 3.13a4 4 0 0 1 0 7.75 '></path></svg>",
            title: 'Transfers Money'
        },
        {
            link: '/account/transactions',
            icon: "<svg xmlns='http://www.w3.org/2000/svg ' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-bar-chart-2align-text-bottom ' aria-hidden='true'><line x1='18 ' y1='20 ' x2='18 ' y2='10 '></line><line x1='12' y1='20 ' x2='12' y2='4 '></line><line x1='6 ' y1='20 ' x2='6 ' y2='14 '></line></svg>",
            title: 'Transactions'
        },
        {
            link: '/account/user',
            icon: "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='feather feather-layers align-text-bottom' aria-hidden='true'><polygon points='12 2 2 7 12 12 22 7 12 2'></polygon><polyline points='2 17 12 22 22 17'></polyline><polyline points='2 12 12 17 22 12'></polyline></svg>",
            title: 'User Settings'
        }
    ]
    return (
        <div className='user-menu-container'>
            <div>
                <div className='preview-name'>
                    <img src='https://github.com/mdo.png ' alt='mdo ' width='64 ' height='64 ' style={{ float: 'left', borderRadius: '15%', marginRight: '3%' }} />
                    <div>
                        <h3>Username</h3>
                        <p>AccountType</p>
                    </div>
                </div>
                <ul className='nav flex-column'>
                    {menuItems.map((item) => <li className='nav-item' key={item.title}>
                        <NavLink to={item.link}
                                 className={({ isActive }) => isActive ? "nav-link active" : "nav-link "}>
                            <span dangerouslySetInnerHTML={{ __html: item.icon }} className='menu-icon' />
                            {item.title}
                        </NavLink>
                    </li>)}
                </ul>
            </div>
        </div>
    );
}