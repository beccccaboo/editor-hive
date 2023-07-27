import './App.scss';
import Editor from './Components/Editor/Editor.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { v4 as uuid } from "uuid"
import Home from './Components/home/Home';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import SignUpForm from './Components/Form/SignUpForm';
import SignInForm from './Components/Form/SignInForm';
import Landing from "./Components/Landing/Landing"
import NavBar from "./Components/NavBar/NavBar";
import {loadUser} from "./Store/Actions/Auth";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import Profile from "./Components/Profile/Profile";
import Footer from "./Components/Footer/Footer";

function App() {
    const dispatch = useDispatch()

    //To persist the current user
    useEffect(() =>{
        dispatch(loadUser())
    }, [dispatch])

  return (
    <Router>
        <ToastContainer/>
        <NavBar />
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<SignInForm />} />
            <Route path="/registration" element={<SignUpForm />} />
            <Route path='/home' element={<Home />} />
            <Route path='/new' element={<Navigate replace to={`/docs/${uuid()}`} />} />
            <Route path='/docs/:id' element={<Editor />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    </Router>
  );
}

export default App;
