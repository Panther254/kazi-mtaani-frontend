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



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:uidb64/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
