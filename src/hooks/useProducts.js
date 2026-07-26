import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("API_URL:", API_URL);
console.log("Fetching:", `${API_URL}/products`);
        const res = await fetch(`${API_URL}/products`);

        if (!res.ok) {
          throw new Error("Failed to fetch");
        }

       const data = await res.json();

// Temporary delay for testing
await new Promise((resolve) => setTimeout(resolve, 2000));

setProducts(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export default useProducts;