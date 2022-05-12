import { baseURL } from '../App';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdClose, MdCall, MdLocationOn } from 'react-icons/md';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';

// this for landing page  with out any login

function Foodlist() {
    let prams = useRef(useParams());

    // this is useState to store all food items. noneuser Selected Restaurent
    let [allitems, setitems] = useState([]);
    let [hotel, sethotal] = useState([]);
    let [state, setstate] = useState(false);
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
    // this is useEffect used for fech all food items. noneuser Selected Restaurent
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem('resdetails'));
        fetch(`${baseURL}/restaurantuser/allresturent/${prams.current.id}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                sethotal(data);
            });
        fetch(`${baseURL}/restaurantuser/items/${prams.current.id}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // Storing data
                setitems(data);
            });
    }, []);

    console.log(allitems);

    return (
        <div className="food-main">
            <div className="user-navbar">
                <div className="res-anoter-login-btn">
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
                                <Link to={'/resturentindex'}>
                                    <button className="res-btn-login">
                                        Add Restaurant
                                    </button>
                                    <hr style={border} />
                                </Link>
                                <Link to={'/login'}>
                                    <button className="res-btn-login">
                                        Log in
                                    </button>
                                    <hr style={border} />
                                </Link>
                                <Link to={'/register'}>
                                    <button className="res-btn-login">
                                        Sign up
                                    </button>
                                    <hr style={border} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="slider" style={styles}>
                            <Link to={'/resturentindex'}>
                                <button className="res-btn-login">
                                    Add Restaurant
                                </button>
                                <hr style={border} />
                            </Link>
                            <Link to={'/login'}>
                                <button className="res-btn-login">
                                    Log in
                                </button>
                                <hr style={border} />
                            </Link>
                            <Link to={'/register'}>
                                <button className="res-btn-login">
                                    Sign up
                                </button>
                                <hr style={border} />
                            </Link>
                        </div>
                    )}
                </div>
                <span className="index-navbar-title">welcome to foodies</span>
                <div className="index-navbar-btns">
                    <Link to={'/resturentindex'}>
                        <button className="res-btn-login user-index-btn">
                            Add Restaurant
                        </button>
                    </Link>
                    <Link to={'/login'}>
                        <button className="res-btn-login user-index-btn">
                            Log in
                        </button>
                    </Link>
                    <Link to={'/register'}>
                        <button className="res-btn-login user-index-btn">
                            Sign up
                        </button>
                    </Link>
                </div>
            </div>
            <div className="restaurent-mains">
                {hotel.map((data, index) => {
                    return (
                        <div className="restaurent-main-container" key={index}>
                            <div className="restaurent-user-display">
                                <div className="res-user-display" key={index}>
                                    <div className="res-user-display-side">
                                        <h1 className="userfood-res-title">
                                            Welcome To , {data.restaurantname}{' '}
                                            restaurent
                                        </h1>
                                        <p>Address : {data.address}</p>
                                        <p>Opentime : {data.opentime}</p>
                                        <p>closetime : {data.closetime}</p>
                                        <p>Email : {data.email}</p>
                                        <p>Mobile : +91 {data.mobile}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img
                                    className="res-poster-url userfood-res-img"
                                    src={`${baseURL}/restaurantuser/resImage/${data.posterurl}`}
                                    alt=""
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <h1 className="foo-title">All Food Items </h1>

            <div className="food-main-container">
                {/* displaying data */}
                {allitems.map((data, index) => {
                    return (
                        <div className="hotal-main" key={index}>
                            <div>
                                <img
                                    className="poster"
                                    src={`${baseURL}/restaurantuser/foodImage/${data.posterurl}`}
                                    alt=""
                                />
                            </div>
                            <div className="item-container">
                                <div className="items-details">
                                    <p>Name : {data.itemname}</p>
                                    <p> {data.price}</p>
                                </div>
                            </div>
                            <p className="item-des">Des : {data.description}</p>
                            <Link to={'/register'}>
                                <button className="add-btn">Add to Cart</button>
                            </Link>
                        </div>
                    );
                })}
            </div>
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

export default Foodlist;
