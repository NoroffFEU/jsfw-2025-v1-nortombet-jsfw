import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Contact from "./pages/Contact";
import About from "./pages/about";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CheckoutLayout from "./components/layout/CheckoutLayout";
import CartOverview from "./pages/CheckoutOverview";
import CheckoutDetails from "./pages/CheckoutPaymentDetails";
import CheckoutSuccess from "./pages/CheckoutSuccess";

function App() {
  return (
    <>
      <Header />
      <ToastContainer closeOnClick style={{ top: "80px" }} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<Product />} />
        <Route element={<CheckoutLayout />}>
          <Route path="/cart/" element={<CartOverview />} />
          <Route path="/checkout/details" element={<CheckoutDetails />} />
          <Route path="/checkout/success/:orderNumber" element={<CheckoutSuccess />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
