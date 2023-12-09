import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../../screens/Signup";
import Login from "../../screens/Login";
import CarDetails from "../../screens/userscreens/CarDetails";
import BookNow from "../../screens/userscreens/BookNow";
import ProtectedRoute from "../ProtectedRoutes";
import AddCars from "../../screens/adminscreens/AddCars";
import Cars from "../../screens/adminscreens/Cars";
import Booking from "../../screens/adminscreens/Booking";
import BookingForm from "../../screens/adminscreens/BookingForm";
import Profile from "../../screens/userscreens/Profile";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Home from "../../screens/userscreens/Home";
import About from "../../screens/userscreens/About";
import { getDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { userDataFromAsyncStorage } from "../redux/reducer/AuthReducer"
import { Spinner } from "react-bootstrap";
import BookedCar from "../../screens/userscreens/BookedCar";
import TransporterProfile from "../../screens/adminscreens/TransporterProfile";
import TransporterBookedCar from "../../screens/adminscreens/TransporterBookedCar";
import TransporterCarDetail from "../../screens/adminscreens/TransporterCarDetail";
import { Box } from "@mui/material";
import TransporterMainPage from "../../screens/userscreens/TransporterMainPage";
import EditProfile from "../../screens/userscreens/EditProfile";
import EditCars from "../../screens/adminscreens/EditCar";


function AppRouter() {
    const dispatch = useDispatch();

    const userAuth = useSelector(state => state.AuthReducer.userData);
    console.log('userAuth', userAuth)
    const [userData, setUserData] = useState({});
    const [loader, setLoader] = useState(true);

    React.useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 2000);
    }, []);

    const getData = async () => {
        try {
            let value = getDataFromLocalStorage('user');
            console.log('getData on approuter', value);
            return value;
        } catch (e) {
            console.error('error in getdata on approuter', e);
            throw e; // Rethrow the error to handle it outside of this function
        }
    };

    useEffect(() => {
        setLoader(true)
        const fetchData = async () => {
            try {
                let value = await getData();
                console.log('this is res in APp', value);
                // Now you can parse the value and handle it as needed
                let v = JSON.parse(value);
                console.log('v', v)

                if (v) {
                    dispatch(userDataFromAsyncStorage(v));
                    //  SplashScreen.hide();
                }
            } catch (err) {
                console.error(err);
                // Handle the error here, e.g., show an error message to the user
            }
        };

        fetchData(); // Call the async function directly in useEffect

    }, []);

    useEffect(() => {
        if (userAuth) {
            setUserData(userAuth);
            setLoader(false)
        } else {
            setUserData(null);
            setLoader(false)
        }
    }, [userAuth]);


    useEffect(() => {
        console.log('userData:', userData);
    }, [userData]);
    return (
        <>
            {loader ? <Box
                sx={{ height: "80vh" }}
                className="d-flex justify-content-center align-items-center "
            >
                <Spinner animation="border" style={{}} />
            </Box> : (
                <BrowserRouter>
                    <Routes>
                        {userData == null ? (
                            <>
                                <Route path="/" element={<Home />} />
                                <Route path="login" element={<Login />} />
                                <Route path="signup" element={<Signup />} />
                                <Route path="about" element={<About />} />
                                <Route path="cardetails" element={<CarDetails />} />
                                <Route path="transportermainpage" element={<TransporterMainPage />} />
                            </>
                        ) : (
                            <>
                                <Route path="/" element={<Home />} />
                                <Route path="about" element={<About />} />
                                <Route path="cars" element={<Cars />} />
                                <Route path="cardetails" element={<CarDetails />} />
                                <Route path="addcars" element={<AddCars />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="editprofile" element={<EditProfile />} />
                                <Route path="editcars" element={<EditCars />} />
                                <Route path="booknow" element={<BookNow />} />
                                <Route path="bookedCar" element={<BookedCar />} />
                                <Route path="transporterprofile" element={<TransporterProfile />} />
                                <Route path="transporterbookedcar" element={<TransporterBookedCar />} />
                                <Route path="transportercardetail" element={<TransporterCarDetail />} />
                                <Route path="transportermainpage" element={<TransporterMainPage />} />
                                {/* <Route path="booknow" element={<ProtectedRoute Component={BookNow} />} /> */}
                                {/* <Route path="addcars" element={<ProtectedRoute Component={AddCars} />} /> */}
                                {/* <Route path="cars" element={<ProtectedRoute Component={Cars} />} /> */}
                                <Route path="booking" element={<ProtectedRoute Component={Booking} />} />
                                <Route path="bookingform" element={<ProtectedRoute Component={BookingForm} />} />
                                {/* <Route path="profile" element={<ProtectedRoute Component={Profile} />} /> */}
                            </>)}
                    </Routes>
                </BrowserRouter>
            )}
        </>
    )
}

export default AppRouter;