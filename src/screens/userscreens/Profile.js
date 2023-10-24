import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getIdData, getprofileData, userLogout } from "../../config/firebasemethods";
import { Link, useNavigate } from "react-router-dom";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import Footer from "../../components/Footer/Footer";
import '../../components/Navbar/Navbar.css'
import UserCard from "../../components/UserCard";
import { Box } from "@mui/material";

export default function Profile() {
    const dispatch = useDispatch();
    let nav = useNavigate()
    const userAuth = useSelector(state => state.AuthReducer.userData);
    const [listData, setListData] = useState([]);
    const [loader, setLoader] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    console.log('userAuth at profile', userAuth.id)

    // let getdata = async () => {
    //     // setLoader(true)
    //     await getprofileData("customerbooking", userAuth.id, '')
    //         .then((res) => {
    //             // setLoader(false)
    //             console.log('res of customerBooking', res)

    //             setListData(res);
    //         })
    //         .catch((err) => {
    //             console.log('no data found')
    //             // setLoader(false)
    //         });
    // };

    let getdata = async () => {
        setLoader(true);
        try {
            const res = await getprofileData("customerbooking", userAuth.id, '');
            setListData(res);
            setLoader(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoader(false);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    console.log('listData on Profile', listData)

    const handleProfileClick = () => {
        nav('/profile')
        // console.log('ProfileButton')
    }

    const handleLogoutButton = async () => {
        removeDataFromLocalStorage('token');
        removeDataFromLocalStorage('user');
        dispatch(removeUserDataFromAsyncStorage());
        nav('/')
    }

    const handleBookingListing = (e) => {
        nav('/bookedCar', {
            state: e
        })
        // console.log(e)
    }

    return <>
        {loader ? <Box
                sx={{ height: "80vh" }}
                className="d-flex justify-content-center align-items-center "
            >
                <Spinner animation="border" style={{}} />
            </Box> : (<>
            <nav>
                <Link to="/" className="title">
                WHEEL CONNECT
                </Link>
                <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? "open" : ""}>
                    <li>
                        <button onClick={() => nav('/about')} style={{ width: '80px' }}>
                            ABOUT
                        </button>
                    </li>
                    <li>
                        <button onClick={handleProfileClick} style={{ width: '80px' }}>
                            PROFILE
                        </button>
                    </li>
                    <li>
                        <button onClick={handleLogoutButton} className={'logoutButton'} >
                            LOGOUT
                        </button>
                    </li>
                </ul>
            </nav>
            <Container>
                <h1 className="AboutMainHead">Profile</h1>
                <div style={{ display: 'flex' }}>
                    <div>
                        <p>User Id:</p>
                        <p>Name:</p>
                        <p>Email address:</p>
                        <p>Contact Number:</p>
                    </div>
                    <div style={{ marginLeft: '30px' }}>
                        <p>{userAuth.id}</p>
                        <p>{userAuth.userName}</p>
                        <p>{userAuth.email}</p>
                        <p>{userAuth.contact}</p>
                    </div>
                </div>
                <h3 className="AboutHeads">Bookings</h3>
                {loader ? <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Spinner animation="border" style={{}} />
                </div> :
                    <div>
                        {listData.length === 0 ? (
                            <div style={{ flex: 1, textAlign: 'center' }}>
                                <h4 className="AboutHeads">No Bookings...</h4>
                            </div>
                        ) : (
                            <div style={{}}>
                                <ol>
                                    {listData.map((x, i) => {
                                        return (
                                            <li
                                                style={{ marginTop: '30px', cursor: 'pointer', border: '1px outset rgba(40, 48, 67, 0.2)' }}
                                                onClick={() => handleBookingListing(x)}
                                            >
                                                <div>
                                                    <img src={x.image} width='130px' height='80px' />
                                                    <span style={{ marginLeft: '10px' }}>{x.carName}</span>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        )}
                    </div>}

            </Container>
            <Footer />
        </>)}
    </>
}