import ProductCard from "./ProductCard";

const sampleProduct = {
  id: 1,
  title: "Premium Leather Watch",
  category: "Watches",
  price: 149,
  rating: 4.8,
  image: "https://picsum.photos/400/500?random=1",
};

export default {
  title: "Components/Product Card",
  component: ProductCard,
};

export const Default = () => (
  <div style={{ width: "350px", padding: "20px" }}>
    <ProductCard product={sampleProduct} />
  </div>
);