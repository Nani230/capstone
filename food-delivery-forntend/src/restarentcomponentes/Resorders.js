import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { MdClose, MdCall, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
function Resorders() {
    // useStates
    let [accept, setaccept] = useState("Accept Order");
    let [allitems, setitems] = useState([]);
    let [state, setsate] = useState(false);
    let [stat, setsates] = useState(false);
    let [message, setmessage] = useState("");
    let [box, setbox] = useState(false);
    let [name, username] = useState("");

    let [dataid, setid] = useState("null");
    let [states, setstates] = useState(false);
    let [hotel, sethotal] = useState([]);
    // localStorage
    let data = JSON.parse(localStorage.getItem("details"));
    // navigate from on to another
    let navigate = useNavigate();
    // logout function
    function logout() {
        localStorage.removeItem("details");
        navigate("/resturentindex");
    }
    // useParams
    let prams = useRef(useParams());
    // collecting all order ids
    let statusid = [];
    // useEffect to fech all orders and restarent
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;
        fetch(`http://localhost:8000/order/resorders/${prams.current.id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${realtoken}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setitems(data.data);
            });
        fetch(
            `http://localhost:8000/restaurantuser/allresturent/${prams.current.id}`,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                sethotal(data);
                statusid.push(data._id);
                username(data[0].restaurantname);
            });
    }, []);
    // function to refreshPage
    function refreshPage() {
        window.location.reload(false);
    }
    // function to get oderstatus
    function statetrue(id) {
        setsate(true);
        setid(id);
        setaccept("Order Accepted");
        readvalue("orderStatus", "Accepted");
        readvalue("AcceptStatus", "Order Accepted");
        readvalue("rejectStatus", "Reject Order");

        console.log(id);
    }
    function addstatetrue(id) {
        setsate(true);
        setid(id);
        setaccept("Order Accepted");
        readvalue("orderStatus", "Rejected");
        readvalue("rejectStatus", "Order Rejected");
        console.log(id);
    }
    function datastatetrue(id) {
        setsates(true);
        setid(id);
        readvalue("orderStatus", "Rejected");
        readvalue("rejectStatus", "Order Rejected");
        readvalue("AcceptStatus", "Accept Order");
    }
    function statefalse() {
        setsate(false);
        setsates(false);
    }
    // collecting data
    let users = {};
    function readvalue(pro, value) {
        users[pro] = value;
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
    console.log(users);
    // function to change orderStatus
    function changestatus() {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;
        console.log(users);

        fetch("http://localhost:8000/order/changeStatus/" + dataid, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${realtoken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(users),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success === true) {
                    setmessage(data.message);
                    setbox(true);
                    setTimeout(() => {
                        setbox(false);
                    }, 1500);
                } else {
                    console.log("nothinf");
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="food-main">
            <div className="restarent-navbar">
                <div className="res-anoter-login-btn">
                    <div className="re-mobile-navbar">
                        {states === true ? (
                            <span
                                onClick={() => setstates(false)}
                                className="wrong-btn"
                            >
                                <MdClose />
                            </span>
                        ) : (
                            <p
                                onClick={() => setstates(true)}
                                className="menu-lines"
                            >
                                <span className="headerline"></span>
                                <span className="headerline"></span>
                                <span className="headerline"></span>
                            </p>
                        )}
                    </div>
                    {/* slider */}
                    {states === true ? (
                        <div className="slider" style={style}>
                            <div className="resindex-btns">
                                <button className="res-btn-login">
                                    <span className="main-title-name">
                                        Hello , {name}
                                    </span>
                                </button>
                                <hr style={border} />

                                <Link to={"/resturentregister"}>
                                    <button
                                        onClick={logout}
                                        className="res-btn-signup"
                                    >
                                        Logout
                                    </button>
                                    <hr style={border} />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="slider" style={styles}>
                            <span
                                onClick={() => setstates(false)}
                                className="wrong-btn"
                            >
                                X
                            </span>

                            <button onClick={logout} className="res-btn-signup">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                {hotel.map((data, index) => {
                    return (
                        <h2 key={index} className="navbar-title">
                            Welcome {data.username}
                        </h2>
                    );
                })}
                <div className="res-navbar-details">
                    <button onClick={logout} className="user-navbar-btn ">
                        Logout
                    </button>
                </div>
            </div>
            <h1 className="foo-title">All Your Orders </h1>
            {/* displaying all orders */}
            <div className="food-main-container res-order-food-main-container">
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
                                        <div className="items-details items-resorder-details user-order-details orders-items-details">
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
                                            <span
                                                onClick={() => {
                                                    statetrue(data._id);
                                                    // changestatus();
                                                }}
                                                className="pen res-order-pen"
                                            >
                                                {data.AcceptStatus}
                                            </span>
                                            <span
                                                onClick={() => {
                                                    datastatetrue(data._id);
                                                    // changestatus();
                                                }}
                                                className="trash  res-order-trash"
                                            >
                                                {data.rejectStatus}{" "}
                                            </span>
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
                {state === true ? (
                    <div className="font-icons">
                        <div className="res-update">
                            <div className="reg-btns">
                                <button
                                    onClick={statefalse}
                                    className="reg-sign-btn updata-cancel-btn"
                                >
                                    cancel
                                </button>
                                <button
                                    onClick={() => {
                                        statetrue(data._id);

                                        changestatus();
                                        refreshPage();
                                    }}
                                    className="reg-signup-btn update-sub-btn"
                                >
                                    Accept order
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
                {stat === true ? (
                    <div className="font-icons">
                        <div className="res-update">
                            <div className="reg-btns">
                                <button
                                    onClick={statefalse}
                                    className="reg-sign-btn updata-cancel-btn"
                                >
                                    cancel
                                </button>
                                <button
                                    onClick={() => {
                                        datastatetrue(data._id);

                                        changestatus();
                                        refreshPage();
                                    }}
                                    className="reg-signup-btn update-sub-btn"
                                >
                                    Reject order
                                </button>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            {/* toast message */}
            {box === true ? (
                <div className="login-toast-message">{message}</div>
            ) : null}
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

export default Resorders;
