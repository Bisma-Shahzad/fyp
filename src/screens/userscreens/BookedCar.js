import { Container, Spinner } from "react-bootstrap";
// import BSInput from "../../component/BSInput";
import BSDatePicker from "../../components/BSDatePicker";
import { Box, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import BSInput from "../../components/BSInput";
import BSButton from "../../components/BSButton";
import BSDateTimePicker from "../../components/BSDateTimePicker";
import { useState } from "react";
import { deletedata, postFbData, postFbDatacustomer } from "../../config/firebasemethods";
import BSScreenHeader from "../../components/BSScreenHeader";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import BSRadio from "../../components/BSRadio";
import '../../components/Navbar/Navbar.css'
import Footer from "../../components/Footer/Footer";
import dayjs from "dayjs";
// import BSDateTimePicker from "../../component/BSDateTimePIcker";

export default function BookedCar() {
    const dispatch = useDispatch();
    const location = useLocation()
    console.log('location.state', location.state)
    let data = location.state
    const dataFromRedux = useSelector(state => state.AuthReducer.userData);
    // const dataFromRedux = useSelector((a) => a.Login);
    console.log('dataFromRedux', dataFromRedux);
    const [loader, setLoader] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [selectedDate, setSelectedDate] = useState(dayjs('YYYY-MM-DD'));
    const [selectedDateTime, setSelectedDateTime] = useState(dayjs('YYYY-MM-DDT00:00'));

    let nav = useNavigate()

    // setBookedData({...bookedData, data: data})
    // console.log(bookedData)
    let cancelBooking = () => {
        // console.log(bookedData)
        setLoader(true)

        deletedata("customerbooking", data.customerid, data.customerBookingId)
            .then((res) => {
                console.log('res of cancel customerbooking', res);
                deletedata("customerbooking", data.userid, data.transporterBookingId)
                    .then((res) => {
                        setLoader(false)
                        console.log('res of cancel transporterbooking', res);
                        nav('/profile')
                    })
                    .catch((err) => {
                        setLoader(false)
                        console.log(err);
                    });
            })
            .catch((err) => {
                setLoader(false)
                console.log(err);
            });
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
                    <div style={{ display: "flex" }}>
                        <div>
                            <div style={{ marginTop: '20px' }}>
                                <img src={data.image} style={{ width: '40vw' }} />
                            </div>
                            <div>
                                <Typography variant="h4" style={{ textTransform: 'uppercase', padding: '5px', width: '40vw' }} >
                                    {data.carName}
                                </Typography>
                            </div>
                            <div>
                                <h4 style={{ color: '#535969', padding: '5px' }}>Cost (per hour): {data.cost}</h4>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p>Model:</p>
                                    <p>Availability:</p>
                                    <p>Booking Type:</p>
                                    <p>Description:</p>
                                </div>
                                <div style={{ marginLeft: '30px' }}>
                                    <p>{data.modelname}</p>
                                    <p>{data.available}</p>
                                    <p>{data.bookingType}</p>
                                    <p>{data.description}</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: 30 }}>
                            <div style={{ marginTop: '10px' }}>
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <p>Location:</p>
                                        <p>Pick-up Time:</p>
                                        <p>Drop-off Date:</p>
                                        <p>Transporter:</p>
                                    </div>
                                    <div style={{ marginLeft: '30px' }}>
                                        <p>{data.address}</p>
                                        <p>{data.selectedDateTime}</p>
                                        <p>{data.selectedDate}</p>
                                        <p>{data.userName}</p>
                                    </div>
                                </div>
                            </div>
                            <h3 style={{ textDecoration: 'underline' }}>Features</h3>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p>AC:</p>
                                    <p>Bluetooth:</p>
                                    <p>GPS:</p>
                                    <p>Usb Port:</p>
                                </div>
                                <div style={{ marginLeft: '30px' }}>
                                    <p>{data.ac ? 'Avaialble' : 'Not Available'}</p>
                                    <p>{data.bluetooth ? 'Avaialble' : 'Not Available'}</p>
                                    <p>{data.gps ? 'Avaialble' : 'Not Available'}</p>
                                    <p>{data.usbPort ? 'Avaialble' : 'Not Available'}</p>
                                </div>
                            </div>

                            <div style={{ marginTop: 30 }}>
                                <button className="bookNowButton" onClick={cancelBooking} style={{ textAlign: 'center' }} >CANCEL BOOKING</button>
                            </div>
                        </div>
                    </div>
                </Container>
                <Footer />
            </>
        )}
    </>
}