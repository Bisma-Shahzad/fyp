import { useNavigate } from 'react-router-dom'
import '../Navbar/Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { removeDataFromLocalStorage } from '../../Utils/getAndSetInLocalStorage';
import { removeUserDataFromAsyncStorage } from '../../config/redux/reducer/AuthReducer';

export default function Footer() {
    const dispatch = useDispatch();
    let nav = useNavigate()
    const userAuth = useSelector(state => state.AuthReducer.userData);
    console.log('dataFromRedux at homescreen', userAuth)

    const handleLoginClick = () => {
        const userType = 'User'; // or any other value
        nav('/login', {
            state: userType
        });
        console.log('loginButton')
    }

    const handleListVehicle = () => {
        const userType = 'Transporter'; // or any other value
        nav('/login', {
            state: userType
        });
        console.log('loginButton')
    }

    const handleAddVehicleClick = () => {
        nav('/addcars')
    }

    const handleBookingClick = () => {
        nav('/transporterprofile')
    }

    const handleProfileClick = () => {
        nav('/profile')
        console.log('ProfileButton')
    }

    const handleLogoutButton = () => {
        removeDataFromLocalStorage('token');
        removeDataFromLocalStorage('user');
        dispatch(removeUserDataFromAsyncStorage());
        nav('/')
    }

    return (<>
        <div className="mainFooter">
            <div>
                <li className='FooterLogo' onClick={() => nav('/')}>
                    WHEEL CONNECT
                </li>
            </div>
            <div className='Footerlistdiv'>
                <ul>
                    {userAuth?.instituteType == 'Transporter' ? (
                        <li className='Footerlist' style={{ width: '140px' }}
                            onClick={handleAddVehicleClick}>
                            ADD VEHICLE
                        </li>
                    ) : (
                        <li className='Footerlist' style={{ width: '120px', textAlign: 'center' }}
                            onClick={() => nav('/about')}>
                            ABOUT
                        </li>
                    )}
                    {userAuth?.instituteType == 'User' ? (
                        <li className='Footerlist' onClick={handleProfileClick}
                            style={{ width: '100px', textAlign: 'center' }}>
                            PROFILE</li>
                    ) : userAuth?.instituteType == 'Transporter' ? (
                        <li className='Footerlist' onClick={handleBookingClick}
                            style={{ width: '100px' }}>
                            PROFILE</li>
                    ) : (
                        <li className='Footerlist' style={{ width: '100px' }} onClick={handleLoginClick}>LOGIN</li>
                    )}
                    {userAuth?.instituteType == 'User' ?
                        (
                            <li className='FooterLogoutButton' onClick={handleLogoutButton}>LOGOUT</li>
                        ) : userAuth?.instituteType == 'Transporter' ?
                            (
                                <li className='FooterLogoutButton' onClick={handleLogoutButton}>LOGOUT</li>
                            ) : (
                                <li className='FooterButton' onClick={handleListVehicle}>LIST YOUR VEHICLE</li>
                            )}
                </ul>
            </div>
        </div>
    </>)
}