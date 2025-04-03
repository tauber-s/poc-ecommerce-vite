import { ProductCardProps } from "./ProductCard.props";
import { Link } from 'react-router';

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="card" key={product.id}>
      <img src={product.image} alt={product.title} />
      <div className="details">
        <span className="badge">★ {product.rating}</span>
        <h3>{product.title}</h3>
        <span className="price">$ {product.price}</span>
      </div>
      <div className="view">
        <Link to={`/product/${product.id}`}>View Product</Link>
      </div>

    </div>
  );
};

export default ProductCard;