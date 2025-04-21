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
    // Router wraps the entire app to enable routing
    <Router>
      {/* Toast message appearance */}
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

      {/* Header of website */}
      <Header />
      {/* Define all routes here */}
      <Routes>
        {/* Homepage route */}
        <Route path="/" element={<Homepage />} />

        {/* Product listing or individual product page */}
        <Route path="/product" element={<Product />} />

        {/* Contact page */}
        <Route path="/contact" element={<Contact />} />

        {/* Review page for products or feedback */}
        <Route path="/checkout/" element={<CheckoutOverview />} />

        {/* Details page for a specific item or product */}
        <Route path="/checkout/details/" element={<CheckoutDetails />} />

        {/* Success page shown after checkout or form submission */}
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
      </Routes>

      {/* Footer of website */}
      <Footer />
    </Router>
  );
}

export default App;
