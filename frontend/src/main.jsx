import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Cart from './pages/Cart.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ProductPage from './pages/ProductPage.jsx'
import store from './store/store.js'
import SearchedProduct from './pages/SearchedProduct.jsx'
import ProductsPage from './pages/admin/ProductsPage.jsx'
import OrdersPage from './pages/admin/OrdersPage.jsx'
import CustomersPage from './pages/admin/CustomersPage.jsx'
import AdminPageLayout from './pages/admin/AdminPageLayout.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import SalesPage from './pages/admin/SalesPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import { ToastContainer, Slide } from 'react-toastify'
import EmailBody from './pages/EmailBody.jsx'
import SignupOtp from './pages/SignupOtp.jsx'
import ProfilePage from './pages/profile/ProfilePage.jsx'
import Personal from './pages/profile/Personal.jsx'
import Wishlist from './pages/profile/Wishlist.jsx'
import AddProductPage from './pages/admin/AddProductPage.jsx'
import SingleProductPage from './pages/admin/SingleProductPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      <Route path='/' element={<App />} >
        <Route path='' element={<HomePage />} />
        <Route path='/product/:productId' element={<ProductPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/search' element={<SearchedProduct />} />
        <Route path='/shop-by-category' element={<CategoryPage />} />
        
        <Route path='/profile/:userId' element={<ProfilePage />} >
          <Route path='' element={<Personal />} />
          <Route path='wishlist' element={<Wishlist />} />
        </Route>

        <Route path='/admin' element={<AdminPageLayout />}>
          <Route path='' element={<AdminDashboard />} />
          <Route path='all-products' element={<ProductsPage />} />
          <Route path='all-products/:productId' element={<SingleProductPage />} />
          <Route path='all-products/add-product' element={<AddProductPage />} />
          <Route path='sales' element={<SalesPage />} />
          <Route path='orders' element={<OrdersPage />} />
          <Route path='customers' element={<CustomersPage />} />
        </Route>

      </Route>


      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      {/* <Route path='/signup/otp-verification' element={<SignupOtp />} /> */}
      <Route path='/body' element={<EmailBody />} />

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        hideProgressBar
        position='top-center'
        autoClose={3000}
        pauseOnHover={false}
        transition={Slide}
        theme='dark' />
    </Provider>
  </StrictMode>,
)
