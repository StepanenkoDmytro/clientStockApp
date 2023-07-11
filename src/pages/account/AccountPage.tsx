import { Outlet } from 'react-router-dom';
import './account.css'
import Navigation from '../components/Navigation';
// import { tokenStore, userStore } from '../../store/store';
// import { useStore } from 'effector-react';
// import { useEffect } from 'react';
// import { IUser } from '../Coin/interfaces';

export function AccountPage() {
    // const token = useStore(tokenStore);
    // const authHeader: string = `Bearer_${token}`;

    // const user = useStore(userStore);

    // useEffect(() => {
    //     fetch(`http://localhost:8000/api/v1/account`, {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: authHeader,
    //         },
            
    //       })
    //         .then(response => response.json())
    //         .then((data: IUser) => {
    //             console.log(data);
    //         })
    // }, []);
    return (
        <div className='account-container '>

            <Navigation />
            <Outlet />
        </div>
    );
}