import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, set, ref, onValue, push, remove, update } from "firebase/database";
import app from "./firebaseconfig";


const auth = getAuth(app);
const db = getDatabase(app);



let signUpUser = (obj) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, obj.email, obj.password)
            .then((res) => {
                obj.id = res.user.uid;
                const reference = ref(db, `users/${obj.id}`);
                set(reference, obj)
                    .then(() => {
                        resolve("Data Send Successfully in Database and User Created");
                    })
                    .catch((err) => {
                        reject(err.message);
                    });
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

let loginUser = (obj) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, obj.email, obj.password)
            .then((res) => {
                const reference = ref(db, `users/${res.user.uid}`)
                onValue(reference, (data) => {
                    if (data.exists()) {
                        
                        resolve(data.val())
                    }
                    else {
                        reject("Data not found")
                    }
                })
            })
            .catch((err) => {
                reject(err.message)
            })
    })
}

let loginTransporter = (obj) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, obj.email, obj.password)
            .then((res) => {
                const reference = ref(db, `users/Transporter/${res.user.uid}`)
                onValue(reference, (data) => {
                    if (data.exists()) {
                        resolve(data.val())
                    }
                    else {
                        reject("Data not found")
                    }
                })
            })
            .catch((err) => {
                reject(err.message)
            })
    })
}

let postFbData = (nodeName, obj) => {
    return new Promise((resolve, reject) => {
        let keyRef = ref(db, `${nodeName}/`);
        obj.id = push(keyRef).key;

        let postRef = ref(db, `${nodeName}/${obj.userid}/${obj.id}`);
        set(postRef, obj)
            .then((res) => {
                resolve("res of postfbdata aaaaa", obj.id)
                console.log("res of postfbdata", obj.id)
            })
            .catch((err) => {
                reject(err.message)
            })
    })
}
let postCarData = (nodeName, obj) => {
    return new Promise((resolve, reject) => {
        // let keyRef = ref(db, `${nodeName}/`);
        // obj.id = push(keyRef).key;

        let postRef = ref(db, `${nodeName}/${obj.userid}/${obj.carNumber}`);
        set(postRef, obj)
            .then((res) => {
                resolve("res of postfbdata aaaaa", obj.id)
                console.log("res of postfbdata", obj.id)
            })
            .catch((err) => {
                reject(err.message)
            })
    })
}

