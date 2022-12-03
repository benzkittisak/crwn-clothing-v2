import { useNavigate } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import "./category-preview.styles.scss";

const CategoryPreview = ({ products, title }) => {
  const navigate = useNavigate();

  const navigateHandler = (category) => {
    navigate(`${process.env.PUBLIC_URL}/shop/${category.toLowerCase()}`);
  }

  return (
    <div className="category-preview-container">
      <h2>
        <span onClick={() => navigateHandler(title.toUpperCase())} className="title">{title.toUpperCase()}</span>
      </h2>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
