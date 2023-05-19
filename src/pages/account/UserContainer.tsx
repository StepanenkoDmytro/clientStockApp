import './user.css'

export function UserContainer() {
    return (
        <div className='user-container'>

            <div className='profile-info'>
                <div className='user-photo'>
                    <img src='/src/img/non-user-photo.png' />
                </div>

                <div className='user-details'>
                    <div>
                        <h4>Contact information:</h4> <hr />
                        <p>{'Dmytro Stepanenko'}</p>
                        <p>{'user@gmail.com'}</p>
                        <p>{'0982846242'}</p>
                        <p><a href='#'>{'Edit'}</a>{' | '} <a href='#'>{'Change password'}</a></p>
                    </div>
                    <div>
                        <h4>Address information:</h4> <hr />
                        <p>{'Country: Ukraine'}</p>
                        <p>{'City: Dnipro'}</p>
                        <p><a href='#'>{'Edit address'}</a></p>
                    </div>

                </div>
            </div>
            <hr />
        </div>
    );
}