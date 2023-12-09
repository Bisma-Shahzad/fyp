import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getIdData,
  getprofileData,
  userLogout,
} from "../../config/firebasemethods";
import { Link, useNavigate } from "react-router-dom";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import Footer from "../../components/Footer/Footer";
import "../../components/Navbar/Navbar.css";
import UserCard from "../../components/UserCard";
import { Box } from "@mui/material";
import "../../components/Navbar/NewNavbar.css";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../components/Navbar/main.css";

export default function Profile() {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const userAuth = useSelector((state) => state.AuthReducer.userData);
  const [listData, setListData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef();

  console.log('listData aaaaa', listData)
  console.log('userAuth', userAuth)

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };
  console.log("userAuth at profile", userAuth.id);

  let getdata = async () => {
    setLoader(true);
    try {
      const res = await getprofileData("customerbooking", userAuth.id, "");
      setListData(res);
      console.log('res', res)
      setLoader(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  console.log("listData on Profile", listData);

  const handleProfileClick = () => {
    nav("/profile");
    // console.log('ProfileButton')
  };

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/");
  };

  const handleBookingListing = (e) => {
    nav("/bookedCar", {
      state: e,
    });
    // console.log(e)
  };

  const TransporterPage = () => {
    nav("/cars");
  };
  const editProfile = () => {
    nav("/editprofile");
  };

  const filteredListData = listData.filter(item => item.customerid === userAuth.id);

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
            <div style={{ display: "flex", justifyContent: "space-between",  alignItems: 'center' }}>
              <div>
              <h1 className="AboutMainHead">Profile</h1>
              </div>
              <div>
              <button
                className="bookNowButton"
                onClick={editProfile}
                style={{ }}
              >
                EDIT PROFILE
              </button>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <p className="bookedcarpara3">User Id:</p>
                <p className="bookedcarpara3">Name:</p>
                <p className="bookedcarpara3">Email address:</p>
                <p className="bookedcarpara3">Contact Number:</p>
              </div>
              <div style={{ marginLeft: "30px" }}>
                <p className="bookedcarpara4">{userAuth.id}</p>
                <p className="bookedcarpara4">{userAuth.userName}</p>
                <p className="bookedcarpara4">{userAuth.email}</p>
                <p className="bookedcarpara4">{userAuth.contact}</p>
              </div>
            </div>
            <h3 className="AboutHeads">Bookings</h3>
            {loader ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Spinner animation="border" style={{}} />
              </div>
            ) : (
              <div>
                {filteredListData.length === 0 ? (
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <h4 className="AboutHeads">No Bookings...</h4>
                  </div>
                ) : (
                  <div style={{}}>
                    <ol>
                      {filteredListData.map((x, i) => {
                        return (
                          <li
                            style={{
                              marginTop: "30px",
                              cursor: "pointer",
                              border: "1px outset rgba(40, 48, 67, 0.2)",
                            }}
                            onClick={() => handleBookingListing(x)}
                          >
                            <div>
                              <img src={x.image1} width="130px" height="80px" />
                              <span style={{ marginLeft: "10px" }}>
                                {x.companyName} {x.modelName}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                )}
              </div>
            )}
          </Container>
          <div style={{ marginTop: "300px" }}>
            <Footer />
          </div>
        </>
      )}
    </>
  );
}
