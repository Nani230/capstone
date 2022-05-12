import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdClose, MdCall, MdLocationOn } from 'react-icons/md';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr';
function Resindex() {
    // useStates
    let [state, setstate] = useState(false);
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

    return (
        <div className="res-main">
            <div className="res-main-container">
                <div className="res-main-details">
                    <div className="res-main-business">
                        <div className="res-anoter-login-btn">
                            <div className="re-mobile-navbar">
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
                                        className="menu-lines"
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
                                        <Link to={'/resturentlogin'}>
                                            <button className="res-btn-login">
                                                Login
                                            </button>
                                            <hr style={border} />
                                        </Link>

                                        <Link to={'/resturentregister'}>
                                            <button className="res-btn-signup">
                                                Create Account
                                            </button>
                                            <hr style={border} />
                                        </Link>
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
                                    <Link to={'/resturentlogin'}>
                                        <button className="res-btn-login">
                                            Login
                                        </button>
                                    </Link>

                                    <Link to={'/resturentregister'}>
                                        <button className="res-btn-signup">
                                            Create Account
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                        {/* pc navbar */}
                        <h1 className="res-title">for Business</h1>
                        <div className="res-btn res-index-btns">
                            <Link to={'/resturentlogin'}>
                                <button className="res-btn-login">Login</button>
                            </Link>

                            <Link to={'/resturentregister'}>
                                <button className="res-btn-signup">
                                    Create Account
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="res-another-details">
                        <div className="res-another-container">
                            <div className="res-another-titles">
                                <h1>Register your restaurant on</h1>
                                <p>for free and get more customers!</p>
                            </div>

                            <div className="res-another-btns">
                                <Link to={'/resturentregister'}>
                                    <button className="res-another-reg-btn">
                                        Register Your restaurant
                                    </button>
                                </Link>
                                <Link to={'/resturentlogin'}>
                                    <button className="res-another-sigin-btn">
                                        Restaurant already listed? login now{' '}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="res-work">
                <div className="res-work-container">
                    <h1>Why should you partner with Zomato?</h1>
                    <p>
                        Zomato enables you to get 60% more revenue, 10x new
                        customers and boost your brand{' '}
                    </p>
                    <p>
                        {' '}
                        visibility by providing insights to improve your
                        business.
                    </p>
                </div>
            </div>
            {/* steps to creat account */}
            <div className="res-steps">
                <div className="res-step-container">
                    <h1 className="res-step-title">How it Works?</h1>
                    <div className="res-card-container">
                        <div className="res-cards">
                            <div className="res-card">
                                <img
                                    src="https://b.zmtcdn.com/merchant-onboarding/ecb5e086ee64a4b8b063011537be18171600699886.png"
                                    alt=""
                                />
                                <h3>Step 1</h3>
                                <h5>Create your page</h5>
                                <p>Help users discover your place by</p>
                                <p>Creating a account</p>
                            </div>
                            <div className="res-card">
                                <img
                                    src="https://b.zmtcdn.com/merchant-onboarding/71d998231fdaeb0bffe8ff5872edcde81600699935.png"
                                    alt=""
                                />
                                <h3>Step 2</h3>
                                <h5>Register for online ordering</h5>
                                <p>And deliver orders to millions of</p>
                                <p>customers with ease</p>
                            </div>
                            <div className="res-card">
                                <img
                                    src="https://b.zmtcdn.com/merchant-onboarding/efdd6ac0cd160a46c97ad58d9bbd73fd1600699950.png"
                                    alt=""
                                />
                                <h3>Step 3</h3>
                                <h5>Start receiving orders online</h5>
                                <p>Manage orders on our partner app,</p>
                                <p>Creating a account</p>
                            </div>
                        </div>
                    </div>
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

export default Resindex;
