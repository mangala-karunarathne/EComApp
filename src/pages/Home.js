import React, {useState, useEffect} from 'react';
import Sidenav from '../components/Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllProducts } from '../functions/products';
import ProductCard from '../components/ProductCard/ProductCard';
import ProductList from '../components/ProductList/ProductList';
import Sidebar from '../components/Navbar/Navbar';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const user = useSelector((state) => ({ ...state}));

  useEffect(() => {
    loadAllProducts();
    console.log("Products: ",products);
  }, []);

  const loadAllProducts = async () => {
    setLoading(true);
    try {
      const allProducts = await getAllProducts(10, user.token);
      console.log("All Products",allProducts);
      setProducts(allProducts.data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error loading products:', error);
      setLoading(false);
    }
  }
  return (
    <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <Sidebar />
          </div>
          
          <div className='col-md-10'>
            {/* <h4>Home Page</h4> */}
            {/* {JSON.stringify(products)} */}
            <ProductList products={products} />
          </div>
        </div>
    </div>
  )
}

export default Home
