import logo from './logo.svg';
import './App.css';
import Login from './app/Login';
import Root from './app/Root';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="ToDoList" element={<Root/>}>
    <Route path="login" element={<Login/>}/>
  </Route>
));

function App() {
  return (
      <RouterProvider router={router}/>
  );
}

export default App;
