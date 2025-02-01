import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar/Navbar";
import MailList from "../components/mailList/MailList";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

export default function IndexPage() {
  // * get isAuthenticated redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Navbar />

      <div className="homeContainer">
        <Outlet />

        <MailList />
        <Footer />
      </div>
    </>
  );
}
