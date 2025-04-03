import { useState } from 'react';
import products from '../../_data/products.json'
import ProductCard from './card/ProductCard';
import SearchBar from '../searchBar/SearchBar';

const Products = () => {
  const [searchText, setSearchText] = useState<string>('');

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="container">
      <div className='search-bar'>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      </div>
      <div className="products">
        {filteredProducts.map(product => {
          return (
            <ProductCard product={product} />
          )
        })}
      </div>
    </div>
  );
};

export default Products;