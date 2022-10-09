import './App.css';
import Home from './components/Home.js'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Profile from './components/Profile.js'
import  Login from './components/Login.js'
import  SignUp from './components/SignUp.js'
import ForgotPassword from './components/ForgotPassword.js'
import ResetPassword from './components/ResetPassword.js'
import Layout from './components/Layout.js'
import PrivateRoutes from './components/PrivateRoutes.js'



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Layout />} >
            <Route path="/" element={<Home />} exact />
            <Route element={<PrivateRoutes />} >
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:uidb64/:token" element={<ResetPassword />} />
          </Route>   
        </Routes>
      </Router>
    </div>
  );
}

export default App;
