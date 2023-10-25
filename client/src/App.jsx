import {Toaster} from 'react-hot-toast';
import React, {useState, useEffect, useRef, useMemo, useContext} from 'react';
const LoginForm = React.lazy(() => import('./Login-Form/LoginForm'));
import Logout from './Login-Form/Logout';
import Cards from './Cards-1/Card-Container';
import Cards1 from './Cards-2/Card-Container';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
  Outlet,
  useLocation,
  Navigate,
} from 'react-router-dom';
import {Context} from './Provider';
import Otp from './OTP/Otp';
import Profile from './Profile/Profile';
import Chat from './Chat';
import SideBar from './SideBar/Notification';
import axios from 'axios';
import MyAwesomeThemeComponent from './ThemeToggle/toggle';
import Comment from './NewComponent/Comment';
import Notification from './SideBar/Notification';
import HeroWithPic from './Hero/HeroWithPic';
import Test from './NewComponent/Test';
import Chats from './Chat/ChatBubble';
import ChatRoutes from './Chat/ChatRoutes';

const ProtectedRoute = () => {
  const {provider} = useContext(Context);
  const location = useLocation();
  return provider.login ? <Outlet /> : <Navigate to='/login' replace state={{from: location}} />;
};
const SimpleProtectedRoute = () => {
  const {provider} = useContext(Context);
  return provider.login ? <Outlet /> : <Navigate to='/login' replace />;
};

const Grape = () => {
  return (
    <></>
    // <button className="btn-block btn " onClick={funct}>Btn</button>
  );
};

const App = () => {
  return (
    <>
      {/* <MyAwesomeThemeComponent /> */}
      <Toaster position='top-right' toastOptions={{duration: 1000, className: 'mr-10'}} />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path='/cart' element={<>CArt</>} />
            <Route path='/carting' element={<>carting</>} />
          </Route>
          <Route element={<SimpleProtectedRoute />}>
            <Route path='/logout' element={<Logout />} />
          </Route>
          <Route path='/grape' element={<Grape />} />
          <Route path='/profile/:id' element={<Profile />} />

          <Route
            path='/login'
            element={
              <React.Suspense fallback='Loading...'>
                <LoginForm />
              </React.Suspense>
            }
          />

          <Route path='/login/:email/:id' element={<Otp />} />
          <Route path='/theme' element={<MyAwesomeThemeComponent />} />
          <Route path='/chat/*' element={<ChatRoutes />} />
          <Route path='/' element={<Chat />} />

          <Route path='/bar' element={<Notification />} />
          <Route path='/hero' element={<HeroWithPic />} />
          <Route path='/test' element={<Test />} />

          <Route path='*' element={<>404</>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default React.memo(App);
