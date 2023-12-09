import { Container, Spinner } from "react-bootstrap";
// import BSInput from "../../component/BSInput";
import BSDatePicker from "../../components/BSDatePicker";
import { Box, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import BSInput from "../../components/BSInput";
import BSButton from "../../components/BSButton";
import BSDateTimePicker from "../../components/BSDateTimePicker";
import { useEffect, useRef, useState } from "react";
import {
  deletedata,
  getCustomerData,
  getprofileData,
  postFbData,
  postFbDatacustomer,
} from "../../config/firebasemethods";
import BSScreenHeader from "../../components/BSScreenHeader";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import BSRadio from "../../components/BSRadio";
import "../../components/Navbar/Navbar.css";
import Footer from "../../components/Footer/Footer";
import dayjs from "dayjs";
import "../../components/Navbar/NewNavbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../components/Navbar/main.css";
import "../../components/Navbar/NewNavbar.css";
// import BSDateTimePicker from "../../component/BSDateTimePIcker";

export default function TransporterBookedCar() {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("location.state", location.state);
  let data = location.state;
  const dataFromRedux = useSelector((state) => state.AuthReducer.userData);
  // const dataFromRedux = useSelector((a) => a.Login);
  console.log("dataFromRedux", dataFromRedux);
  const [loader, setLoader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [renterData, setRenterData] = useState({});
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  console.log("renterData", renterData);

  let nav = useNavigate();

  // setBookedData({...bookedData, data: data})
  // console.log(bookedData)
  let getdata = () => {
    // setLoader(true);
    try {
      // const res = await getCustomerData("users", "User", data.customerid);
      getCustomerData("users", data.customerid)
        .then((res) => {
          // setLoader(false);
          console.log("res of getcustomerdata on transporterbookedcar", res);
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
    setLoader(true);

    deletedata("customerbooking", data.customerid, data.customerBookingId)
      .then((res) => {
        console.log("res of cancel customerbooking", res);
        deletedata("customerbooking", data.userid, data.transporterBookingId)
          .then((res) => {
            setLoader(false);
            console.log("res of cancel transporterbooking", res);
            nav("/transporterprofile");
          })
          .catch((err) => {
            setLoader(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setLoader(false);
        console.log(err);
      });
  };

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/");
  };

  const handleBookingClick = () => {
    nav("/transporterprofile");
  };

  const handleAddVehicleClick = () => {
    nav("../addcars");
  };

  const TransporterPage = () => {
    nav("/cars");
  };

  const handleProfileClick = () => {
    nav("/profile");
    // console.log('ProfileButton')
  };

  return (
    <>
      {loader ? (
        <Box
          sx={{ height: "80vh" }}
          className="d-flex justify-content-center align-items-center "
        >
          <Spinner animation="border" style={{}} />
        </Box>
      ) : (
        <>
          <header>
            <div onClick={() => nav("/")} className={`logo `}>
              <img
                src={require("../../Assets/Images/asdasdasdc.png")}
                style={{
                  width: "90px",
                  height: "90px",
                  marginTop: -9,
                  cursor: "pointer",
                }}
              />
            </div>
            <nav ref={navRef}>
              <a onClick={() => nav("/")} className="navbarlink">
                Home
              </a>
              <a onClick={() => nav("/about")} className="navbarlink">
                About
              </a>
              <a onClick={handleProfileClick} className="navbarlink">
                Profile
              </a>
              <a onClick={TransporterPage} className="navbarlink">
                Add Your Vehicle
              </a>
              <a onClick={handleLogoutButton} className="navbarlink">
                Logout
              </a>
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
              <FaBars />
            </button>
          </header>
          <Container>
            <div className="transporterbookedCar">
              <div>
                <div className="TransporterBookedCarImage">
                  <img src={data.image1} className="TransporterBookedCarpic" />
                </div>
              </div>
              <div style={{ width: "500px" }}>
                <div style={{ marginTop: "40px" }}>
                  <div>
                  <Typography variant="h4" style={{ textTransform: 'uppercase', padding: '5px', width: '40vw', paddingLeft: 0 }} >
                                    {data.companyName} {data.modelName}
                                </Typography>
                  </div>
                  <div>
                    <h4
                      style={{
                        color: "#535969",
                        padding: "5px",
                        paddingLeft: 0,
                      }}
                    >
                      Cost (per hour): {data.cost}
                    </h4>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <p style={{ fontWeight: "bold" }}>Renter Name:</p>
                      <p style={{ fontWeight: "bold" }}>Renter id:</p>
                      <p style={{ fontWeight: "bold" }}>Email:</p>
                      <p style={{ fontWeight: "bold" }}>Contact:</p>
                    </div>
                    <div style={{ marginLeft: "30px" }}>
                      <p>{data.customeruserName}</p>
                      <p>{data.customerid}</p>
                      <p>{renterData.email}</p>
                      <p>{renterData.contact}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      {/* <p style={{ fontWeight: "bold" }}>Model:</p> */}
                      <p style={{ fontWeight: "bold" }}>Booking Type:</p>
                      <p style={{ fontWeight: "bold" }}>Location:</p>
                      <p style={{ fontWeight: "bold" }}>Pick-up Time:</p>
                      <p style={{ fontWeight: "bold" }}>Drop-off Date:</p>
                    </div>
                    <div style={{ marginLeft: "30px" }}>
                      {/* <p>{data.modelname}</p> */}
                      <p>{data.bookingType}</p>
                      <p>{data.address}</p>
                      <p>{data.selectedDateTime}</p>
                      <p>{data.selectedDate}</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 30, marginBottom: 50 }}>
                  <button
                    className="bookNowButton"
                    onClick={cancelBooking}
                    style={{ textAlign: "center" }}
                  >
                    CANCEL BOOKING
                  </button>
                </div>
              </div>
            </div>
          </Container>
          <Footer />
        </>
      )}
    </>
  );
}
