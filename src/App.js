//import logo from './logo.svg';
import './App.css';
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Login from './app/homepage/Login';
import Root from './app/Root';
import SignUp from './app/homepage/SignUp';
import User from './app/user/User';
import UserHomepage from './app/user/UserHomepage';
import HomePage from './app/homepage/Homepage';
import AboutUs from './app/homepage/AboutUs';
import UserDashboard from './app/user/UserDashboard';
import UserCalender from './app/user/UserCalender';
import PageNotFound from './app/homepage/PageNotFound';
import UserProfile from './app/user/UserProfile';

const router = createHashRouter(createRoutesFromElements(
  <>
      <Route path="/" element={<Root/>}/>
      <Route path="homepage" element={<HomePage/>}>
        <Route path="aboutUs" element={<AboutUs/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signUp" element={<SignUp/>}/>
      </Route>
      <Route path="user/:username" element={<User/>}>
        <Route index element={<UserHomepage/>}/>
        <Route path="dashboard" element={<UserDashboard/>}/>
        <Route path="calender" element={<UserCalender/>}/>
        <Route path="aboutUs" element={<AboutUs/>}/>
        <Route path="profile" element={<UserProfile/>}/>
      </Route>
      <Route path="*" element={<PageNotFound/>}/>
  </>
));

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
