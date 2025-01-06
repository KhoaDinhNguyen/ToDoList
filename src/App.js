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
import UserCalendar from './app/user/UserCalender';
import PageNotFound from './app/homepage/PageNotFound';
import UserProfile from './app/user/UserProfile';
import ForgetPassword from './app/homepage/ForgetPassword';

const router = createHashRouter(createRoutesFromElements(
  <>
      <Route path="/" element={<Root/>}/>
      <Route path="homepage" element={<HomePage/>}>
        <Route path="aboutUs" element={<AboutUs/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signUp" element={<SignUp/>}/>
        <Route path="forgetPassword" element={<ForgetPassword/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Route>
      <Route path="user/:username" element={<User/>}>
        <Route path="homepage" element={<UserHomepage/>}/>
        <Route path="dashboard" element={<UserDashboard/>}/>
        <Route path="calendar" element={<UserCalendar/>}/>
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
