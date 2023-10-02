import './App.css'
import {  Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { useContext, useEffect } from 'react'
import {  UserCredentialsContext } from './context-API/UserCredentialsContext'
import { Home } from './Pages/Home/Home'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Login } from './Pages/UserAuthetication/Login'
import { SignUp } from './Pages/UserAuthetication/SignUp'
import { ForgotPassword } from './Pages/UserAuthetication/ForgotPassword'
import { ResetPassword } from './Pages/UserAuthetication/ResetPassword'
import { CartPage } from './Pages/Cart/CartPage'
import { ShopContextProvider } from './context-API/ShopContext'
import { CheckoutPage } from './Pages/checkout/CheckoutPage'
import { TestPage } from './Pages/TestPage/TestPage'
import { tokenValidation } from './services/User APIs/authenticationApi'
import { AdminHome } from './Pages/AdminPage/AdminHome'
import { QuestionTable } from './Pages/AdminPage/QuestionTable'
import { adminTokenValidation, getTokenFromLocalStorage } from './services/Admin APIs/adminAuthAPI'

function App() {

  const navigate = useNavigate()

  const location = useLocation();

  // Check if the current route is /admin or a subroute of /admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  const { userCredential, setCredential } = useContext(UserCredentialsContext)

  const handlePageRefresh = async () => {
    // Check if user credentials exist in localStorage

    const userCredentialsString = localStorage.getItem('userCredentials');
    if (userCredentialsString) {
      const userCredentials = JSON.parse(userCredentialsString);
      const result = await tokenValidation(userCredentials)
      if (result.status === 200) {
        const userCredentials = {
          email: result?.data?.email,
          token: result?.data?.Newtoken
        };
        localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
        setCredential(userCredentials);
      } else {
        localStorage.removeItem('userCredentials');
        navigate("/login")
      }

    }
  }

  useEffect(() => {
    handlePageRefresh()
  }, []);

  return (
    <>

      <ShopContextProvider>
      {!isAdminRoute && <Navbar />}
        <Routes>
          {
            userCredential ? (
              <>
                <Route path='/' element={<Home />} />
                <Route path="/cartPage" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/test" element={<TestPage />} />
              </>
            ) : (
              <>
                <Route path='/' element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/admin/*" element={<AdminLayout />} />
              </>
            )
          }
        </Routes>
        {!isAdminRoute && <Footer />}
      </ShopContextProvider>

    </>
  )
}


function AdminLayout() {

  const navigate = useNavigate()
  const {  setisAdminLoggedIn } = useContext(UserCredentialsContext)

  const handleAdminPageRefresh = async () => {
    // Check if user credentials exist in localStorage

    const adminCredentialsString =await getTokenFromLocalStorage();

    if (adminCredentialsString) {
      const result = await adminTokenValidation()
      if (result.status === 200) {
        const adminCredentials = {
          email: result?.data?.adminemail,
          token: result?.data?.Newtoken
        };
        console.log("Admin Credentials",adminCredentials);
        localStorage.setItem('AdminCredentials', JSON.stringify(adminCredentials));
        setisAdminLoggedIn(adminCredentials);
      } else {
        localStorage.removeItem('AdminCredentials');
        navigate("/admin")
      }
    }
  }

  useEffect(() => {
    handleAdminPageRefresh()
  }, []);

  return (
    <>
      
      <Routes>
        <Route path="/" element={<AdminHome/>}/>
        <Route path='/questiontable' element={<QuestionTable/>}/>
      </Routes>
    </>
  );
}

export default App
