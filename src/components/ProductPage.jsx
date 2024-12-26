import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    // Fetch API to get products
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login if not authenticated
    } else {
      fetch("https://fakestoreapi.com/products")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, []);

  return (
    <div className="container d-felx justify-content-center align-item-center">
      <button
        className="btn btn-primary mt-3"
        onClick={handleLogout}
        role="button"
      >
        Logout
      </button>

      <h1 className="mt-3" style={{ textAlign: "center" }}>
        Products List
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          padding: "10px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="card"
            style={{
              width: "18rem",
              border: "1px solid #ddd",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              className="card-img-top"
              alt={product.title}
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <b>Price: $ {product.price}</b>
              <br />
            </div>

            <Link
              to={`/SingleProductPage/${product.id}`}
              className="btn btn-primary"
              style={{ marginTop: "10px" }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
