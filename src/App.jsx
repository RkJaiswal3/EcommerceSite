import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Signup from "./components/SignUp";
import ProductPage from "./components/ProductPage";
import SingleProductPage from "./components/SingleProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/products" element={<ProductPage />}></Route>
        <Route
          path="/SingleProductpage/:id"
          element={<SingleProductPage />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
