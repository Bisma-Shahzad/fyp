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
import { useEffect, useState } from "react";
import {
  postFbData,
  postFbDataBooking,
  postFbDatacustomer,
} from "../../config/firebasemethods";
import BSScreenHeader from "../../components/BSScreenHeader";
import { removeDataFromLocalStorage } from "../../Utils/getAndSetInLocalStorage";
import { removeUserDataFromAsyncStorage } from "../../config/redux/reducer/AuthReducer";
import BSRadio from "../../components/BSRadio";
import "../../components/Navbar/Navbar.css";
import Footer from "../../components/Footer/Footer";
import "../../components/Navbar/NewNavbar.css";
// import BSDateTimePicker from "../../component/BSDateTimePIcker";
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { storage } from "../../config/firebaseconfig";
import { v4 } from "uuid";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import dayjs from "dayjs";

export default function BookNow() {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log('location.state', location.state);
  let data = location.state;
  const dataFromRedux = useSelector((state) => state.AuthReducer.userData);
  // const dataFromRedux = useSelector((a) => a.Login);
  console.log("dataFromRedux", dataFromRedux);
  const [imageUrls, setImageUrls] = useState("");
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs("YYYY-MM-DD"));
  const [selectedDateTime, setSelectedDateTime] = useState(
    dayjs("YYYY-MM-DDT00:00")
  );
  const [isActive, setIsActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(data.image1);
  const [imageone, setImageone] = useState(null);
  const [imagetwo, setImagetwo] = useState(null);
  console.log('selectedDateTime', selectedDateTime)
  console.log('selectedDate', selectedDate)

  const handleSmallImageClick = (image) => {
    setSelectedImage(image);
  };
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const [bookedData, setBookedData] = useState({
    ac: data.ac,
    airBags: data.airBags,
    available: data.available,
    bluetooth: data.bluetooth,
    cost: data.cost,
    color: data.color,
    companyName: data.companyName,
    cassettePlayer: data.cassettePlayer,
    description: data.description,
    gps: data.gps,
    modelName: data.modelName,
    usbPort: data.usbPort,
    userName: data.userName,
    frontCamera: data.frontCamera,
    image1: data.image1,
    image2: data.image2,
    image3: data.image3,
    image4: data.image4,
    sunRoof: data.sunRoof,
    usbPort: data.usbPort,
    engineType: data.engineType,
    userid: data.userid,
    customerid: dataFromRedux.id,
    customeruserName: dataFromRedux.userName,
    bookingType: "With Driver",
  });
  console.log("bookedData", bookedData);
  console.log("address", address);

  const handleDateChange = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setBookedData((prevData) => ({
      ...prevData,
      selectedDate: formattedDate,
    }));
    console.log("Selected Date in Parent Component:", formattedDate);
  };
  console.log("selectedDate", selectedDate);

  const handleDateTimeChange = (newDateTime) => {
    const formattedDateTime = newDateTime.format("YYYY-MM-DDTHH:mm");
    setSelectedDateTime(formattedDateTime);
    setBookedData((prevData) => ({
      ...prevData,
      selectedDateTime: formattedDateTime,
    }));
    console.log(
      "Selected Date and Time in Parent Component:",
      formattedDateTime
    );
  };
  console.log("selectedDateTime", selectedDateTime);

  const handleRadioButtonChange = (event) => {
    const selectedValue = event.target.value;
    setBookedData((prevData) => ({
      ...prevData,
      bookingType: selectedValue,
    }));
    console.log("Selected Radio Button Value:", selectedValue);
  };

  // useEffect(() => {
  //   console.log("imageUrls", imageUrls)
  //   setBookedData({
  //     ...bookedData,
  //     image1: imageUrls[0] ,
  //     image2: imageUrls[1],
  //   });
  // }, [imageUrls.length == 4]);

  // function onImageChange(e) {
  //   const selectedImages = [...e.target.files];
  // setImages(selectedImages);
  // const uploadTasks = [];


  // // Loop through the selected images and update individual image states
  // selectedImages.forEach((image, index) => {
  //   const imageUrl = URL.createObjectURL(image);

  //   // Update individual image states based on index
  //   if (index === 0) {
  //     setImageone(imageUrl);
  //   } else if (index === 1) {
  //     setImagetwo(imageUrl);
  //   }

  //   const imageRef = ref(storage, `images/${image.name + v4()}`);
  //   const uploadTask = uploadBytes(imageRef, image);
  //   uploadTasks.push(uploadTask);

  //   uploadTask.then((snapshot) => {
  //     // Retrieve the download URL after the upload is complete
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       setImageUrls((prev) => [...prev, url]);
  //       setUploadedImageUrls((prevUrls) => [...prevUrls, url]);

  //       // If all images are uploaded and their URLs are retrieved, update the model object
  //       if (uploadTasks.length === selectedImages.length) {
  //         // Wait for all asynchronous operations to complete before updating the model object
  //         Promise.all(uploadTasks).then(() => {
  //           // Update the model object with the image URLs
  //           setBookedData({
  //             ...bookedData,
  //             image1: imageUrls[0] || null,
  //             image2: imageUrls[1] || null,
  //           });
  //         });
  //       }
  //     });
  // })
  // })}

  let nav = useNavigate();

  // setBookedData({...bookedData, data: data})
  // console.log(bookedData)
  let confirmcar = () => {
    const currentDate = dayjs(); // Get the current date and time
    const selectedDateFormatted = dayjs(selectedDate);
    const selectedDateTimeFormatted = dayjs(selectedDateTime);

    if (!bookedData.address || !bookedData.selectedDateTime || !bookedData.selectedDate ||
      selectedDateFormatted.isBefore(currentDate) || // Check if selectedDate is in the past
      selectedDateTimeFormatted.isBefore(currentDate) || // Check if selectedDateTime is in the past
      selectedDateFormatted.isBefore(selectedDateTimeFormatted)) {
      alert("Please fill all the required fields and ensure the date and time are valid.");
  } 
    // else if (images.length != 2) {
    //   alert("You have to upload 2 images");
    // } 
    else {
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
      setLoader(true);
      console.log('bookedData', bookedData)
      postFbDataBooking("customerbooking", bookedData)
        .then(({ customerBookingId, transporterBookingId }) => {
          setLoader(false);
          // Use both IDs as needed
          console.log("Customer Booking ID:", customerBookingId);
          console.log("Transporter Booking ID:", transporterBookingId);
          nav("/");
        })
        .catch((error) => {
          setLoader(false);
          console.error(error);
        });
    }
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
                  <img
                    src={selectedImage}
                    className="TransporterBookedCarpic"
                  />
                </div>
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                  {[data.image1, data.image2, data.image3, data.image4].map(
                    (image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`image-${index}`}
                        width={"100px"}
                        style={{
                          margin: "10px",
                          border: "1px solid black",
                          height: "70px",
                          cursor: "pointer",
                        }}
                        // Handle small image click and update selectedImage state
                        onClick={() => handleSmallImageClick(image)}
                      />
                    )
                  )}
                </div>
              </div>
              <div style={{ width: "500px" }}>
                <div>
                  <Typography
                    variant="h3"
                    style={{
                      textTransform: "uppercase",
                      padding: "5px",
                      paddingLeft: 0,
                      marginTop: "30px",
                    }}
                  >
                    {data.companyName + " " + data.modelName}
                  </Typography>
                </div>
                <div>
                  <h4 style={{ color: "#535969", padding: "5px" }}>
                    Cost (per hour): {data.cost}
                  </h4>
                </div>
                <div style={{ padding: "5px" }}>
                  <h5>Availability</h5>
                  <h5>{data.available.join(", ")}</h5>
                </div>
                <div style={{ marginTop: "20px", padding: "5px" }}>
                  <h3 style={{ textDecoration: "underline" }}>
                    Cancelation Policy
                  </h3>
                  <p>You can cancel your booking from Profile</p>
                </div>
                <Box className="p-2 booknowinput">
                  <TextField
                    onChange={(e) =>
                      setBookedData((prevData) => ({
                        ...prevData,
                        address: e.target.value,
                      }))
                    }
                    variant="standard"
                    label="Location"
                    // style={{textAlign: 'center'}}
                    style={{ width: "450px" }}
                  />
                </Box>
                <Box
                  className="p-2"
                  style={{ textAlign: "center", marginBottom: 10 }}
                >
                  <BSDateTimePicker
                    value={selectedDateTime} // Pass the selectedDateTime state variable as a prop
                    onChange={handleDateTimeChange}
                  />
                </Box>
                <Box
                  className="p-2"
                  style={{ textAlign: "center", marginBottom: 10 }}
                >
                  <BSDatePicker
                    defaultvalue={"2022-04-17"}
                    selectedDate={selectedDate} // Pass the selectedDate state variable as a prop
                    onDateChange={handleDateChange}
                  />
                </Box>
                {data.bookingType == "Both" ? (
                  <BSRadio
                    title="Booking Type"
                    defaultValue="With Driver"
                    onChange={handleRadioButtonChange}
                    options={[
                      {
                        displayName: "With Driver",
                        key: "one",
                      },
                      {
                        displayName: "Self Drive",
                        key: "two",
                      },
                    ]}
                  />
                ) : null}

                {/* <div style={{ marginTop: "20px", padding: "5px" }}>
                  <h5 style={{ textDecoration: "underline" }}>
                  Upload CNIC pictures for verification
                  </h5>
                  <p>Please upload two images, one of the front side and one of the back side.</p>
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      // onChange={onImageChange}
                    />
                  </div>
                  <br />
                  <div style={{ textAlign: "center" }}>
                    {uploadedImageUrls.map((imageSrc) => (
                      <img
                        src={imageSrc}
                        alt="not fount"
                        width={"100px"}
                        style={{
                          margin: "10px",
                          border: "1px solid black",
                          height: "70px",
                        }}
                      />
                    ))}
                  </div>
                  
                </div> */}
                <div style={{ marginTop: 30, marginBottom: "20px" }}>
                  <button
                    className="bookNowButton"
                    onClick={confirmcar}
                    style={{ textAlign: "center" }}
                  >
                    CONFIRM BOOKING
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
