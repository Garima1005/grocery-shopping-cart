import ProductsCard from '../components/ProductsCard'
import { products } from '../data/products'
import { BsCart3 } from "react-icons/bs";
import type { RootState } from '../store/index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalQuantity = cartItems?.length;

  const navigate = useNavigate();

  return (
    <div className='bg-slate-300 w-full max-h-fit min-h-screen flex justify-center'>
      <div className='bg-white w-2/4 flex flex-col max-h-fit m-4 p-4 rounded-sm mt-6'>
        <div className='flex justify-between mx-1 my-2'>
          <h1 className='text-2xl font-semibold'>Produts</h1>
          <span className='font-semibold mr-4 relative cursor-pointer' onClick={() => { navigate('/cart') }}>
            <span className='text-xs absolute -top-3 right-1 '>{totalQuantity}</span>
            <BsCart3 className='text-xl' />
          </span>
        </div>
        {products.length > 0 && products.map((product) => {
          return (
            <ProductsCard key={product.id} product={product} />
          )
        })}
      </div>
    </div>
  )
}

export default Products