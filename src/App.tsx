import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Products from './pages/Products'
import Cart from './pages/Carts'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Products/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
      </Routes>
    </Router>
  )
}

export default App