import { useParams } from 'react-router';
import products from '@/_data/products.json'
import "./ProductView.css";
import Rating from '@/components/rating/Rating';
import ProductCard from '@/components/products/card/ProductCard';

const ProductView = () => {
  const { id } = useParams();
  const currentProduct = products.find(prod => prod.id === parseInt(id!));

  if (!currentProduct) {
    return <h2>Product not found</h2>;
  }

  /**
   * filtra por produtos com a mesma categoria
   * exclui o produto atual
   * ordena pelo id mais recente e pela melhor avaliação
   * pega os 5 primeiros resultados
   */
  const productsRecommendation = products
    .filter(product => product.category === currentProduct.category && product.id !== currentProduct.id)
    .sort((a, b) => b.id - a.id)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <div className="container">
      <div className="flex-container">
        <div className="grow-3">
          <img src={currentProduct.image} alt={currentProduct.title} />
        </div>
        <div className="grow-5">
          <h2>{currentProduct.title}</h2>
          <div className='rating-info'>
            <span className="category">{currentProduct.category}</span>
            <Rating rating={currentProduct.rating} ratingCount={currentProduct.ratingCount} />
          </div>
          <p className='description'>{currentProduct.description}</p>
          <span className="price">$ {currentProduct.price}</span>
        </div>
      </div>

      <br />
      <div className='recommendation'>
        <h2>Recommended Products</h2>
        <div className="products">
          {productsRecommendation.map(product => {
            return (
              <ProductCard product={product} />
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductView;