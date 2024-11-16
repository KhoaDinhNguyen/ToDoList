import logo from './logo.svg';
import './App.css';
import Login from './app/Login';
import Root from './app/Root';
//import Authen from './app/Authen';
import SignUp from './app/SignUp';
import {User, UserHomePage} from './app/User';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import HomePage from './app/Homepage';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="ToDoList" element={<Root/>}>
    <Route path="homepage" element={<HomePage/>}>
      <Route path="login" element={<Login/>}/>
      <Route path="signup" element={<SignUp/>}/>
    </Route>
    <Route path="user" element={<User/>}>
      <Route path=":username" element={<UserHomePage/>}/>
    </Route>
  </Route>
));

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
