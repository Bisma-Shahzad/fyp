import { Box } from "@mui/material";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getIdData, userLogout } from "../../config/firebasemethods";
import BSScreenHeadercar from "../../components/BSScreenHeadercar";
import BSButton from "../../components/BSButton";
import UserCard from "../../components/UserCard";
import SearchBargpt from "../../components/Searchbar/searchbargpt";
import CircularProgress from '@mui/material/CircularProgress';
import { Navbar } from "../../components/Navbar/Navbar";
import '../../components/Navbar/Navbar.css'
import { Link, NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";

export default function Home() {
    const dispatch = useDispatch();
    let nav = useNavigate()
    const userAuth = useSelector(state => state.AuthReducer.userData);

    const [listData, setListData] = useState([]);
    const [searchProd, setSearchProd] = useState('');
    const [loader, setLoader] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false);

    // console.log('userAuth at homescreen: ', userAuth);

    let getData = async () => {
        // console.log('userAuth?.instituteType: ', userAuth?.instituteType);
        setLoader(true)
        await getIdData("cars", '')
            .then((res) => {
                // console.log(res)
                // console.log('necha wala chal rha hain');
                const result = Object.values(res).flatMap((value) =>
                    Object.values(value)
                        .map(({
                            ac, bluetooth, carName, cost, description, gps, id, image, modelname, usbPort, userName, userid, available
                        }) => ({
                            ac, bluetooth, carName, cost, description, gps, id, image, modelname, usbPort, userName, userid, available
                        }))
                );

                // console.log(result);
                setListData(result);
                setLoader(false)
            })
            .catch((err) => {
                // console.log('no data found')
                setLoader(false)
            })
    }

    useEffect(() => {
        // async () => {
        setLoader(true)
        getData();
        // console.log('else is working');
        setLoader(false)
    }, [userAuth?.instituteType]);

    // console.log(listData)

    const handleSearch = (text) => {
        setSearchProd(text)
    };

    const getProduct = (e) => {
        nav('/cardetails', {
            state: e
        })
        // console.log(e)
    }

    const handleLoginClick = () => {
        const userType = 'User'; // or any other value
        nav('/login', {
            state: userType
        });
        // console.log('loginButton')
    }

    const handleListVehicle = () => {
        const userType = 'Transporter'; // or any other value
        nav('/login', {
            state: userType
        });
        // console.log('loginButton')
    }

    const handleProfileClick = () => {
        nav('/profile')
        // console.log('ProfileButton')
    }

    const handleLogoutButton = async () => {
        removeDataFromLocalStorage('token');
        removeDataFromLocalStorage('user');
        dispatch(removeUserDataFromAsyncStorage());
    }

    return <>
        {loader ? <Box
                sx={{ height: "80vh" }}
                className="d-flex justify-content-center align-items-center "
            >
                <Spinner animation="border" style={{}} />
            </Box> : (
            <>
                <nav>
                    <Link to="/" className="title">
                        WHEEL CONNECT
                    </Link>
                    <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="search-bar">
                        <SearchBargpt label="Search cars" onSearch={handleSearch} />
                    </div>
                    <ul className={menuOpen ? "open" : ""}>
                        <li>
                            <button onClick={() => nav('/about')} style={{ width: '80px' }}>
                                ABOUT
                            </button>
                        </li>
                        <li>
                            {userAuth?.instituteType == 'User' ? (
                                <button onClick={handleProfileClick} style={{ width: '80px' }}>
                                    PROFILE
                                </button>
                            ) : (
                                <button onClick={handleLoginClick} style={{ width: '80px' }}>
                                    LOGIN
                                </button>)}
                        </li>
                        <li>
                            {userAuth?.instituteType == 'User' ?
                                (
                                    <button onClick={handleLogoutButton} className={'logoutButton'} >
                                        LOGOUT
                                    </button>
                                ) : (
                                    <button onClick={handleListVehicle} className={'listvehicle'} >
                                        LIST YOUR VEHICLE
                                    </button>)}
                        </li>
                    </ul>
                </nav>
                <div className="mainbanner">
                    <h1 style={{ padding: 0 }}>Welcome to WHEEL CONNECT</h1>
                    <h3 style={{ padding: 0 }}>Your Ultimate Car Rental Platform!</h3>
                </div>
                <Container>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        
                            <h1 style={{ color: '#535969', borderBottom: '3px double #283043', marginBottom: '5%' }}>
                                CARS AVAILABLE AT WHEEL CONNECT
                            </h1>
                    </div>
                    {loader ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <Spinner animation="border" style={{}} />
                    </div> :
                        <div>
                            {listData.length === 0 ? (
                                <div>
                                    <img src={require("../../Assets/Images/no_cars_search.png")} style={{ width: '100%', height: '100%', marginVerticle: '50px' }} />
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                                    {listData.filter((x) => x.carName.toLowerCase().includes(searchProd)).map((x, i) => {
                                        return (
                                            <UserCard title={x.carName} src={x.image} price={x.cost}
                                                onClick={() => getProduct(x)}
                                            />
                                        )
                                    })}
                                </div>
                            )}
                        </div>}
                </Container >
                <Footer />
            </>
        )}
    </>
}
// .filter((x) => x.title.toLowerCase().includes(searchProd))