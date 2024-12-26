import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function SingleProductPage() {
  const { id } = useParams(); // Extract the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch single product data
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return (
      <center>
        <p className="mt-3">Loading...</p>
      </center>
    );
  }

  return (
    <div className="container" style={{ padding: "20px" }}>
      <Link to="/products" className="btn btn-secondary mb-4">
        Back to Products
      </Link>
      <div className="row">
        {/* Product Image Section */}

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
        </div>

        {/* product details section */}
        <div className="col-md-6">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <br />
          <b>Price: $ {product.price}</b>

          <p>
            <br />
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </p>
        </div>
      </div>
    </div>
  );
}

export default SingleProductPage;
