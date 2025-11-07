import Footer from "../boilerplate/Footer";
import { useLocation } from "react-router-dom";

export default function FooterLayout() {
  //if route is login or signup or forgot-password or verify-otp or  do not show footer in other cases show footer there is no need to pass children
  const location = useLocation();

  return (
    <>
      {location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/forgot-password" ||
      location.pathname === "/verify-otp" ||
      location.pathname === "/thankyou" ? null : (
        <Footer />
      )}
    </>
  );
}
