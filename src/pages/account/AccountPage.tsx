import { Outlet } from 'react-router-dom';
import './account.css'
import { UserMenu } from './UserMenu';

export function AccountPage() {
    return (
        <div className='account-container '>

            <UserMenu />
            <Outlet />
        </div>
    );
}