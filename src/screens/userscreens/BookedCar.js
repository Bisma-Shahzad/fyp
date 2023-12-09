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
import '../../components/Navbar/NewNavbar.css'
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
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

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
                <div onClick={() => nav('/')} className={`logo ${isActive ? 'hide' : ''}`}>
                    <img src={require("../../Assets/Images/asdasdasdc.png")} style={{ width: '90px', height: '90px', marginTop: -13, cursor: 'pointer' }} />
                </div>
                <div className={`navitemsWithoutsearch ${isActive ? 'active' : ''}`}>
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
                </div>
            </nav>
                <Container>
                <div className='transporterbookedCar'>
                        <div>
                            <div className="TransporterBookedCarImage">

                                <img src={data.image1} className="TransporterBookedCarpic" />
                            </div>
                        </div>
                        <div style={{ width: '500px' }}>
                            <div style={{ marginTop: '40px' }}>
                                <Typography variant="h3" style={{ textTransform: 'uppercase', padding: '5px', width: '40vw', paddingLeft: 0 }} >
                                    {data.companyName} {data.modelName}
                                </Typography>
                            </div>
                            <div>
                                <h4 style={{ color: '#535969', padding: '5px', paddingLeft: 0 }}>Cost (per hour): {data.cost}</h4>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    {/* <p className="bookedcarpara">Model:</p> */}
                                    <p className="bookedcarpara">Availability:</p>
                                    <p className="bookedcarpara">Booking Type:</p>
                                    <p className="bookedcarpara">Description:</p>
                                    <p className="bookedcarpara">Engine Type:</p>
                                </div>
                                <div style={{ marginLeft: '30px' }}>
                                    {/* <p className="bookedcarpara2" >{data.modelname}</p> */}
                                    <p className="bookedcarpara2" >{data.available}</p>
                                    <p className="bookedcarpara2" >{data.bookingType}</p>
                                    <p className="bookedcarpara2" >{data.description}</p>
                                    <p className="bookedcarpara2" >{data.engineType}</p>
                                </div>
                            </div>
                            <div >
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <p className="bookedcarpara">Location:</p>
                                        <p className="bookedcarpara">Pick-up Time:</p>
                                        <p className="bookedcarpara">Drop-off Date:</p>
                                        <p className="bookedcarpara">Transporter:</p>
                                    </div>
                                    <div style={{ marginLeft: '30px' }}>
                                        <p className="bookedcarpara2" >{data.address}</p>
                                        <p className="bookedcarpara2" >{data.selectedDateTime}</p>
                                        <p className="bookedcarpara2" >{data.selectedDate}</p>
                                        <p className="bookedcarpara2" >{data.userName}</p>
                                    </div>
                                </div>
                            </div>
                            <h3 style={{ textDecoration: 'underline' }}>Features</h3>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <p className="bookedcarpara">AC:</p>
                                    <p className="bookedcarpara">Bluetooth:</p>
                                    <p className="bookedcarpara">GPS:</p>
                                    <p className="bookedcarpara">Usb Port:</p>
                                    <p className="bookedcarpara">AirBags:</p>
                                    <p className="bookedcarpara">Cassette Player:</p>
                                    <p className="bookedcarpara">Front Camera:</p>
                                    <p className="bookedcarpara">Sun Roof:</p>
                                </div>
                                <div style={{ marginLeft: '30px' }}>
                                    <p className="bookedcarpara2" >{data.ac ? 'Avaialble' : 'Not Available'}</p>
                                    <p className="bookedcarpara2" >{data.bluetooth ? 'Avaialble' : 'Not Available'}</p>
                                    <p className="bookedcarpara2" >{data.gps ? 'Avaialble' : 'Not Available'}</p>
                                    <p className="bookedcarpara2" >{data.usbPort ? 'Avaialble' : 'Not Available'}</p>
                                    <p className="bookedcarpara2" >{data.airBags ? 'Avaialble' : 'Not Available'}</p>
                                    <p className="bookedcarpara2" >{data.cassettePlayer ? 'Avaialble' : 'Not Available'}</p>
                                    <p className="bookedcarpara2" >{data.frontCamera ? 'Avaialble' : 'Not Available'}</p>
                                    <p className="bookedcarpara2" >{data.sunRoof ? 'Avaialble' : 'Not Available'}</p>
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