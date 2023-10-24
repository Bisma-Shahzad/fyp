import { Link, useLocation, useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"
import { Container, Spinner } from "react-bootstrap"
// import BSButton from "../../component/BSButton"
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import BSButton from "../../components/BSButton";
import BSScreenHeader from "../../components/BSScreenHeader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SearchBargpt from "../../components/Searchbar/searchbargpt";
import Footer from "../../components/Footer/Footer";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import '../../components/Navbar/Navbar.css'
import { deletedata } from "../../config/firebasemethods";

export default function TransporterCarDetail() {
    const dispatch = useDispatch();
    const userAuth = useSelector(state => state.AuthReducer.userData);

    const [loader, setLoader] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation()
    console.log('location state on transportercardetaikl', location.state)
    console.log('userAuth on TransporterCarDetails', userAuth)
    let data = location.state
    let nav = useNavigate()

    let DeleteCar = () => {
        setLoader(true)

        deletedata("cars", userAuth.id, data.id)
            .then((res) => {
                console.log('res of delete listing', res);
                setLoader(false)
                nav('/cars')
            })
            .catch((err) => {
                setLoader(false)
                console.log(err);
            });

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
        nav('/')
    }

    const TransporterMainPage = (e) => {
        nav('/cardetails', {
            state: e
        })
    }

    const handleBookingClick = () => {
        nav('/transporterprofile')
    }

    const handleAddVehicleClick = () => {
        nav('../addcars')
    }

    return (<>
        {loader ? <Box
                sx={{ height: "80vh" }}
                className="d-flex justify-content-center align-items-center "
            >
                <Spinner animation="border" style={{}} />
            </Box> : (
            <>
                <nav>
                    <Link to="/cars" className="title">
                        WHEEL CONNECT
                    </Link>
                    <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                        <span></span>
                        <span></span>
                    </div>
                    <ul className={menuOpen ? "open" : ""}>
                        <li>
                            <button onClick={handleAddVehicleClick} style={{ width: '140px' }}>
                                ADD VEHICLE
                            </button>

                        </li>
                        <li>
                            <button onClick={handleBookingClick} style={{ width: '100px', marginRight: '20px' }}>
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
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginTop: '20px' }}>
                            <div>
                                <Typography variant="h4" style={{ textTransform: 'uppercase', }} >{data.carName}</Typography>
                                {/* <h1>{location.state.carName}</h1> */}
                                <h5>Model: {data.modelname}</h5>
                            </div>
                            <img src={data.image} style={{ width: '50vw' }} />
                        </div>
                        <div style={{ margin: 20, marginTop: 63 }}>

                            <div style={{ marginTop: '20px' }}>
                                <h3 style={{ textDecoration: 'underline' }}>Features</h3>
                                <div style={{ display: 'flex' }}>
                                    <h5>AC</h5>
                                    <h5 >{!data.ac ? <CloseIcon style={{ color: 'red' }} /> : <DoneIcon style={{ color: 'green' }} />}</h5>
                                </div>
                                <div style={{ display: 'flex', }}>
                                    <h5>GPS</h5>
                                    <h5>{!data.gps ? <CloseIcon style={{ color: 'red' }} /> : <DoneIcon style={{ color: 'green' }} />}</h5>
                                </div>
                                <div style={{ display: 'flex', }}>
                                    <h5>Bluetooth</h5>
                                    <h5>{!data.bluetooth ? <CloseIcon style={{ color: 'red' }} /> : <DoneIcon style={{ color: 'green' }} />}</h5>
                                </div>
                                <div style={{ display: 'flex', }}>
                                    <h5>USB Port</h5>
                                    <h5>{!data.usbPort ? <CloseIcon style={{ color: 'red' }} /> : <DoneIcon style={{ color: 'green' }} />}</h5>
                                </div>
                                <p>description: {data.description}</p>
                            </div>
                            <div>
                                <h4 style={{ color: '#344263', }}>Cost (per hour): {data.cost}</h4>
                            </div>
                            <div>
                                <h3>Review and Ratings</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', }}>
                                    <Typography variant="h6"  >NO REVIEWS</Typography>
                                </div>
                            </div>
                            <div>
                                <h3>Availability</h3>
                                <h5>{data.available}</h5>

                            </div>
                            <div style={{ marginTop: 30 }}>
                                <button className="bookNowButton" onClick={DeleteCar} style={{ textAlign: 'center' }} >DELETE CAR</button>
                            </div>
                        </div>
                    </div>
                </Container>
                <Footer />
            </>
        )}
    </>
    )
}