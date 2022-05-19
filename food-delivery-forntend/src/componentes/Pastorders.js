import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdClose, MdCall, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";

import { GrMail } from "react-icons/gr";
function Pastorders() {
    // useStates
    let [allitems, setitems] = useState([]);
    let prams = useRef(useParams());
    let [state, setstate] = useState(false);
    let [status, setstatus] = useState("");
    let [totalprice, setTotalPrice] = useState();
    let datas = JSON.parse(localStorage.getItem("details"));
    let navigate = useNavigate();
    // logout function
    function logout() {
        localStorage.removeItem("details");
        navigate("/");
    }
    // internal css
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
    let green = {
        color: "green",
        marginTop: "45px",
        width: "200px",
        fontWeight: "bold",
    };
    let red = {
        color: "red",
        marginTop: "45px",
        width: "200px",
        fontWeight: "bold",
    };
    // useEffect to fech all orders of users
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;
        fetch(`http://localhost:8000/order/orders/${prams.current.id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${realtoken}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                data.reverse();
                console.log(data);
                setitems(data);
            });
    }, []);
    // useEffect to fech totalprice
    useEffect(() => {
        // total price
        if (allitems.length !== 0) {
            let tempTotalPrice = 0;
            allitems.forEach((i) => {
                tempTotalPrice += i.foodItem.price * i.quantity;
            });
            setTotalPrice(tempTotalPrice);
        } else if (allitems.length === 0) {
            setTotalPrice(0);
        }
    }, [allitems]);
    return (
        <div className="food-main">
            <div className="user-navbar">
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
                                <button className="res-btn-login">
                                    <span className="main-title-name">
                                        Hello , {datas.name}
                                    </span>
                                </button>
                                <hr style={border} />
                                <Link to={"/orders/" + datas.id}>
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
                                </button>{" "}
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
                            <Link to={"/orders/" + datas.id}>
                                <button className="user-navbar-btn">
                                    Orders
                                </button>
                            </Link>
                            <button
                                onClick={logout}
                                className="user-navbar-btn"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                <span className="main-title-name mains-title-name">
                    Hello {datas.name}
                </span>
                <div className="navbar-btns">
                    <Link to={"/cart/" + datas.id}>
                        <button className="user-navbar-btn-2">Carts</button>
                    </Link>
                    <button onClick={logout} className="user-navbar-btn">
                        Logout
                    </button>
                </div>
            </div>
            <h1 className="foo-title">All Your Orders </h1>
            {/* displaying all orders */}
            <div className="food-main-container">
                {allitems.map((data, index) => {
                    return (
                        <div className="hotal-main cart-box3" key={index}>
                            <div className="cart-box2">
                                <div>
                                    <img
                                        className="poster cart-poster"
                                        src={`http://localhost:8000/restaurantuser/foodImage/${data.foodItem.posterurl}`}
                                        alt=""
                                    />
                                </div>
                                <div className="all-orders-container">
                                    <div className="item-container">
                                        <div className="items-details items-order-details orders-items-details orders-cart-items-details">
                                            <p>
                                                Name : {data.foodItem.itemname}
                                            </p>
                                            <p>
                                                {" "}
                                                <span>
                                                    <FaRupeeSign />
                                                </span>{" "}
                                                {data.foodItem.price}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="item-quan items-order-details">
                                        Quantity : {data.quantity}
                                    </p>
                                    <div className="users-addres">
                                        <p>Name : {data.customer.name}</p>
                                        <p>
                                            Mobile : {data.customer.ordermobile}
                                        </p>
                                    </div>
                                    <p className="users-addres">
                                        Addres : {data.customer.addres}
                                    </p>

                                    <div>
                                        <div className="order-font-icons  items-order-details ">
                                            {data.orderStatus === "Accepted" ? (
                                                <p
                                                    className="orderstatus"
                                                    style={green}
                                                >
                                                    <span className="order-status">
                                                        Status :
                                                    </span>
                                                    {data.orderStatus}
                                                </p>
                                            ) : null}
                                            {data.orderStatus === "Rejected" ? (
                                                <p
                                                    className="orderstatus"
                                                    style={red}
                                                >
                                                    <span className="order-status">
                                                        Status :
                                                    </span>
                                                    {data.orderStatus}
                                                </p>
                                            ) : null}
                                            {data.orderStatus === "pending" ? (
                                                <p
                                                    style={{ width: "200px" }}
                                                    className="orderstatus pending"
                                                >
                                                    <span className="order-status">
                                                        Status :
                                                    </span>
                                                    {data.orderStatus}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="user-addres">
                                        <p>Name : {data.customer.name}</p>
                                        <p>
                                            Mobile : {data.customer.ordermobile}
                                        </p>
                                    </div>
                                    <p className="user-addres">
                                        Addres : {data.customer.addres}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* display totalprice */}
                {allitems.length != 0 ? null : (
                    <Link to={"/main/" + datas.id}>
                        <button className="explore-btn">
                            Explore Food items
                        </button>
                    </Link>
                )}
            </div>
            {/* fotter */}
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
export default Pastorders;
