import { baseURL } from '../App';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    // this is useState
    let [message, setmessage] = useState('');
    let [box, setbox] = useState(false);
    // this is navigate to navigate
    let navigate = useNavigate();
    //   this is collecting data from inputes
    let user = {};
    function readvalue(props, value) {
        user[props] = value;
    }
    //    this function is login
    function loginuser() {
        // zmdckmc

        console.log(user);

        if ((user.password === undefined) & (user.mobile === undefined)) {
            console.log('comething is wrong');
        } else {
            fetch(`${baseURL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.success === true) {
                        localStorage.setItem(
                            'details',
                            JSON.stringify({
                                token: data.token,
                                id: data._id,
                                name: data.name,
                                role: data.role,
                            }),
                        );

                        navigate('/main/' + data._id);
                    } else {
                        alert('password or email is wrong');
                        // setmessage(data.message);
                        // setbox(true);
                        // setTimeout(() => {
                        //     setbox(false);
                        // }, 1000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    return (
        <div className="main">
            <div className="register-container">
                <div className="registration">
                    <div className="register-details">
                        <div className="login-details-container">
                            <img
                                className="reg-img"
                                src="https://cdn-icons-png.flaticon.com/128/1404/1404945.png"
                                alt=""
                            />
                            <h1 className="reg-hl">Login account</h1>
                            <p className="reg-p">to continue to order</p>

                            <input
                                className="logininput3"
                                type="email"
                                placeholder="Enter Mail"
                                onChange={(event) => {
                                    readvalue('email', event.target.value);
                                }}
                            />
                            <input
                                className="logininput4"
                                type="password"
                                placeholder="Enter Password"
                                onChange={(event) => {
                                    readvalue('password', event.target.value);
                                }}
                            />
                            <div className="reg-btns login-btns">
                                <Link to={'/register'}>
                                    <button className="reg-sign-btn">
                                        Register
                                    </button>
                                </Link>
                                <button
                                    onClick={loginuser}
                                    className="reg-signup-btn reg-signup2"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                        {/* {box === true ? (
                            <div className="login-toast-message">{message}</div>
                        ) : null} */}

                        <div className="login-side-img">
                            <img
                                className="login-side-img1"
                                src="https://imgs.search.brave.com/koMTOHdywn3yROav0amgwa3I_qavwuG9feS8ybCBdrk/rs:fit:917:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5h/Z1lNd2xzb2VYbmxn/Y2R2UU93aVp3SGFE/MSZwaWQ9QXBp"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
