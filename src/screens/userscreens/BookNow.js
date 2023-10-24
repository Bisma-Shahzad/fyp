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
import { postFbData, postFbDataBooking, postFbDatacustomer } from "../../config/firebasemethods";
import BSScreenHeader from "../../components/BSScreenHeader";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import BSRadio from "../../components/BSRadio";
import '../../components/Navbar/Navbar.css'
import Footer from "../../components/Footer/Footer";
import dayjs from "dayjs";
// import BSDateTimePicker from "../../component/BSDateTimePIcker";

export default function BookNow() {
    const dispatch = useDispatch();
    const location = useLocation()
    console.log(location.state)
    let data = location.state
    const dataFromRedux = useSelector(state => state.AuthReducer.userData);
    // const dataFromRedux = useSelector((a) => a.Login);
    console.log('dataFromRedux', dataFromRedux);
    const [loader, setLoader] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [selectedDate, setSelectedDate] = useState(dayjs('YYYY-MM-DD'));
    const [selectedDateTime, setSelectedDateTime] = useState(dayjs('YYYY-MM-DDT00:00'));

    const [bookedData, setBookedData] = useState({
        ac: data.ac,
        available: data.available,
        bluetooth: data.bluetooth,
        carName: data.carName,
        cost: data.cost,
        description: data.description,
        gps: data.gps,
        id: data.id,
        image: data.image,
        modelname: data.modelname,
        usbPort: data.usbPort,
        userName: data.userName,
        userid: data.userid,
        customerid: dataFromRedux.id,
        customeruserName: dataFromRedux.userName,
        bookingType: 'With Driver',
    })
    console.log('bookedData', bookedData)
    console.log('address', address)

    const handleDateChange = (date) => {
        const formattedDate = date.format('YYYY-MM-DD');
        setSelectedDate(formattedDate);
        setBookedData(prevData => ({
            ...prevData,
            selectedDate: formattedDate,
        }));
        console.log('Selected Date in Parent Component:', formattedDate);
    };
    console.log('selectedDate', selectedDate)

    const handleDateTimeChange = (newDateTime) => {
        const formattedDateTime = newDateTime.format('YYYY-MM-DDTHH:mm');
        setSelectedDateTime(formattedDateTime);
        setBookedData(prevData => ({
            ...prevData,
            selectedDateTime: formattedDateTime,
        }));
        console.log('Selected Date and Time in Parent Component:', formattedDateTime);
    };
    console.log('selectedDateTime', selectedDateTime)

    const handleRadioButtonChange = (event) => {
        const selectedValue = event.target.value;
        setBookedData(prevData => ({
            ...prevData,
            bookingType: selectedValue,
        }));
        console.log('Selected Radio Button Value:', selectedValue);
    };

    let nav = useNavigate()

    // setBookedData({...bookedData, data: data})
    // console.log(bookedData)
    let confirmcar = () => {
        console.log(bookedData)
        const currentDate = dayjs(); // Get the current date and time
        const selectedDateFormatted = dayjs(selectedDate);
        const selectedDateTimeFormatted = dayjs(selectedDateTime);

        if (!bookedData.address || !bookedData.selectedDateTime || !bookedData.selectedDate ||
            selectedDateFormatted.isBefore(currentDate) || // Check if selectedDate is in the past
            selectedDateTimeFormatted.isBefore(currentDate) || // Check if selectedDateTime is in the past
            selectedDateFormatted.isBefore(selectedDateTimeFormatted)) {
            alert("Please fill all the required fields and ensure the date and time are valid.");
        } else {
            // postFbDatacustomer("customerbooking", bookedData)
            //     .then((res) => {
            //         console.log('res of customerbooking on booknow', res);
            //         postFbData("transporterbooking", bookedData)
            //             .then((res) => {
            //                 console.log(res);
            //                 nav('/')
            //             })
            //             .catch((err) => {
            //                 console.log(err);
            //             });
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
            setLoader(true)
            postFbDataBooking("customerbooking", bookedData)
                .then(({ customerBookingId, transporterBookingId }) => {
                    setLoader(false)
                    // Use both IDs as needed
                    console.log("Customer Booking ID:", customerBookingId);
                    console.log("Transporter Booking ID:", transporterBookingId);
                    nav('/')
                })
                .catch((error) => {
                    setLoader(false)
                    console.error(error);
                });
        }
    }

    const handleProfileClick = () => {
        nav('../profile')
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
                    <div className='transporterbookedCar'>
                        <div>
                            <div style={{ marginTop: '20px' }}>
                                <img src={data.image} style={{ width: '40vw' }} />
                            </div>
                            <div>
                                <Typography variant="h4" style={{ textTransform: 'uppercase', padding: '5px' }} >
                                    {data.carName}
                                </Typography>
                            </div>
                            <div>
                                <h4 style={{ color: '#535969', padding: '5px' }}>Cost (per hour): {data.cost}</h4>
                            </div>
                            <div style={{ padding: '5px' }}>
                                <h5>Availability</h5>
                                <h5>{data.available}</h5>
                            </div>
                            <div style={{ marginTop: '20px', padding: '5px' }}>
                                <h3 style={{ textDecoration: 'underline' }}>Cancelation Policy</h3>
                                <p >You can cancel your booking from Profile</p>
                            </div>
                        </div>
                        <div>
                            <Box className="p-2" style={{ textAlign: 'center', marginBottom: 10 }}>
                                <TextField
                                    onChange={(e) => setBookedData(prevData => ({
                                        ...prevData,
                                        address: e.target.value,
                                    }))}
                                    variant="standard"
                                    label="Location"
                                    // style={{textAlign: 'center'}}
                                    style={{ width: '30vw' }}
                                />
                            </Box>
                            <Box className="p-2" style={{ textAlign: 'center', marginBottom: 10 }}>
                                <BSDateTimePicker value={selectedDateTime} // Pass the selectedDateTime state variable as a prop
                                    onChange={handleDateTimeChange} />
                            </Box>
                            <Box className="p-2" style={{ textAlign: 'center', marginBottom: 10 }}>
                                <BSDatePicker defaultvalue={'2022-04-17'}
                                    selectedDate={selectedDate} // Pass the selectedDate state variable as a prop
                                    onDateChange={handleDateChange} />
                            </Box>
                            <BSRadio title="Booking Type" defaultValue="With Driver" onChange={handleRadioButtonChange} options={
                                [
                                    {
                                        displayName: "With Driver",
                                        key: "one",
                                    },
                                    {
                                        displayName: "Self Drive",
                                        key: "two",
                                    },
                                ]} />
                            <div style={{ marginTop: 30 }}>
                                <button className="bookNowButton" onClick={confirmcar} style={{ textAlign: 'center' }} >CONFIRM BOOKING</button>
                            </div>
                        </div>
                    </div>
                </Container>
                <Footer />
            </>
        )}
    </>
}