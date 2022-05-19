import { Component, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import { MdClose, MdCall, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
function Cart() {
    // user localstorage
    let datas = JSON.parse(localStorage.getItem("details"));
    // useStates
    let [score, setScore] = useState(1);
    let prams = useRef(useParams());
    let [data, setdata] = useState([]);
    let [state, setstate] = useState(false);
    let [states, setstates] = useState(false);
    let [addstate, setaddstate] = useState(false);
    let [id, setid] = useState("nothing");
    let [quantity, setquantity] = useState(1);
    let [message, setmessage] = useState("");
    let [totalprice, setTotalPrice] = useState();
    let [useraddres, setuseraddres] = useState([]);
    let [box, setbox] = useState(false);
    let items = "";
    let navigate = useNavigate();
    // inner css
    function logout() {
        localStorage.removeItem("details");
        navigate("/");
    }

    // this for to get all foodItems ids
    let user = [];
    function value(value, items) {
        user.push(value);
    }
    // this is for to send food items to orders page
    let users = {};
    function readvalue(pro, value) {
        users[pro] = value;
    }
    //  this for geting addres from user
    let addresuser = {};
    function addresvalue(pro, value) {
        addresuser[pro] = value;
    }
    let style = {
        width: "70%",
        height: "100vh",
        color: "#fff",
        lineHeight: 10,
        backgroundColor: "#fff",
        marginLeft: "0px",

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
    // function to refreshPage
    function refreshPage() {
        window.location.reload(false);
    }
    // function to fech particular restarent food items
    function statetrue(id, resid) {
        setstates(true);
        setid(id);
        console.log(resid);
        fetch(`http://localhost:8000/restaurantuser/items/${resid}`, {
            method: "get",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setquantity(data[0].quantity);
            });
    }
    // this is to show the box

    function addstatetrue() {
        setaddstate(true);
    }
    // this for cart update details
    let cartupdates = {};
    function cartvalue(pro, value) {
        cartupdates[pro] = value;
    }
    // cart update function
    function cartupdate() {
        console.log(cartupdates);
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;
        fetch(`http://localhost:8000/cart/getitem/${id}`, {
            method: "put",
            headers: {
                Authorization: `Bearer ${realtoken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartupdates),
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

    function addres() {
        console.log(addresuser);
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
                if (data.success === true) {
                    alert(data.message);
                } else {
                    console.log("nothinf");
                }
            });
    }

    // usesate to cancel box
    function statefalse() {
        setstates(false);
    }
    // this is to cancle the box

    function addstatefalse() {
        setaddstate(false);
    }
    // useEffect to fech cart items in cart page
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;
        fetch("http://localhost:8000/cart/getitem/" + prams.current.id, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${realtoken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                data.reverse();

                console.log(data);
                setdata(data);
            })
            .catch((err) => console.log(err));

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
    useEffect(() => {
        // total price
        if (data.length !== 0) {
            let tempTotalPrice = 0;
            data.forEach((i) => {
                tempTotalPrice += i.foodItem.price * i.quantity;
            });
            setTotalPrice(tempTotalPrice);
        } else if (data.length === 0) {
            setTotalPrice(0);
        }
    }, [data]);

    // this is delete function
    function deletedata(id) {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;

        fetch(`http://localhost:8000/cart/delete/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${realtoken}`,
            },
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
            })
            .catch((err) => console.log(err));
    }

    //   this function is check out
    function chekout() {
        console.log(user);
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;

        fetch(`http://localhost:8000/cart/checkout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${realtoken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
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
                console.log(data);
            })
            .catch((err) => console.log(err));
    }

    console.log(useraddres);

    return (
        <div className="cart-main">
            <div className="user-navbar ">
                <div className="res-anoter-login-btn">
                    {/* this is for mobile navbar */}
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
                    {/* this for slider */}
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
                            <button className="main-title-name mains-title-name">
                                Hello {datas.name}
                            </button>
                            <Link to={"/orders/" + datas.id}>
                                <button className="user-navbar-btn">
                                    Orders
                                </button>
                            </Link>
                            <button className="user-navbar-btn">Logout</button>
                        </div>
                    )}
                </div>
                {/* this is for normal pc navbar */}

                <span className="main-title-name mains-title-name">
                    Hello {datas.name}
                </span>
                <div className="navbar-btns">
                    <Link to={"/orders/" + datas.id}>
                        <button className="user-navbar-btn">Orders</button>
                    </Link>

                    <button onClick={logout} className="user-navbar-btn">
                        Logout
                    </button>
                </div>
            </div>
            <h1 className="cart-tile">Your Cart Items</h1>

            <div className="cart-food-main-container">
                {/* this is condition */}
                {
                    // looping fooditems data
                    data.map((data, index) => {
                        console.log(index);
                        return (
                            <div className="hotal-main cart-box" key={index}>
                                {value(data._id, data.quantity)}
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
                                            <div className="items-details orders-items-details orders-cart-items-details ">
                                                <p>
                                                    Name :{" "}
                                                    {data.foodItem.itemname}
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
                                        <p className="item-quan">
                                            Quantity : {data.quantity}
                                        </p>
                                        <div className="past-order-font-icon">
                                            <span
                                                className="cart-pens"
                                                onClick={() => {
                                                    statetrue(
                                                        data._id,
                                                        data.restaurant
                                                    );
                                                }}
                                            >
                                                <FaPen />
                                            </span>
                                            <span
                                                className="trash"
                                                onClick={() => {
                                                    deletedata(data._id);
                                                    refreshPage();
                                                }}
                                            >
                                                <FaTrash />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                {data.length != 0 ? (
                    <div className="payment">
                        <div className="check-out" style={{ margin: "auto" }}>
                            {/* <h1>Check Out</h1> */}
                            <div
                                className="payment-title"
                                style={{
                                    display: "flex",
                                    width: "100%",
                                    boxSizing: "border-box",
                                    justifyContent: "space-between",
                                    color: "black",
                                    marginTop: "20px",
                                }}
                            >
                                <h1 style={{ marginRight: "10px" }}>
                                    Total Price :{" "}
                                </h1>
                                <h1
                                    className="price"
                                    style={{ marginRight: "40px " }}
                                >
                                    &#8377; {totalprice}
                                </h1>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                addstatetrue();
                            }}
                            className="cart-btns"
                        >
                            placeorder
                        </button>
                    </div>
                ) : (
                    <Link to={"/main/" + datas.id}>
                        <button className="explore-btn">
                            Explore Food items
                        </button>
                    </Link>
                )}
            </div>

            {addstate === true ? (
                <div className="res-update res-update-addres">
                    <h2> Orderall your item </h2>
                    <div className="res-main-update">
                        <input
                            className="logininput3"
                            type="number"
                            // defaultValue={datas.itemname}
                            placeholder="add number"
                            defaultValue={useraddres.ordermobile}
                            onChange={(event) => {
                                addresvalue("ordermobile", event.target.value);
                            }}
                        />
                        <input
                            className="logininput3"
                            // defaultValue={datas.price}
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
                            onClick={addstatefalse}
                            className="reg-sign-btn updata-cancel-btn"
                        >
                            cancel
                        </button>
                        <button
                            onClick={() => {
                                addres();
                                chekout();
                                // refreshPage();
                            }}
                            className="reg-signup-btn update-sub-btn"
                        >
                            checkout now
                        </button>
                    </div>
                </div>
            ) : null}

            {/* this is quqntity update box */}

            {states === true ? (
                <div className="res-update">
                    <h2> Update quantity </h2>
                    <div className="res-main-update">
                        {readvalue("foodItem", id)}
                        {readvalue("customer", data.id)}
                        <div className="cart-quantity">
                            <button
                                className="btn1"
                                onClick={() =>
                                    score > 1 ? setScore(score - 1) : ""
                                }
                            >
                                -
                            </button>
                            {cartvalue("quantity", score)}
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
                            onClick={statefalse}
                            className="reg-sign-btn updata-cancel-btn"
                        >
                            cancel
                        </button>
                        <button
                            onClick={() => {
                                cartupdate();
                                refreshPage();
                            }}
                            className="reg-signup-btn update-sub-btn"
                        >
                            Update
                        </button>
                    </div>
                </div>
            ) : null}
            {box === true ? (
                <div className="login-toast-message">{message}</div>
            ) : null}

            {/* this is footer */}
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

export default Cart;
