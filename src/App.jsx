
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import AddNews from "./pages/AddNews";
import Advertise from "./pages/Advertise";
import Header from "./components/header";
import Footer from "./components/Footer";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NewsPage from "./pages/NewsPage";
import UserLogin from "./pages/UserLogin";
import NewSport from "./pages/NewSport";
import NewWeather from "./pages/NewWeather";
import NewsDetails from './pages/NewDetails'
import NewUrgent from "./pages/NewUrgent";
import NewDisasters from "./pages/NewDisasters";
import NewHealth from "./pages/NewHealth";
import JournlistLogin from "./pages/JournlistLogin";
import JournlistSignUp from "./pages/JournlistSignUp";
import UserSignUp from "./pages/UserSignUp";
import ContactUs from "./pages/ContactUs";
import NewsList from "./pages/NewsList";
import VerificationPage from "./pages/VerificationPage";
import NewsPasswordPage from "./pages/NewPasswordPage ";
import Email from "./pages/Email";


import JournalistForgetPassword from "./pages/journalistForgetPassword";
import NewPasswordPage from "./pages/journalistCreateNewPassword";
import { SearchProvider } from "./components/contaextApi/searchContext";
import { RegionProvider } from "./components/contaextApi/RegionContext";
import EditNews from "./pages/EditNews";

// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation();
useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout Component
const Layout = ({ children }) => {
  const location = useLocation();
  const noHeaderFooterPages = [
    "/user-login",
    "/Journlist-login",
    "/journalist-signup",
    "/user-signup",
    "/verification",
    "/reset-password",
    "/email",
  ];

  const hideHeaderFooter = noHeaderFooterPages.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <div className="container">{children}</div>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
       <SearchProvider>
    <RegionProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<NewsPage />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/Urgent" element={<NewUrgent />} />
            <Route path="/Sport" element={<NewSport />} />
            <Route path="/weather" element={<NewWeather />} />
            <Route path="/disasters" element={<NewDisasters />} />
            <Route path="/health" element={<NewHealth />} />
            <Route path="/Journlist-login" element={<JournlistLogin />} />
            <Route path="/journalist-signup" element={<JournlistSignUp />} />
            <Route path="/user-signup" element={<UserSignUp />} />
            <Route path="/conect" element={<ContactUs />} />
            <Route path="/news-list" element={<NewsList />} />
            <Route path="/add-news" element={<AddNews />} />
            <Route path="/edit/:id" element={<EditNews />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route path="/email" element={<Email />} />
            <Route path="/reset-password/:token" element={<NewsPasswordPage />} />
            <Route path="/details/:id" element={<NewsDetails />} />
            <Route path="/journalist-forget-password" element={<JournalistForgetPassword />} />
  
            <Route path="/journalist/reset-password/:token" element={<NewPasswordPage />} />
          </Routes>
        </Layout>
      </Router>
    </RegionProvider>
    </SearchProvider>

  );
}

export default App;
