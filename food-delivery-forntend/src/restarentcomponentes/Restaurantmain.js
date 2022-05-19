import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { MdClose, MdCall, MdLocationOn } from "react-icons/md";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
function Restaurantmain() {
    // useParams
    let prams = useRef(useParams());
    // localStorage
    let data = JSON.parse(localStorage.getItem("details"));
    // useStates
    let [state, setsate] = useState(false);
    let [addstate, setaddstate] = useState(false);
    let [cart, setcart] = useState([]);
    let [hotel, sethotal] = useState([]);
    let [id, setid] = useState("null");
    let [states, setstates] = useState(false);
    let [name, username] = useState("");
    let [datas, setdata] = useState([]);
    let [message, setmessage] = useState("");
    let [box, setbox] = useState(false);
    let navigate = useNavigate();
    // logout function
    function logout() {
        localStorage.removeItem("details");
        navigate("/resturentindex");
    }
    // useEffect to fech restaurant and restaurantitems
    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;
        fetch(
            `http://localhost:8000/restaurantuser/items/${prams.current.id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${realtoken}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setcart(data);
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
                username(data[0].restaurantname);
            });
    }, []);
    // function to refreshPage
    function refreshPage() {
        setTimeout(function () {
            window.location.reload(false);
        }, 1000);
    }

    function statetrue(id, data) {
        setsate(true);
        setid(id);
        setdata(data);
        console.log(id);
    }
    function statefalse() {
        setsate(false);
    }
    function addstatetrue() {
        setaddstate(true);
    }
    function addstatefalse() {
        setaddstate(false);
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

    // collecting item data from user
    let users = new FormData();
    // console.log(users);

    function readvalue(pro, value) {
        // users[pro] = value;
        users.append(pro, value);
    }
    // function to update items
    function submit() {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;

        fetch(`http://localhost:8000/restaurantuser/items/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${realtoken}`,
            },
            body: users,
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

    // function to create item
    function additem() {
        console.log("Hello working fine!");
        console.log(users.get("image"));
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;
        fetch(`http://localhost:8000/restaurantuser/createItem`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${realtoken}`,
            },
            body: users,
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

    // function to delete food item
    function deletedata(id, index) {
        let token = JSON.parse(localStorage.getItem("details"));
        let realtoken = token.token;

        fetch(`http://localhost:8000/restaurantuser/items/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${realtoken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                let tempFoodItems = [...cart];

                tempFoodItems.splice(index, 1);

                setcart(tempFoodItems);
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
    console.log(name + "nani");
    return (
        <div className="restauret-main">
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
                                <Link to={"/restaurentorders/" + data.id}>
                                    <button className="res-btn-login">
                                        orders
                                    </button>
                                    <hr style={border} />
                                </Link>

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
                            <Link to={"/restaurentorders/" + data.id}>
                                <button className="res-btn-login">
                                    Orders
                                </button>
                            </Link>

                            <button onClick={logout} className="res-btn-signup">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                {hotel.map((data, index) => {
                    return (
                        <h2
                            key={index}
                            className="main-title-name mains-title-name"
                        >
                            Hello,{data.username}
                        </h2>
                    );
                })}
                <div className="res-navbar-details">
                    <Link to={"/restaurentorders/" + data.id}>
                        <button className="user-navbar-btn res-btn">
                            Orders
                        </button>
                    </Link>
                    <button onClick={logout} className="user-navbar-btn ">
                        Logout
                    </button>
                </div>
            </div>

            <div className="restaurent-mains">
                {hotel.map((data, index) => {
                    return (
                        <div className="restaurent-main-container" key={index}>
                            <div className="restaurent-user-display">
                                <div className="res-user-display" key={index}>
                                    <div className="res-user-display-side">
                                        <h1>
                                            {data.restaurantname} restaurent
                                        </h1>
                                        <p>username : {data.username}</p>
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
                                    className="res-poster-url"
                                    src={`http://localhost:8000/restaurantuser/resImage/${data.posterurl}`}
                                    alt=""
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* toast message */}
            {box === true ? (
                <div className="login-toast-message">{message}</div>
            ) : null}

            {/* update inputes */}
            {state === true ? (
                <div className="restarent-update">
                    <h2> update your data </h2>
                    <div className="res-main-update">
                        <input
                            className="res-main-input1"
                            type="text"
                            defaultValue={datas.itemname}
                            placeholder="updata name"
                            onChange={(event) => {
                                readvalue("itemname", event.target.value);
                            }}
                        />
                        <input
                            className="res-main-input2"
                            defaultValue={datas.price}
                            type="number"
                            placeholder="updata prize"
                            onChange={(event) => {
                                readvalue("price", event.target.value);
                            }}
                        />
                        <input
                            className="res-main-input3"
                            type="number"
                            defaultValue={datas.quantity}
                            placeholder="updata quantity"
                            onChange={(event) => {
                                readvalue("quantity", event.target.value);
                            }}
                        />
                        <input
                            className="res-main-input4"
                            defaultValue={datas.description}
                            type="text"
                            placeholder="updata description"
                            onChange={(event) => {
                                readvalue("description", event.target.value);
                            }}
                        />

                        <input
                            className="  res-main-input5"
                            type="file"
                            placeholder="Add img url"
                            onChange={(event) => {
                                readvalue("image", event.target.files[0]);
                            }}
                        />
                    </div>
                    <div className="reg-btnss">
                        <button
                            onClick={statefalse}
                            className="reg-sign-btn updata-cancel-btn"
                        >
                            cancel
                        </button>
                        <button
                            onClick={() => {
                                submit();
                                refreshPage();
                            }}
                            className="reg-signup-btn update-sub-btn"
                        >
                            Update
                        </button>
                    </div>
                </div>
            ) : null}
            {/* additem inputes */}
            {addstate === true ? (
                <div className="restarent-update ">
                    <h2> Add your item </h2>
                    <div className="res-main-update">
                        <input
                            className=" res-main-input1"
                            type="text"
                            placeholder="Add name"
                            onChange={(event) => {
                                readvalue("itemname", event.target.value);
                            }}
                        />
                        <input
                            className="logininput2  res-main-input2"
                            type="number"
                            placeholder="Add prize"
                            onChange={(event) => {
                                readvalue("price", event.target.value);
                            }}
                        />
                        <input
                            className="logininput3  res-main-input3"
                            type="number"
                            placeholder="Add quantity"
                            onChange={(event) => {
                                readvalue("quantity", event.target.value);
                            }}
                        />
                        <input
                            className="logininput3  res-main-input4"
                            type="text"
                            placeholder="Add description"
                            onChange={(event) => {
                                readvalue("description", event.target.value);
                            }}
                        />

                        <input
                            className="  res-main-input5"
                            type="file"
                            placeholder="Add img url"
                            onChange={(event) => {
                                readvalue("image", event.target.files[0]);
                            }}
                        />

                        {readvalue("restaurant", prams.current.id)}
                    </div>
                    <div className="reg-btnss ">
                        <button
                            onClick={addstatefalse}
                            className="reg-sign-btn updata-cancel-btn"
                        >
                            cancel
                        </button>
                        <button
                            onClick={() => {
                                additem();
                                refreshPage();
                            }}
                            className="reg-signup-btn update-sub-btn"
                        >
                            Add item
                        </button>
                    </div>
                </div>
            ) : null}
            {/* displaying all items */}
            <div className="food-main">
                <h1 className="foo-title">All Food Items </h1>

                <div className="food-main-container  ">
                    {cart.map((data, index) => {
                        return (
                            <div
                                className="hotal-main user-hotal-main"
                                key={index}
                            >
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
                                        <p> {data.price}</p>
                                    </div>
                                </div>

                                <p
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                    className="item-des"
                                >
                                    Des : {data.description}
                                </p>
                                <p
                                    className="left-title"
                                    style={{
                                        fontWeight: "bold",
                                        marginLeft: "25px",
                                        marginTop: "0px",
                                        paddingBottom: "10px",
                                    }}
                                >
                                    food Left : {data.quantity}
                                </p>
                                <div className="font-icons order-font-icon">
                                    <span
                                        onClick={() => {
                                            statetrue(data._id, data);
                                        }}
                                        className="pen"
                                    >
                                        <FaPen />
                                    </span>
                                    <span
                                        className="trash"
                                        onClick={() => {
                                            deletedata(data._id, index);
                                        }}
                                    >
                                        <FaTrash />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="res-add">
                <button onClick={addstatetrue} className="add-title">
                    Add items
                </button>
            </div>
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

export default Restaurantmain;
