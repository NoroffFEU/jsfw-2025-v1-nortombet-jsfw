import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Contact from "./pages/Contact";
import CheckoutDetails from "./pages/CheckoutDetails";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutOverview from "./pages/CheckoutOverview";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout/" element={<CheckoutOverview />} />
        <Route path="/checkout/details/" element={<CheckoutDetails />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
