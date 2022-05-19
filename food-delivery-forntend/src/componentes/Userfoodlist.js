import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdClose, MdCall, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";

import { GrMail } from "react-icons/gr";
function Userfoodlist() {
    // user localStorage
    let datas = JSON.parse(localStorage.getItem("details"));
    // this is useState
    let [state, setstate] = useState(false);
    let [addstate, setaddstate] = useState(false);
    let [orderaddstate, ordersetaddstate] = useState(false);
    let [id, setid] = useState("nothing");
    let [orderid, ordersetid] = useState("nothing");
    let [resid, ressetid] = useState("nothing");
    let [orderresid, orderressetid] = useState("nothing");
    let [allitems, setitems] = useState([]);
    let [hotel, sethotal] = useState([]);
    let [useraddres, setuseraddres] = useState([]);
    let [score, setScore] = useState(1);
    let [quantity, setquantity] = useState(1);
    let [orderquantity, ordersetquantity] = useState(1);
    let [message, setmessage] = useState("");
    let [box, setbox] = useState(false);
    // this is inner css
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
    // this function for logout
    let navigate = useNavigate();
    function logout() {
        localStorage.removeItem("details");
        navigate("/");
    }
    // this is use parames to prams in url
    let prams = useRef(useParams());

    // this is to show the box

    function addstatetrue(id, quntity, resid) {
        setaddstate(true);
        setid(id);
        ressetid(resid);

        setquantity(quntity);
    }
    // this is to cancle the box

    function addstatefalse() {
        setaddstate(false);
    }
    // this is to show the orderbox

    function orderaddstatetrue(id, resid) {
        ordersetaddstate(true);
        ordersetid(id);
        orderressetid(resid);

        ordersetquantity(1);
    }
    // this is to cancle the orderbox

    function orderaddstatefalse() {
        ordersetaddstate(false);
    }
    //    this is useEffect to fech restaurent  and items
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;

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
            });

        fetch(
            `http://localhost:8000/restaurantuser/items/${prams.current.id}`,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setitems(data);
            });
        fetch("http://localhost:8000/cart/addres/" + datas.id, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${realtoken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setuseraddres(data);
            })
            .catch((err) => console.log(err));
    }, []);
    // this is for to collect data
    let users = {};
    function readvalue(pro, value) {
        users[pro] = value;
    }
    // function to refreshPage
    function refreshPage() {
        window.location.reload(false);
    }
    //  this for geting addres from user
    let addresuser = {};
    function addresvalue(pro, value) {
        addresuser[pro] = value;
    }
    // this for order

    function addres() {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;
        fetch(`http://localhost:8000/cart/addres/${datas.id}`, {
            method: "put",
            headers: {
                Authorization: `Bearer ${realtoken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(addresuser),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    }

    // this function is to add items in cart
    function cart() {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;
        fetch(`http://localhost:8000/cart/addItem`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${realtoken}`,
                "Content-Type": "application/json",
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
                    }, 1500);
                } else {
                    console.log("nothinf");
                }
            });
    }
    // this function is for to order items
    function order() {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;
        fetch(`http://localhost:8000/order/create/${datas.id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${realtoken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(users),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.success === true) {
                    alert(data.message);
                } else {
                    console.log("nothinf");
                }
            });
    }
    console.log(users);

    return (
        <div className="food-main">
            <div className="user-navbar">
                <div className="res-anoter-login-btn">
                    {/* this is mobile navber */}
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
                    {/* this is slider */}
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

                {/* this is normal pc navbar */}
                <span className="main-title-name mains-title-name">
                    Hello {datas.name}
                </span>
                <div className="navbar-btns">
                    <Link to={"/orders/" + datas.id}>
                        <button className="user-navbar-btn">Orders</button>
                    </Link>
                    <Link to={"/cart/" + datas.id}>
                        <button className="user-navbar-btn-2">Carts</button>
                    </Link>
                    <button onClick={logout} className="user-navbar-btn">
                        Logout
                    </button>
                </div>
            </div>
            <div className="restaurent-mains">
                {/* looping the reatarent */}
                {hotel.map((data, index) => {
                    return (
                        <div className="restaurent-main-container" key={index}>
                            <div className="restaurent-user-display">
                                <div className="res-user-display" key={index}>
                                    <div className="res-user-display-side">
                                        <h1 className="userfood-res-title">
                                            Welcome To , {data.restaurantname}{" "}
                                            restaurent <span>{datas.name}</span>
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
                                    src={`http://localhost:8000/restaurantuser/resImage/${data.posterurl}`}
                                    alt=""
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            <h1 className="foo-title">All Food Items </h1>

            {/* function for to order  */}
            {orderaddstate === true ? (
                <div className="res-update res-update-addres">
                    <h2> Orderall your item </h2>+{" "}
                    <div className="res-main-update">
                        {readvalue("foodItem", orderid)}
                        {readvalue("customer", datas.id)}
                        {readvalue("restaurant", orderresid)}
                        {readvalue("quantity", orderquantity)}
                        <input
                            className="logininput3"
                            type="number"
                            placeholder="add number"
                            defaultValue={useraddres.ordermobile}
                            onChange={(event) => {
                                addresvalue("ordermobile", event.target.value);
                            }}
                        />
                        <input
                            className="logininput3"
                            type="text"
                            placeholder="add addres"
                            defaultValue={useraddres.addres}
                            onChange={(event) => {
                                addresvalue("addres", event.target.value);
                            }}
                        />
                    </div>
                    <div className="reg-btns">
                        <button
                            onClick={orderaddstatefalse}
                            className="reg-sign-btn updata-cancel-btn"
                        >
                            cancel
                        </button>
                        <button
                            onClick={() => {
                                addres();
                                order();
                                // refreshPage();
                            }}
                            className="reg-signup-btn update-sub-btn"
                        >
                            Order now
                        </button>
                    </div>
                </div>
            ) : null}

            {addstate === true ? (
                <div className="res-update">
                    <h2> Add Quantity </h2>
                    <div className="res-main-update">
                        {readvalue("foodItem", id)}
                        {readvalue("customer", datas.id)}
                        {readvalue("restaurant", resid)}
                        <div className="cart-quantity">
                            <button
                                className="btn1"
                                onClick={() =>
                                    score > 1 ? setScore(score - 1) : ""
                                }
                            >
                                -
                            </button>
                            {readvalue("quantity", score)}
                            <h3>{score}</h3>

                            <button
                                className="btn1"
                                onClick={() =>
                                    score < quantity ? setScore(score + 1) : ""
                                }
                            >
                                {" "}
                                +{" "}
                            </button>
                        </div>
                    </div>
                    <div className="reg-btns">
                        <button
                            onClick={addstatefalse}
                            className="reg-sign-btn updata-cancel-btn"
                        >
                            cancel
                        </button>
                        <button
                            onClick={cart}
                            className="reg-signup-btn update-sub-btn"
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            ) : null}

            {box === true ? (
                <div className="login-toast-message">{message}</div>
            ) : null}

            <div className="food-main-container user-food-main-container">
                {allitems.map((data, index) => {
                    return (
                        <div className="hotal-main user-hotal-main" key={index}>
                            <div>
                                <img
                                    className="poster"
                                    src={`http://localhost:8000/restaurantuser/foodImage/${data.posterurl}`}
                                    alt=""
                                />
                            </div>
                            <div className="item-container">
                                <div className="items-details user-order-details orders-items-details">
                                    <p>Name : {data.itemname}</p>
                                    <p>
                                        {" "}
                                        <span className="rupee">
                                            <FaRupeeSign />
                                        </span>{" "}
                                        {data.price}
                                    </p>
                                </div>
                            </div>
                            <p className="item-des">Des : {data.description}</p>
                            <div className="orderbtns">
                                <button
                                    className="add-btn"
                                    onClick={() => {
                                        addstatetrue(
                                            data._id,
                                            data.quantity,
                                            data.restaurant
                                        );
                                    }}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() =>
                                        orderaddstatetrue(
                                            data._id,
                                            data.restaurant
                                        )
                                    }
                                    className="add-btn-order"
                                >
                                    Order now
                                </button>
                            </div>
                        </div>
                    );
                })}
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

export default Userfoodlist;
