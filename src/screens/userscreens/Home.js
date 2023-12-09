import { Box } from "@mui/material";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getIdData, userLogout } from "../../config/firebasemethods";
import BSScreenHeadercar from "../../components/BSScreenHeadercar";
import BSButton from "../../components/BSButton";
import UserCard from "../../components/UserCard";
import SearchBargpt from "../../components/Searchbar/searchbargpt";
import CircularProgress from "@mui/material/CircularProgress";
import { Navbar } from "../../components/Navbar/Navbar";
import "../../components/Navbar/Navbar.css";
// import "../../components/Navbar/NewNavbar.css";
import "../../components/Navbar/Navbar.css";
import "../../components/Navbar/main.css";
import { Link, NavLink } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";
import BSFilterDropdown from "../../components/BSFilterDropdown";
import SelectAutoWidth from "../../components/BSSelect";
import BSMultipleSelect from "../../components/BSMultipleSelect";

export default function Home() {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const userAuth = useSelector((state) => state.AuthReducer.userData);
  console.log("userAuth on home screen", userAuth);

  const [listData, setListData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // Store the original data
  const [searchProd, setSearchProd] = useState("");
  const [bookingTypeSelect, setBookingTypeSelect] = useState("");
  const [loader, setLoader] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const bookingType = ["With Driver", "Self Drive", "Both"];
  const [selectedMultiValue, setSelectedMultiValue] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSelectChange = (value) => {
    setSelectedFilter(value); // Update selectedFilter when value changes
  };

  console.log("listData", listData);

  const handleMultiChange = (values) => {
    setSelectedMultiValue(values);
    console.log("selectedMultiValue", values);
  };

  console.log("selectedmultiValue", selectedMultiValue);

  const fetchSuggestions = async () => {
    // Extract unique company names and model names from listData
    const uniqueCompanyNames = [
      ...new Set(listData.map((item) => item.companyName.toLowerCase())),
    ];
    const uniqueModelNames = [
      ...new Set(listData.map((item) => item.modelName.toLowerCase())),
    ];

    // Combine and set suggestions
    const fetchedSuggestions = [...uniqueCompanyNames, ...uniqueModelNames];
    setSuggestions(fetchedSuggestions);
  };

  useEffect(() => {
    fetchSuggestions();
  }, [listData]);

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  let getData = async () => {
    // console.log('userAuth?.instituteType: ', userAuth?.instituteType);
    setLoader(true);
    await getIdData("cars", "")
      .then((res) => {
        console.log("res on get id data on home page", res);
        console.log("object.keys(res)", Object.keys(res));
        // console.log('necha wala chal rha hain');
        const result = Object.values(res).flatMap((value) =>
          Object.values(value).map(
            ({
              ac,
              airBags,
              bluetooth,
              bookingType,
              cassettePlayer,
              color,
              companyName,
              cost,
              description,
              engineType,
              frontCamera,
              gps,
              id,
              image1,
              image2,
              image3,
              image4,
              modelName,
              modelYear,
              sunRoof,
              usbPort,
              userName,
              userid,
              available,
            }) => ({
              ac,
              airBags,
              bluetooth,
              bookingType,
              cassettePlayer,
              color,
              companyName,
              cost,
              description,
              engineType,
              frontCamera,
              gps,
              id,
              image1,
              image2,
              image3,
              image4,
              modelName,
              modelYear,
              sunRoof,
              usbPort,
              userName,
              userid,
              available,
            })
          )
        );

        // console.log(result);
        setOriginalData(result); // Store the original data
        setListData(result);
        const filteredData = result.filter(
          (item) => item.userid !== userAuth.id
        );
        setListData(filteredData);
        setOriginalData(filteredData); // Store the original data
        setLoader(false);
      })
      .catch((err) => {
        // console.log('no data found')
        setLoader(false);
      });
  };

  useEffect(() => {
    // async () => {
    setLoader(true);
    getData();
    // console.log('else is working');
    setLoader(false);
  }, [userAuth]);

  useEffect(() => {
    // async () => {
    setLoader(true);
    // fetchDriverType();
    // Filter the data based on the selectedFilter
    const updatedFilteredData = originalData.filter(
      (item) => item.bookingType === selectedFilter
    );
    setListData(updatedFilteredData);
    // console.log('else is working');
    setLoader(false);
  }, [selectedFilter]);

  // console.log(listData)

  const handleSearch = (text) => {
    setSearchProd(text);
  };

  const FilterBookingType = (text) => {
    setBookingTypeSelect(text);
  };

  const getProduct = (e) => {
    nav("/cardetails", {
      state: e,
    });
    // console.log(e)
  };

  const handleLoginClick = () => {
    nav("/login");
    // console.log('loginButton')
  };

  const handleProfileClick = () => {
    nav("/profile");
    // console.log('ProfileButton')
  };

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
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
              {userAuth ? (
                <a onClick={handleProfileClick} className="navbarlink">
                  Profile
                </a>
              ) : (
                <a onClick={handleLoginClick} className="navbarlink">
                  Login
                </a>
              )}
              {userAuth ? (
                <a onClick={TransporterPage} className="navbarlink">
                  Add Your Vehicle
                </a>
              ) : null}
              {userAuth ? (
                <a onClick={handleLogoutButton} className="navbarlink">
                  Logout
                </a>
              ) : null}
              <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />
              </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
              <FaBars />
            </button>
          </header>

          <div className="mainbanner"></div>
          <Container>
            <div className="carsavaialble"></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <SearchBargpt
                label="Search cars"
                onSearch={handleSearch}
                suggestions={suggestions}
              />
              {/* <BSFilterDropdown
                label="Booking Type"
                suggestions={bookingType}
                onSearch={FilterBookingType}
              /> */}
              <SelectAutoWidth
                label="Search Booking Type"
                minWidth="300px"
                searchList={[
                  {
                    displayName: "With Driver",
                    key: "withdriver",
                  },
                  {
                    displayName: "Self Drive",
                    key: "selfdrive",
                  },
                  {
                    displayName: "Both",
                    key: "both",
                  },
                ]}
                selectedval={handleSelectChange}
              />
              {/* <BSMultipleSelect
                label="Search Booking Type"
                minWidth="200px"
                searchList={[
                  {
                    displayName: "User Name",
                    key: "name",
                  },
                  {
                    displayName: "User Email",
                    key: "email",
                  },
                ]}
                selectedVals={handleMultiChange} // Pass the callback function
              /> */}
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
                {/* {listData.length === 0 ? (
                  <div>
                    <img
                      src={require("../../Assets/Images/no_cars_search.png")}
                      style={{
                        width: "100%",
                        height: "100%",
                        marginVerticle: "50px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                ) : ( */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  {listData
                    .filter(
                      (x) =>
                        searchProd
                          ? x.companyName.toLowerCase().includes(searchProd) ||
                            x.modelName.toLowerCase().includes(searchProd)
                          : true // Show all cars when searchProd is empty
                    )
                    .map((x, i) => {
                      return (
                        <UserCard
                          title={x.companyName + " " + x.modelName}
                          src={x.image1}
                          price={x.cost}
                          onClick={() => getProduct(x)}
                        />
                      );
                    })}
                </div>
                {/* )} */}
              </div>
            )}
          </Container>
          <Footer />
        </>
      )}
    </>
  );
}
// .filter((x) => x.title.toLowerCase().includes(searchProd))