let editFbData = (obj) => {
    return new Promise((resolve, reject) => {
        let postRef = ref(db, `users/${obj.id}`);
        update(postRef, obj)
            .then(() => {
                resolve("Data Updated Successfully");
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};
let editCarData = (nodeName, obj, carNumber) => {
    return new Promise((resolve, reject) => {
        let postRef = ref(db, `${nodeName}/${obj.userid}/${carNumber}`);
        update(postRef, obj)
            .then(() => {
                resolve("Data Updated Successfully");
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

let postFbDatacustomer = (nodeName, obj) => {
    return new Promise((resolve, reject) => {
        let keyRef = ref(db, `${nodeName}/`);
        obj.id = push(keyRef).key;

        let postRef = ref(db, `${nodeName}/${obj.customerid}/${obj.id}`);
        set(postRef, obj)
            .then((res) => {
                resolve("Data Send Successfully", res)
            })
            .catch((err) => {
                reject(err.message)
            })
    })
}

// let postFbDataBooking = (nodeName, obj) => {
//     return new Promise((resolve, reject) => {
//         let keyRef = ref(db, `${nodeName}/`);
//         let customerBookingId = push(keyRef).key; // Generate customerBooking ID

//         let postRef = ref(db, `${nodeName}/${obj.customerid}/${customerBookingId}`);
//         set(postRef, obj)
//             .then(() => {
//                 let transporterBookingId = push(keyRef).key; // Generate TransporterBooking ID
//                 let transporterPostRef = ref(db, `${nodeName}/${obj.userid}/${transporterBookingId}`);
//                 set(transporterPostRef, obj)
//                     .then(() => {
//                         resolve({ customerBookingId, transporterBookingId }); // Resolve with both IDs
//                     })
//                     .catch((err) => {
//                         reject(err.message);
//                     });
//             })
//             .catch((err) => {
//                 reject(err.message);
//             });
//     });
// };

let postFbDataBooking = (nodeName, obj) => {
    return new Promise((resolve, reject) => {
        let keyRef = ref(db, `${nodeName}/`);
        let customerBookingId = push(keyRef).key; // Generate customerBooking ID
        let transporterBookingId = push(keyRef).key; // Generate TransporterBooking ID

        // Include booking IDs in the object
        obj.customerBookingId = customerBookingId;
        obj.transporterBookingId = transporterBookingId;
        console.log('obj in postFbDataBooking', obj)

        let postRef = ref(db, `${nodeName}/${obj.customerid}/${customerBookingId}`);
        set(postRef, obj)
            .then(() => {
                let transporterPostRef = ref(db, `${nodeName}/${obj.userid}/${transporterBookingId}`);
                set(transporterPostRef, obj)
                    .then(() => {
                        resolve({ customerBookingId, transporterBookingId }); // Resolve with both IDs
                    })
                    .catch((err) => {
                        reject(err.message);
                    });
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};


let fbCustonPost = (nodeName, obj) => {
    return new Promise((resolve, reject) => {
        const reference = ref(db, `${nodeName}/`)
        set(reference, obj).then(() => {
            resolve("Data send")
        }).catch(() => {
            reject("No data send")
        })
    })

}

let getFbData = (nodeName, id) => {
    return new Promise((resolve, reject) => {
        let reference = ref(db, `${nodeName}/`)
        onValue(reference, (dt) => {
            if (dt.exists()) {
                resolve(Object.values(dt.val()));
            }
            else {
                reject("Data Not Found")
            }
        })
    })
}

let getData = (nodeName) => {
    let reference = ref(db, `${nodeName}/`)
    onValue(reference, (dt) => {
        if (dt.exists()) {
            console.log(dt.val());
        }
        else {
            console.log("Data Not Found")
        }
    })
}

let getCustomerData = (nodeName, id) => {
    return new Promise((resolve, reject) => {
        let reference = ref(db, `${nodeName}/${id}`);
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                resolve(data);
            } else {
                reject("Data Not Found");
            }
        }, (error) => {
            reject(error);
        });
    });
};

let getprofileData = (nodeName, user, id) => {
    return new Promise((resolve, reject) => {
        let reference = ref(db, `${nodeName}/${user}/${id}`);
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const dataArray = Object.values(data); // Convert object values to an array if you need an array
                resolve(dataArray); // Resolve the promise with the data array
            } else {
                reject("Data Not Found"); // Reject the promise if no data is found
            }
        }, (error) => {
            reject(error); // Reject the promise if there's an error fetching the data
        });
    });
};

// let getIdData = (nodeName, id) => {
//     let reference = ref(db, `${nodeName}/${id}`)
//     onValue(reference, (dt) => {
//         if (dt.exists()) {
//             console.log(dt.val());
//         }
//         else {
//             console.log("Data Not Found")
//         }
//     })
// }

let getIdData = (nodeName, id) => {
    return new Promise((resolve, reject) => {
    let reference = ref(db, `${nodeName}/${id}`)
    onValue(reference, (dt) => {
        if (dt.exists()) {
            resolve(dt.val());
        }
        else {
            reject("Data Not Found")
        }
    })
})
}

const deletedata = (nodeName, userId, id) => {
    return new Promise((resolve, reject) => {
        const reference = ref(db, `${nodeName}/${userId}/${id}`);
        remove(reference)
            .then(() => {
                resolve("Data Deleted Successfully");
            })
            .catch((err) => {
                reject(err.message);
            });
    });
};

let userLogout = () => {
    return new Promise((resolve, reject) => {
    signOut(auth)
    .then((res) => {
        resolve("User Logged out")
    })
    .catch((err) => {
        reject(err.message);
    });
});
}

let checkAuth = () => {
    return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            const uid = user.uid;
            resolve(uid);
        } else {
            reject("User not logged in");
            }
        })
    })
}



export { loginUser, signUpUser, editCarData, postFbDataBooking, postCarData, editFbData, getCustomerData, postFbData, fbCustonPost, getData, getFbData, getprofileData, deletedata, checkAuth, postFbDatacustomer, userLogout, loginTransporter, getIdData };