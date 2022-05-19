import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdClose, MdCall, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
function Index() {
    // this is useState
    let [state, setstate] = useState(false);
    let [allhotel, sethotal] = useState([[]]);

    // inner css
    let style = {
        width: "70%",
        height: "100vh",
        color: "#fff",
        lineHeight: 10,
        backgroundColor: "#fff",
        marginLeft: "0px",
        // display: "none",

        transition: "0.50s",
    };
    let styles = {
        width: "50%",
        height: "100vh",
        color: "#fff",
        lineHeight: 10,
        padding: "1.5em",
        backgroundColor: "#fff",
        marginLeft: "-1400px",
        transition: "0.50s",
    };
    let border = {
        border: "1px solid #e1e1e1",
    };

    // this is useEffect to dech all restaurant
    useEffect(() => {
        fetch("http://localhost:8000/restaurantuser/allresturent", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                sethotal(data);
            });
    }, []);

    return (
        <div className="index">
            <div className="user-main">
                {/* this is navbar */}
                <div className="user-navbar">
                    <div className="res-anoter-login-btn">
                        {/* this for mobile */}
                        <div className="re-mobile-navbar index-mobile-navbar">
                            {state === true ? (
                                <span
                                    onClick={() => setstate(false)}
                                    className="wrong-btn"
                                >
                                    <MdClose />
                                </span>
                            ) : (
                                <p
                                    onClick={() => setstate(true)}
                                    className="menu-lines index-main-line"
                                >
                                    <span className="headerline"></span>
                                    <span className="headerline"></span>
                                    <span className="headerline"></span>
                                </p>
                            )}
                        </div>

                        {state === true ? (
                            <div className="slider index-slider" style={style}>
                                <div className="resindex-btns">
                                    <Link to={"/resturentindex"}>
                                        <button className="res-btn-login">
                                            Add Restaurant
                                        </button>
                                        <hr style={border} />
                                    </Link>
                                    <Link to={"/login"}>
                                        <button className="res-btn-login">
                                            Log in
                                        </button>
                                        <hr style={border} />
                                    </Link>
                                    <Link to={"/register"}>
                                        <button className="res-btn-login">
                                            Sign up
                                        </button>
                                        <hr style={border} />
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="slider" style={styles}>
                                <Link to={"/resturentindex"}>
                                    <button className="res-btn-login">
                                        Add Restaurant
                                    </button>
                                    <hr style={border} />
                                </Link>
                                <Link to={"/login"}>
                                    <button className="res-btn-login">
                                        Log in
                                    </button>
                                    <hr style={border} />
                                </Link>
                                <Link to={"/register"}>
                                    <button className="res-btn-login">
                                        Sign up
                                    </button>
                                    <hr style={border} />
                                </Link>
                            </div>
                        )}
                    </div>
                    <span className="index-navbar-title">
                        welcome to foodies
                    </span>
                    <div className="index-navbar-btns">
                        <Link to={"/resturentindex"}>
                            <button className="res-btn-login user-index-btn">
                                Add Restaurant
                            </button>
                        </Link>
                        <Link to={"/login"}>
                            <button className="res-btn-login user-index-btn">
                                Log in
                            </button>
                        </Link>
                        <Link to={"/register"}>
                            <button className="res-btn-login user-index-btn">
                                Sign up
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="user-mains">
                    <div className="user-main-container">
                        <div className="user-main-details">
                            <h1 className="user-main-h1">Safe Food</h1>
                            <h1 className="user-main-h11">DELIVERY</h1>
                            <p className="user-main-p">
                                order your favorite food items in this website
                                and enjoy
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
            </div>
            <h2 className="user-main-h2">
                Order from your favorite restaurent
            </h2>

            {/* for diaplay hotal */}

            <div className="index-display-main">
                <div className="index-display">
                    {allhotel.map((data, index) => {
                        return (
                            <div className="hotal-main" key={index}>
                                <div>
                                    <img
                                        className="poster mobile-poster "
                                        src={`http://localhost:8000/restaurantuser/resImage/${data.posterurl}`}
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
                                    <Link to={"/home/" + data._id}>
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
export default Index;
