import { useEffect, useState } from "react";
// import { signUpUser } from "../config/firebasemethods";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import "../../components/Navbar/Navbar.css";
import { Spinner } from "react-bootstrap";
import "../../components/Navbar/NewNavbar.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { getDataFromLocalStorage, removeDataFromLocalStorage, setDataToLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage, userDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import { editFbData } from "../../config/firebasemethods";

function EditProfile() {
  const dispatch = useDispatch();
  const userAuth = useSelector((state) => state.AuthReducer.userData);
  const [model, setModel] = useState({});
  const [userName, setUserName] = useState(userAuth.userName || "");
  const [valueEmail, setValueEmail] = useState(userAuth.email || "");
  const [contact, setContact] = useState(userAuth.contact || "");
  const [error, onChangeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef();
  console.log('userAuth', userAuth)

  useEffect(() => {
    setModel({
      ...model,
      userName: userName,
      email: valueEmail,
      password: userAuth.password,
      confirmPassword: userAuth.confirmPassword,
      contact: contact,
      id: userAuth.id,
    });
  }, [userName, valueEmail, contact]);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function hasValidPassword(password) {
    // Password must be at least 8 characters long
    if (password.length <= 5) {
      return false;
    }
    return true;
  }

  let nav = useNavigate();
  console.log("contact", userName);

  //   useEffect(() => {
  //     setModel({
  //       ...model,
  //       userName: userName,
  //       email: valueEmail,
  //       password: valuePass,
  //       confirmPassword: valueConfirmPass,
  //       contact: contact,
  //     });
  //   }, [userName, valueEmail, valuePass, valueConfirmPass, contact]);

  //   let createUser = () => {
  //     console.log(model);
  //     if (
  //       !model.userName ||
  //       !model.confirmPassword ||
  //       !model.contact ||
  //       !model.email ||
  //       !model.password
  //     ) {
  //       alert("Please fill all the required inputs");
  //     } else {
  //       if (!isValidEmail(valueEmail)) {
  //         alert("Enter valid email");
  //       } else {
  //         if (valuePass === valueConfirmPass) {
  //           if (hasValidPassword(valuePass)) {
  //             console.log("valueEmail: ", valueEmail);
  //             console.log("valuePass: ", valuePass);
  //             console.log("valueConfirmPass: ", valueConfirmPass);
  //             console.log("Match");
  //             setLoading(true);

  //             signUpUser(model)
  //               .then((res) => {
  //                 console.log(res); // or any other value
  //                 setLoading(false);
  //                 nav("/login");
  //                 console.log("Signup button at signup screen");
  //               })
  //               .catch((err) => {
  //                 setLoading(false);
  //                 console.log(err);
  //                 alert(err);
  //               });
  //           } else {
  //             console.log("Not Match");
  //             alert("Password must be at least 6 characters long ");
  //           }
  //         } else {
  //           console.log("Not Match");
  //           alert("Password and confirm Password do not match");
  //         }
  //       }
  //     }
  //   };

  const handleLoginButton = () => {
    // or any other value
    nav("/login");
    console.log("loginButton");
  };

  const handleProfileClick = () => {
    nav("/profile");
    // console.log('ProfileButton')
  };

  const TransporterPage = () => {
    nav("/cars");
  };

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/");
  };

  const updateUser = async () => {
    console.log('model', model)
    editFbData(model)
    .then(async res => {
      setDataToLocalStorage("user", JSON.stringify(model));
      
      const storedUserData = await getDataFromLocalStorage("user");
      console.log('storedUserData in profile', storedUserData)
      dispatch(userDataFromAsyncStorage(JSON.parse(storedUserData)));
      console.log(res)
      alert('Data Update Successfully')
      nav('/profile')
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      {loading ? (
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
          <Box
            sx={{ height: "90vh" }}
            className="d-flex justify-content-center align-items-center "
          >
            <Box>
              <Typography
                variant="h4"
                style={{ textAlign: "center", fontWeight: "bold" }}
              >
                Edit Profile
              </Typography>
              <Box className="p-2" style={{ textAlign: "center" }}>
                <TextField
                  onChange={(e) => setUserName(e.target.value)}
                  variant="standard"
                  label="Name"
                  style={{ width: "250px" }}
                  value={userName}
                />
              </Box>
              <Box className="p-2" style={{ textAlign: "center" }}>
                <TextField
                  //   onChange={(e) => onChangeTextEmail(e.target.value)}
                  variant="standard"
                  label="Email"
                  style={{ width: "250px" }}
                  value={valueEmail}
                  disabled
                />
              </Box>
              <Box className="p-2" style={{ textAlign: "center" }}>
                <TextField
                  onChange={(e) => setContact(e.target.value)}
                  variant="standard"
                  label="Contact"
                  style={{ width: "250px" }}
                  value={contact}
                />
              </Box>

              <Box className="p-2">
                {/* <BSButton variant="contained" onClick={createUser} title="Signup" /> */}
                <button
                  onClick={updateUser}
                  style={{
                    width: "200px",
                    textAlign: "center",
                    backgroundColor: "white",
                    color: "#283043",
                    cursor: "pointer",
                    // marginRight: '40px',
                    marginLeft: "25px",
                    display: "block",
                    color: "white",
                    padding: "0.7rem",
                    /* margin: 1rem 0.5rem; */
                    /* border-radius: 0.5rem; */
                    fontSize: 15,
                    cursor: "pointer",
                    marginTop: "13px",
                    border: "none",
                    backgroundColor: "#535969",
                    borderRadius: "0.5rem",
                  }}
                >
                  Edit Profile
                </button>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
export default EditProfile;
