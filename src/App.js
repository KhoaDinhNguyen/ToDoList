import logo from './logo.svg';
import './App.css';
import Login from './app/Login';
import Root from './app/Root';
//import Authen from './app/Authen';
import SignUp from './app/SignUp';
import {User, UserHeader} from './app/User';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="ToDoList" element={<Root/>}>
    <Route path="login" element={<Login/>}/>
    <Route path="signup" element={<SignUp/>}/>
    <Route path="user" element={<UserHeader/>}>
      <Route path=":username" element={<User/>}/>
    </Route>
  </Route>
));

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
