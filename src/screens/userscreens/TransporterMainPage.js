import { useEffect, useState } from "react";
// import { getFbData, getIdData, userLogout } from "../../config/firebasemethods";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import BSScreenHeadercar from "../../component/BSScreenHeadercar";
// import BSButton from "../../component/BSButton";
import { useDispatch, useSelector } from "react-redux";
// import Card from "../../component/Card";
import { Container, Spinner } from "react-bootstrap";
import { getIdData, userLogout } from "../../config/firebasemethods";
import BSScreenHeadercar from "../../components/BSScreenHeadercar";
import BSButton from "../../components/BSButton";
import Card from "../../components/Card";
import CircularProgress from '@mui/material/CircularProgress';
import { getDataFromLocalStorage, removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { Box, TextField, Typography } from "@mui/material";
import SearchBargpt from "../../components/Searchbar/searchbargpt";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import Footer from "../../components/Footer/Footer";
import UserCard from "../../components/UserCard";


export default function TransporterMainPage() {
    const dispatch = useDispatch();
    let nav = useNavigate()
    const location = useLocation()
    console.log(location.state)
    let data = location.state
    const userAuth = useSelector(state => state.AuthReducer.userData);

    // console.log(dataFromRedux);
    const [listData, setListData] = useState([]);
    const [loader, setLoader] = useState(false)
    const [searchProd, setSearchProd] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [userTransporterName, setUserName] = useState('');

    let getdata = () => {
        setLoader(true)
        getIdData("cars", data.userid)
            .then((res) => {
                // console.log(res)
                const newArray = Object.values(res).map(obj => ({
                    ac: obj.ac,
                    bluetooth: obj.bluetooth,
                    carName: obj.carName,
                    cost: obj.cost,
                    description: obj.description,
                    gps: obj.gps,
                    id: obj.id,
                    image: obj.image,
                    modelname: obj.modelname,
                    usbPort: obj.usbPort,
                    userName: obj.userName,
                    userid: obj.userid,
                    available: obj.available
                }))

                console.log('newArray', res);
                setListData(newArray);
                setLoader(false)
            })
            .catch((err) => {
                console.log('no data found')
                setLoader(false)
            });
    };

    useEffect(() => {
        getdata();
    }, []);
    console.log('listData', listData)

    useEffect(() => {
        if (listData.length > 0) {
        console.log('listData[0].userName', listData[0].userName)
        setUserName(listData[0].userName)
    }
    }, [listData]);
    console.log(userTransporterName)

    const handleLogoutButton = async () => {
        removeDataFromLocalStorage('token');
        removeDataFromLocalStorage('user');
        dispatch(removeUserDataFromAsyncStorage());
        nav('/')
    }

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
                <div style={{ marginTop: '50px' }}></div>
                <Container>
                    <h1 style={{ color: '#535969', borderBottom: '3px double #283043', marginBottom: '5%', textAlign: 'center', textTransform: 'uppercase' }}>
                        {userTransporterName}
                    </h1>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>

                        <h1 style={{ color: '#535969', borderBottom: '3px double #283043', marginBottom: '5%' }}>
                            CARS AVAILABLE
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