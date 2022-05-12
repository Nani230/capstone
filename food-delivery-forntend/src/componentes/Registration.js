import { baseURL } from '../App';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Registration() {
    // useStates
    let [message, setmessage] = useState('');
    let [box, setbox] = useState(false);
    // collecting data from user
    let users = {};
    function readvalue(props, value) {
        users[props] = value;
    }
    // funtion for register
    function register() {
        if (users.password === users.cpassword) {
            delete users.cpassword;

            // console.log(users)

            fetch(`${baseURL}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(users),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.success === true) {
                        setmessage(data.message);
                        setbox(true);

                        setTimeout(() => {
                            setbox(false);
                        }, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            console.log('password donot match');
        }
    }

    return (
        <div className="main">
            <div className="register-container">
                <div className="registration">
                    <div className="register-details">
                        <div className="reg-details-container">
                            <img
                                className="reg-img"
                                src="https://cdn-icons-png.flaticon.com/128/3075/3075977.png"
                                alt=""
                            />
                            <h1 className="reg-h1">Create an account</h1>
                            <p className="reg-p">to continue to order</p>
                            <div className="reg-inputes">
                                <input
                                    className="input1"
                                    type="text"
                                    placeholder="Enter Name"
                                    onChange={(event) => {
                                        readvalue('name', event.target.value);
                                    }}
                                />
                                <input
                                    className="input2"
                                    type="number"
                                    placeholder="Enter Number"
                                    onChange={(event) => {
                                        readvalue('mobile', event.target.value);
                                    }}
                                />
                                <input
                                    className="input3"
                                    type="email"
                                    placeholder="Enter Mail"
                                    onChange={(event) => {
                                        readvalue('email', event.target.value);
                                    }}
                                />
                                <input
                                    className="input4"
                                    type="password"
                                    placeholder="Enter Password"
                                    onChange={(event) => {
                                        readvalue(
                                            'password',
                                            event.target.value,
                                        );
                                    }}
                                />
                                <input
                                    className="input5"
                                    type="password"
                                    placeholder="Confrom password"
                                    onChange={(event) => {
                                        readvalue(
                                            'cpassword',
                                            event.target.value,
                                        );
                                    }}
                                />
                            </div>
                            <div className="reg-btns">
                                <button
                                    onClick={register}
                                    className="reg-signup-btn reg-signup2 regs-signup-btn"
                                >
                                    Signup
                                </button>
                                <Link to={'/login'}>
                                    <button className="reg-sign-btn">
                                        {' '}
                                        Signin
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="reg-side-img">
                            <img
                                className="reg-side-img1"
                                src="https://imgs.search.brave.com/8WqM0ruGhvH5yCEAhkbJ3uWD-Wiotl9zE3GGchwsDQA/rs:fit:785:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5B/aG8tcHdtdURCQktH/akVKN0pUdDJRSGFF/ZSZwaWQ9QXBp"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* toast message */}
            {box === true ? (
                <div className="login-toast-message">{message}</div>
            ) : null}
        </div>
    );
}

export default Registration;
