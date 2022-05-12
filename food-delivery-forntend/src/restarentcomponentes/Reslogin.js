import { baseURL } from '../App';
import { Link, useNavigate } from 'react-router-dom';

function Reslogin() {
    let navigate = useNavigate();

    // collecting data from user
    let user = {};
    function readvalue(props, value) {
        user[props] = value;
    }
    //   login function
    function loginuser() {
        console.log(user);

        if ((user.username === undefined) & (user.password === undefined)) {
            console.log('something is wrong');
        } else {
            fetch(`${baseURL}/restaurantuser/login`, {
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
                                role: data.role,
                            }),
                        );
                        navigate('/resturenthome/' + data._id);
                    } else {
                        alert('password or user is wrong');

                        console.log('err');
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
                            <p className="reg-p">to Sell the orders</p>
                            <input
                                className="logininput1"
                                type="text"
                                placeholder="Enter username"
                                onChange={(event) => {
                                    readvalue('username', event.target.value);
                                }}
                            />
                            <input
                                className="logininput2"
                                type="password"
                                placeholder="Enter password"
                                onChange={(event) => {
                                    readvalue('password', event.target.value);
                                    readvalue('role', 'restaurant');
                                }}
                            />

                            <div className="reg-btns">
                                <Link to={'/resturentregister'}>
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

export default Reslogin;
