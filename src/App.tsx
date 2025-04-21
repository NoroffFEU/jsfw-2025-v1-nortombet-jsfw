import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Product from "./pages/Product";
import Homepage from "./pages/Homepage";
import Contact from "./pages/Contact";
import CheckoutDetails from "./pages/CheckoutDetails";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutOverview from "./pages/CheckoutOverview";
import Header from "./header/Header";
import Footer from "./footer/Footer";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout/" element={<CheckoutOverview />} />
          <Route path="/checkout/details/" element={<CheckoutDetails />} />
          <Route path="/checkout/success/" element={<CheckoutSuccess />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
