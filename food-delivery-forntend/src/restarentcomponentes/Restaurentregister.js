import { useState } from "react";
import { Link } from "react-router-dom";

function Restaurentregister() {
    // collecting data from user
    // let users = {};
    let users = new FormData();
    // useState
    let [box, setbox] = useState(false);
    let [message, setmessage] = useState("");

    // console.log(users);

    function readvalue(pro, value) {
        // users[pro] = value;
        users.append(pro, value);
    }
    // function to register restarent
    function register() {
        console.log(" fine!");
        console.log(users.get("image"));

        fetch(`http://localhost:8000/restaurantuser/register`, {
            method: "POST",
            headers: {
                // Authorization: `Bearer ${realtoken}`,
            },
            body: users,
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                console.log(data);
                if (data.success === true) {
                    setmessage(data.message);
                    setbox(true);

                    setTimeout(() => {
                        setbox(false);
                    }, 1000);
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="res-reg-main">
            <div className="res-reg-container">
                <div className="res-reg-details">
                    <h1>Register your Restaurant</h1>
                    <p>to continue to sell items</p>

                    <div className="res-reg-inputes">
                        <input
                            className="restaurantname"
                            type="text"
                            placeholder="Enter restaurent name"
                            onChange={(event) => {
                                readvalue("restaurantname", event.target.value);
                            }}
                        />
                        <input
                            className="res-addres"
                            type="text"
                            placeholder="Enter address"
                            onChange={(event) => {
                                readvalue("address", event.target.value);
                            }}
                        />
                        <input
                            className="res-open-time"
                            type="time"
                            placeholder="User Enter open time"
                            onChange={(event) => {
                                readvalue("opentime", event.target.value);
                            }}
                        />
                        <input
                            className="res-close-time"
                            type="time"
                            placeholder="Enter colse time"
                            onChange={(event) => {
                                readvalue("closetime", event.target.value);
                            }}
                        />
                        <input
                            className="res-username"
                            type="text"
                            placeholder="User name"
                            onChange={(event) => {
                                readvalue("username", event.target.value);
                            }}
                        />
                        <input
                            className="res-email"
                            type="email"
                            placeholder="Enter email"
                            onChange={(event) => {
                                readvalue("email", event.target.value);
                            }}
                        />
                        <input
                            className="res-mobile-number"
                            type="number"
                            placeholder=" Enter mobile number"
                            onChange={(event) => {
                                readvalue("mobile", event.target.value);
                            }}
                        />
                        <input
                            className="res-password"
                            type="password"
                            placeholder="Enter password"
                            onChange={(event) => {
                                readvalue("password", event.target.value);
                            }}
                        />
                        <input
                            className="  res-main-input5"
                            type="file"
                            placeholder="Add img url"
                            onChange={(event) => {
                                readvalue("image", event.target.files[0]);
                            }}
                            name="image"
                        />
                    </div>

                    <div className="reg-btns res-reg-btns">
                        <button
                            onClick={register}
                            className="reg-signup-btn regs-signup-btn"
                        >
                            Register
                        </button>
                        <Link to={"/resturentlogin"}>
                            <button className="reg-sign-btn"> Login</button>
                        </Link>
                    </div>
                </div>
                <img
                    className="res-reg-img"
                    src="https://imgs.search.brave.com/8WqM0ruGhvH5yCEAhkbJ3uWD-Wiotl9zE3GGchwsDQA/rs:fit:785:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5B/aG8tcHdtdURCQktH/akVKN0pUdDJRSGFF/ZSZwaWQ9QXBp"
                    alt=""
                />
            </div>
            {/* toast message */}
            {box === true ? (
                <div className="login-toast-message">{message}</div>
            ) : null}
        </div>
    );
}

export default Restaurentregister;
