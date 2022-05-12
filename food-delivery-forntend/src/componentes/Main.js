import { baseURL } from '../App';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdClose, MdCall, MdLocationOn } from 'react-icons/md';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
function Main() {
    // this is navigate to navigate on tto another
    let navigate = useNavigate();
    // this is logout function
    function logout() {
        localStorage.removeItem('details');
        navigate('/');
    }
    //    useState
    let [state, setstate] = useState(false);
    let [allhotel, sethotal] = useState([[]]);

    // internal css
    let style = {
        width: '70%',
        height: '100vh',
        color: '#fff',
        lineHeight: 10,
        backgroundColor: '#fff',
        marginLeft: '0px',
        // display: "none",

        transition: '0.50s',
    };
    let styles = {
        width: '50%',
        height: '100vh',
        color: '#fff',
        lineHeight: 10,
        padding: '1.5em',
        backgroundColor: '#fff',
        marginLeft: '-1400px',
        transition: '0.50s',
    };
    let border = {
        border: '1px solid #e1e1e1',
    };
    // user details from localStorage
    let data = JSON.parse(localStorage.getItem('details'));
    console.log(data);
    // useEffect to fech all restaurant
    useEffect(() => {
        fetch(`${baseURL}/restaurantuser/allresturent`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                sethotal(data);
            });
    }, []);

    return (
        <div className="user-main">
            {/* navbar */}
            <div className="user-navbar">
                <div className="res-anoter-login-btn">
                    {/* for mobile */}
                    <div className="re-mobile-navbar main-mobile-navbar">
                        {state === true ? (
                            <span
                                onClick={() => setstate(false)}
                                className="wrong-btn main-wrong-btn"
                            >
                                <MdClose />
                            </span>
                        ) : (
                            <p
                                onClick={() => setstate(true)}
                                className="menu-lines main-lines"
                            >
                                <span className="headerline"></span>
                                <span className="headerline"></span>
                                <span className="headerline"></span>
                            </p>
                        )}
                    </div>

                    {/* slider */}

                    {state === true ? (
                        <div className="slider" style={style}>
                            <div className="resindex-btns">
                                <button className="res-btn-login">
                                    <span className="main-title-name">
                                        Hello , {data.name}
                                    </span>
                                </button>
                                <hr style={border} />
                                <Link to={'/orders/' + data.id}>
                                    <button className="res-btn-login">
                                        Orders
                                    </button>
                                    <hr style={border} />
                                </Link>
                                <button
                                    onClick={logout}
                                    className="res-btn-login"
                                >
                                    Logout
                                </button>{' '}
                                <hr style={border} />
                            </div>
                        </div>
                    ) : (
                        <div className="slider" style={styles}>
                            <span
                                onClick={() => setstate(false)}
                                className="wrong-btn"
                            >
                                X
                            </span>
                            <Link to={'/orders/' + data.id}>
                                <button className="user-navbar-btn">
                                    Orders
                                </button>
                            </Link>
                            <button className="user-navbar-btn">Logout</button>
                        </div>
                    )}
                </div>
                {/* this is for pc navbar feching username */}
                <span className="main-title-name mains-title-name">
                    Hello {data.name}
                </span>
                <div className="navbar-btns">
                    <Link to={'/orders/' + data.id}>
                        <button className="user-navbar-btn">Orders</button>
                    </Link>
                    <Link to={'/cart/' + data.id}>
                        <button className="user-navbar-btn-2">Carts</button>
                    </Link>
                    <button onClick={logout} className="user-navbar-btn">
                        Logout
                    </button>
                </div>
            </div>

            <div className="user-mains">
                <div className="user-main-container">
                    <div className="user-main-details">
                        <h1 className="user-main-h1">Safe Food</h1>
                        <h1 className="user-main-h11">DELIVERY</h1>
                        <p className="user-main-p">
                            order your favorite food items in this website and
                            enjoy
                        </p>
                        <p className="user-main-p">
                            Your eating and get discount in this website by
                            ordering
                        </p>
                        <p className="user-main-p"> Thank you</p>
                    </div>
                    <img
                        className="user-main-img"
                        src="https://raw.githubusercontent.com/abhi0402/foodHub-frontend-client/master/src/images/food_upscaled.png"
                        alt=""
                    />
                </div>
            </div>
            <h2 className="user-main-h2">
                Order from your favorite restaurent
            </h2>
            {/* displying restaurants */}
            <div className="index-display-main">
                <div className="index-display">
                    {allhotel.map((data, index) => {
                        return (
                            <div className="hotal-main" key={index}>
                                <div>
                                    <img
                                        className="poster  mobile-poster"
                                        src={`${baseURL}/restaurantuser/resImage/${data.posterurl}`}
                                        alt=""
                                    />
                                </div>
                                <div className="hotal-details">
                                    <h1>{data.restaurantname}</h1>
                                    <p>{data.address}</p>
                                    <div className="main-time">
                                        <p>
                                            Open time
                                            <br />
                                            <span>{data.opentime}</span>
                                        </p>
                                        <p>
                                            close time
                                            <br />
                                            <span>{data.closetime}</span>
                                        </p>
                                    </div>
                                    <Link to={'/userhome/' + data._id}>
                                        <button className="order-btn">
                                            Order online
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* footer */}
            <div className="footer">
                <div className="footers">
                    <div className="footer-container">
                        <div className="footer-items">
                            <p></p>
                        </div>
                        <div className="gallery">
                            <p className="footer-title">gallery</p>

                            <img
                                className="gallery-img"
                                src="https://raw.githubusercontent.com/abhi0402/foodHub-frontend-client/master/src/images/food_upscaled.png"
                            />
                        </div>
                        <div className="quick-links">
                            <p className="footer-title">Quick links</p>
                            <div className="links">
                                <div className="links-child">
                                    <ul>
                                        <li>
                                            <span className="link-line"></span>
                                            About us
                                        </li>
                                        <li>
                                            <span className="link-line"></span>
                                            What We Offer
                                        </li>
                                        <li>
                                            <span className="link-line"></span>
                                            FAQ
                                        </li>
                                        <li>
                                            <span className="link-line"></span>
                                            Instructors
                                        </li>
                                    </ul>
                                </div>

                                <div className="links-child">
                                    <ul>
                                        <li>
                                            <span className="link-line"></span>
                                            Contact Us
                                        </li>
                                        <li>
                                            <span className="link-line"></span>
                                            Blog
                                        </li>
                                        <li>
                                            <span className="link-line"></span>
                                            Gallery
                                        </li>
                                        <li>
                                            <span className="link-line"></span>
                                            Pricing
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="getintouch">
                            <p className="footer-title">Get in touch</p>
                            <div className="contact">
                                <div className="contact-child">
                                    <p className="contact-icon">
                                        <MdLocationOn />
                                    </p>
                                    <p className="contact-detail contact-details-1">
                                        523 Sylvan Ave, 5th Floor
                                        <br className="mob" />
                                        Mountain View, CA 94041 USA
                                    </p>
                                </div>

                                <div className="contact-child">
                                    <p className="contact-icon">
                                        <MdCall />
                                    </p>
                                    <p className="contact-detail">
                                        +1 (844) 123 456 78SA
                                    </p>
                                </div>

                                <div className="contact-child">
                                    <p className="contact-icon">
                                        <GrMail />
                                    </p>
                                    <p className="contact-detail">
                                        info@demolink.org
                                    </p>
                                </div>

                                <div className="social-media-icon">
                                    <p>
                                        <FaFacebookF />
                                        <FaInstagram />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
