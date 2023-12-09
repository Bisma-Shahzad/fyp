import { Link, useNavigate } from "react-router-dom";
import "../../components/Navbar/Navbar.css";
import { useEffect, useState } from "react";
import { getIdData } from "../../config/firebasemethods";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import "../../components/Navbar/NewNavbar.css";
import "../../components/Navbar/main.css";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function About() {
  const dispatch = useDispatch();
  let nav = useNavigate();
  const userAuth = useSelector((state) => state.AuthReducer.userData);

  const [menuOpen, setMenuOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  let getData = async () => {
    // console.log('userAuth?.instituteType: ', userAuth?.instituteType);
    setLoader(true);
    await getIdData("cars", "")
      .then((res) => {
        // console.log(res)
        // console.log('necha wala chal rha hain');
        const result = Object.values(res).flatMap((value) =>
          Object.values(value).map(
            ({
              ac,
              bluetooth,
              carName,
              cost,
              description,
              gps,
              id,
              image,
              modelname,
              usbPort,
              userName,
              userid,
              available,
            }) => ({
              ac,
              bluetooth,
              carName,
              cost,
              description,
              gps,
              id,
              image,
              modelname,
              usbPort,
              userName,
              userid,
              available,
            })
          )
        );

        // console.log(result);
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

  const handleListVehicle = () => {
    const userType = "Transporter"; // or any other value
    nav("/login", {
      state: userType,
    });
    // console.log('loginButton')
  };

  const handleLoginClick = () => {
    const userType = "User"; // or any other value
    nav("/login", {
      state: userType,
    });
    // console.log('loginButton')
  };

  const handleProfileClick = () => {
    nav("../profile");
    // console.log('ProfileButton')
  };

  const handleLogoutButton = async () => {
    removeDataFromLocalStorage("token");
    removeDataFromLocalStorage("user");
    dispatch(removeUserDataFromAsyncStorage());
    nav("/");
  };

  const TransporterPage = () => {
    nav("/cars");
  };

  return (
    <>
      {/* <nav>
            <div onClick={() => nav('/')} className={`logo ${isActive ? 'hide' : ''}`}>
                <img src={require("../../Assets/Images/asdasdasdc.png")} style={{ width: '90px', height: '90px', marginTop: -13, cursor: 'pointer' }} />
            </div>
            <div className={`navitemsWithoutsearch ${isActive ? 'active' : ''}`}>
                <li>
                    <button onClick={() => nav('/about')} >
                        ABOUT
                    </button>
                </li>
                <li>
                    {userAuth?.instituteType == 'User' ? (
                        <button onClick={handleProfileClick} >
                            PROFILE
                        </button>
                    ) : (
                        <button onClick={handleLoginClick}>
                            LOGIN
                        </button>)}
                </li>
                <li>
                    {userAuth?.instituteType == 'User' ?
                        (
                            <button onClick={handleLogoutButton}  className={'logoutButton'}>
                                LOGOUT
                            </button>
                        ) : (
                            <button onClick={handleListVehicle} className={'listvehicle'} >
                                LIST YOUR VEHICLE
                            </button>)}
                </li>
                </div>
        </nav> */}
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
      <Container>
        <h1 className="AboutMainHead">ABOUT US</h1>
        <h3 className="AboutHeads">
          Welcome to WHEEL CONNECT – Your Ultimate Car Rental Platform!
        </h3>
        <p className="AboutPara">
          At WHEEL CONNECT, we have redefined the way you rent a car. Whether
          you're a transporter looking to share your vehicle or a savvy traveler
          seeking the perfect ride for your journey, we've got you covered. Our
          platform bridges the gap between transporters and users, making the
          car rental process smooth, secure, and convenient.
        </p>
        <h3 className="AboutHeads">For Transporters:</h3>
        <p className="AboutPara">
          Are you a car owner looking to earn extra income? With WHEEL CONNECT,
          you can easily showcase your vehicle to potential renters. Our
          intuitive interface allows you to upload detailed listings, complete
          with high-quality photos and all the essential information renters
          need. You're in control – decide who rents your car by approving or
          declining rental requests. Plus, you can share your contact
          information, enabling direct communication with renters to discuss
          details, coordinate pick-up and drop-off, and address any concerns
          effortlessly.
        </p>
        <h3 className="AboutHeads">For Renters:</h3>
        <p className="AboutPara">
          Planning a road trip, business travel, or simply need a temporary
          vehicle? WHEEL CONNECT is your go-to destination. Browse through a
          diverse range of cars uploaded by trusted transporters. Our
          user-friendly search option help you find the perfect vehicle that
          fits your requirements and budget. Once you've found the ideal car,
          send a rental request to the transporter. They have the flexibility to
          accept or decline your request based on their availability. Need to
          clarify some details? Reach out directly to the transporter using the
          provided contact information, ensuring all your questions are answered
          before you hit the road.
        </p>
        <h3 className="AboutHeads">Why Choose WHEEL CONNECT?</h3>
        <dl>
          <dt className="AboutlistHead">Security:</dt>
          <dd className="AboutlistHead">
            We prioritize your safety and peace of mind. Our platform giving you
            confidence in your rental choices.
          </dd>
          <dt className="AboutlistHead">Convenience:</dt>
          <dd className="AboutlistHead">
            Finding the right car or renting out yours has never been easier.
            Our user-friendly interface and robust features simplify the entire
            process.
          </dd>
          <dt className="AboutlistHead">Flexibility:</dt>
          <dd className="AboutlistHead">
            Transporters have full control over their listings, and renters can
            choose from a variety of vehicles and rental options.
          </dd>
        </dl>
        <p className="AboutPara">
          At WHEEL CONNECT, we believe in connecting people through shared
          experiences and adventures. Whether you're embarking on a solo road
          trip, a family vacation, or a business excursion, our platform makes
          it possible. Start your car rental journey today – because the perfect
          ride is just a click away!
        </p>
      </Container>
      <Footer />
    </>
  );
}
