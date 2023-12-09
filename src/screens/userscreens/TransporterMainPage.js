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
import CircularProgress from "@mui/material/CircularProgress";
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
} from "../../Utils/getAndSetInLocalStorage";
import { Box, TextField, Typography } from "@mui/material";
import SearchBargpt from "../../components/Searchbar/searchbargpt";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import Footer from "../../components/Footer/Footer";
import UserCard from "../../components/UserCard";
import "../../components/Navbar/NewNavbar.css";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function TransporterMainPage() {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const location = useLocation();
  console.log(location.state);
  let data = location.state;
  const userAuth = useSelector((state) => state.AuthReducer.userData);

  // console.log(dataFromRedux);
  const [listData, setListData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchProd, setSearchProd] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userTransporterName, setUserName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  let getdata = () => {
    setLoader(true);
    getIdData("cars", data.userid)
      .then((res) => {
        // console.log(res)
        const newArray = Object.values(res).map((obj) => ({
            ac: obj.ac,
            airBags: obj.airBags,
            bluetooth: obj.bluetooth,
            bookingType: obj.bookingType,
            cassettePlayer: obj.cassettePlayer,
            color: obj.color,
            companyName: obj.companyName,
            cost: obj.cost,
            description: obj.description,
            engineType: obj.engineType,
            frontCamera: obj.frontCamera,
            gps: obj.gps,
            id: obj.id,
            image1: obj.image1,
            image2: obj.image2,
            image3: obj.image3,
            image4: obj.image4,
            modelName: obj.modelName,
            modelYear: obj.modelYear,
            sunRoof: obj.sunRoof,
            usbPort: obj.usbPort,
            userName: obj.userName,
            userid: obj.userid,
            available: obj.available,
        }));

        console.log("newArray", res);
        setListData(newArray);
        setLoader(false);
      })
      .catch((err) => {
        console.log("no data found");
        setLoader(false);
      });
  };

  useEffect(() => {
    getdata();
  }, []);
  console.log("listData", listData);

  useEffect(() => {
    if (listData.length > 0) {
      console.log("listData[0].userName", listData[0].userName);
      setUserName(listData[0].userName);
    }
  }, [listData]);
  console.log(userTransporterName);

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/");
  };

  const handleSearch = (text) => {
    setSearchProd(text);
  };

  const getProduct = (e) => {
    nav("/cardetails", {
      state: e,
    });
    // console.log(e)
  };

  const handleLoginClick = () => {
    const userType = "User"; // or any other value
    nav("/login", {
      state: userType,
    });
    // console.log('loginButton')
  };

  const handleListVehicle = () => {
    const userType = "Transporter"; // or any other value
    nav("/login", {
      state: userType,
    });
    // console.log('loginButton')
  };

  const handleProfileClick = () => {
    nav("/profile");
    // console.log('ProfileButton')
  };

  const TransporterPage = () => {
    nav("/cars");
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
          <div style={{ marginTop: "50px" }}></div>
          <Container>
            <h1 className="Transportermainpagehead">{userTransporterName}</h1>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h1
                style={{
                  color: "#535969",
                  borderBottom: "3px double #283043",
                  marginBottom: "5%",
                }}
              >
                CARS AVAILABLE
              </h1>
            </div>
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
                {listData.length === 0 ? (
                  <div>
                    <img
                      src={require("../../Assets/Images/no_cars_search.png")}
                      style={{
                        width: "100%",
                        height: "100%",
                        marginVerticle: "50px",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    {listData
                      // .filter((x) => x.carName.toLowerCase().includes(searchProd))
                      .map((x, i) => {
                        return (
                          <UserCard
                            title={x.companyName + ' ' + x.modelName}
                            src={x.image1}
                            price={x.cost}
                            onClick={() => getProduct(x)}
                          />
                        );
                      })}
                  </div>
                )}
              </div>
            )}
          </Container>
          <div style={{marginTop: '100px'}}></div>
          <Footer />
        </>
      )}
    </>
  );
}
