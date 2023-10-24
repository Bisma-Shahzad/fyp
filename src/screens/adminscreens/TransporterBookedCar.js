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
import { useEffect, useState } from "react";
import { deletedata, getCustomerData, getprofileData, postFbData, postFbDatacustomer } from "../../config/firebasemethods";
import BSScreenHeader from "../../components/BSScreenHeader";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import BSRadio from "../../components/BSRadio";
import '../../components/Navbar/Navbar.css'
import Footer from "../../components/Footer/Footer";
import dayjs from "dayjs";
// import BSDateTimePicker from "../../component/BSDateTimePIcker";

export default function TransporterBookedCar() {
    const dispatch = useDispatch();
    const location = useLocation()
    console.log('location.state', location.state)
    let data = location.state
    const dataFromRedux = useSelector(state => state.AuthReducer.userData);
    // const dataFromRedux = useSelector((a) => a.Login);
    console.log('dataFromRedux', dataFromRedux);
    const [loader, setLoader] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    const [renterData, setRenterData] = useState({});
    console.log('renterData', renterData)

    let nav = useNavigate()

    // setBookedData({...bookedData, data: data})
    // console.log(bookedData)
    let getdata = () => {
        // setLoader(true);
        try {
            // const res = await getCustomerData("users", "User", data.customerid);
            getCustomerData("users", "User", data.customerid)
                .then((res) => {
                    // setLoader(false);
                    console.log('res of getcustomerdata on transporterbookedcar', res);
                    setRenterData(res);
                    // nav('/cars')
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.error("Error fetching data:", error);
            // setLoader(false);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

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
                        nav('/transporterprofile')
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

    const handleLogoutButton = async () => {
        removeDataFromLocalStorage('token');
        removeDataFromLocalStorage('user');
        dispatch(removeUserDataFromAsyncStorage());
        nav('/')
    }

    const handleBookingClick = () => {
        nav('/transporterprofile')
    }

    const handleAddVehicleClick = () => {
        nav('../addcars')
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
                    <div className='transporterbookedCar' >
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
                                    <p>Renter Name:</p>
                                    <p>Renter id:</p>
                                    <p>Email:</p>
                                    <p>Contact:</p>

                                </div>
                                <div style={{ marginLeft: '30px' }}>
                                    <p>{data.customeruserName}</p>
                                    <p>{data.customerid}</p>
                                    <p>{renterData.email}</p>
                                    <p>{renterData.contact}</p>

                                </div>
                            </div>
                        </div>
                        <div >
                            <div style={{ marginTop: '10px' }}>
                                <div style={{ display: 'flex' }}>
                                    <div>
                                        <p>Model:</p>
                                        <p>Booking Type:</p>
                                        <p>Location:</p>
                                        <p>Pick-up Time:</p>
                                        <p>Drop-off Date:</p>
                                    </div>
                                    <div style={{ marginLeft: '30px' }}>
                                        <p>{data.modelname}</p>
                                        <p>{data.bookingType}</p>
                                        <p>{data.address}</p>
                                        <p>{data.selectedDateTime}</p>
                                        <p>{data.selectedDate}</p>
                                    </div>
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