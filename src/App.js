//import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Login from './app/homepage/Login';
import Root from './app/Root';
//import Authen from './app/Authen';
import SignUp from './app/homepage/SignUp';
import User from './app/user/User';
import UserHomepage from './app/user/UserHomepage';
import HomePage from './app/homepage/Homepage';
import AboutUs from './app/homepage/AboutUs';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="ToDoList" element={<Root/>}>
    <Route path="homepage" element={<HomePage/>}>
      <Route path="aboutUs" element={<AboutUs/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="signUp" element={<SignUp/>}/>
    </Route>
    <Route path="user" element={<User/>}>
      <Route path=":username" element={<UserHomepage/>}/>
    </Route>
  </Route>
));

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
