import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './componentes/Registration';
import Index from './componentes/Index';
import Foodlist from './componentes/Foodlist';
import Login from './componentes/Login';
import Main from './componentes/Main';
import Resindex from './restarentcomponentes/Resindex';
import './css/App.css';
import './css/Mobile.css';
import './css/Mobiles.css';
import './css/Mobile4.css';

import './css/Ipad.css';
import './css/Pad.css';
import './css/Pc.css';
import './css/Small.css';
import Reslogin from './restarentcomponentes/Reslogin';
import Restaurentregister from './restarentcomponentes/Restaurentregister';
import Restaurantmain from './restarentcomponentes/Restaurantmain';
import Userfoodlist from './componentes/Userfoodlist';
import Cart from './componentes/Cart';
import Pastorders from './componentes/Pastorders';
import Resorders from './restarentcomponentes/Resorders';

export default function App() {
    // Route protection
    function RequireAuth({ children, redirectTo }) {
        let isAuth = localStorage.getItem('details');

        if (isAuth != null) {
            console.log(isAuth);

            return children;
        } else {
            return <Navigate to={redirectTo} />;
        }
    }

    const RequireAuths = () => {
        let user = localStorage.getItem('details');
        if (user === null) {
            return <Index />;
        } else if (user !== null) {
            let userId = JSON.parse(user).id;
            let role = JSON.parse(user).role;
            if (role === 'user') {
                return <Navigate to={`/main/${userId}`} />;
            } else if (role === 'restaurant') {
                return <Navigate to={`/resturenthome/${userId}`} />;
            }
        }
    };

    return (
        <div className="App">
            <BrowserRouter>
                {/* all routes */}
                <Routes>
                    {/* this rour for normal user register */}
                    <Route path="/register" element={<Registration />} />
                    {/* this for landing page */}
                    <Route path="/" element={<RequireAuths />} />
                    {/* this for user login */}
                    <Route path="/login" element={<Login />} />

                    {/* this for after user login this is the main page user can see */}
                    <Route path="/main/:id" element={<Main />} />
                    {/* this is none user click on restaurent this page they will see */}

                    <Route path="/home/:id" element={<Foodlist />} />
                    {/* this for after selecting restaurent this is page will see user */}
                    <Route
                        path="/userhome/:id"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Userfoodlist />
                            </RequireAuth>
                        }
                    />
                    {/* this for use cart */}
                    <Route
                        path="cart/:id"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Cart />
                            </RequireAuth>
                        }
                    />

                    {/* this for user all orders and past orders */}
                    <Route
                        path="orders/:id/"
                        element={
                            <RequireAuth redirectTo="/login">
                                <Pastorders />
                            </RequireAuth>
                        }
                    />

                    {/* this  routes for restaurent */}

                    {/* this for restaurent landing page */}
                    <Route path="/resturentindex" element={<Resindex />} />
                    {/* this for restaurent register */}
                    <Route
                        path="/resturentregister"
                        element={<Restaurentregister />}
                    />
                    {/* this for restaurent login */}
                    <Route path="/resturentlogin" element={<Reslogin />} />
                    {/* this for after restaurent user login this is page restaurantuser can see */}
                    <Route
                        path="/resturenthome/:id/"
                        element={
                            <RequireAuth redirectTo="/">
                                <Restaurantmain />
                            </RequireAuth>
                        }
                    />

                    {/* this for restaurantuser orders */}
                    <Route
                        path="/restaurentorders/:id/"
                        element={
                            <RequireAuth redirectTo="/">
                                <Resorders />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export const baseURL = 'https://food-ordering-api123.herokuapp.com';
