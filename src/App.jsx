import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import WishList from "./Components/WishList/WishList";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./Context/AuthContext";
import CartContextProvider from "./Context/CartContext";
import WishListContextProvider from "./Context/WishListContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Details from "./Components/Details/Details";
import Cart from "./Components/Cart/Cart";
import Payment from "./Components/Payment/Payment";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import VerifyCode from "./Components/VerifyCode/VerifyCode";
import UserContextProvider from "./Context/UserContext";


function App() {

  const queryClient = new QueryClient()
  const myrouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout /> ,
      children: [
        { index:true, element: <ProtectedRoute><Home /></ProtectedRoute>},
        { path: "/home", element: <ProtectedRoute><Home /></ProtectedRoute>},
        { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},
        { path: "/wishList", element: <ProtectedRoute><WishList /></ProtectedRoute>},
        { path: "/products", element: <ProtectedRoute><Products /></ProtectedRoute>},       
        { path: "/categories", element: <ProtectedRoute><Categories /></ProtectedRoute>},
        { path: "/brands", element: <ProtectedRoute><Brands /></ProtectedRoute>},
        { path: "/details/:id", element: <ProtectedRoute><Details/></ProtectedRoute>},
        { path: "/payment", element: <ProtectedRoute><Payment/></ProtectedRoute>},
        {path: "forget-password",element: <ForgetPassword />},
        {path: "verify-code",element: <VerifyCode />},
        {path: "resetPassword",element: <ResetPassword />},
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ]
      }
  ]);
  return (
   <UserContextProvider>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <CartContextProvider>
      <WishListContextProvider>
      <Toaster />
      <RouterProvider router={myrouter} />
      </WishListContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
    </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;



//  const myrouter = createBrowserRouter([
//     {
//       path: "/",
//       element: <Layout /> ,
//       children: [
//         { path: "/home", element: <ProtectedRoute><Home /></ProtectedRoute>},
//         { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},
//         { path: "/wishList", element: <ProtectedRoute><WishList /></ProtectedRoute>},
//         { path: "/products", element: <ProtectedRoute><Products /></ProtectedRoute>},
//         { path: "/categories", element: <ProtectedRoute><Categories /></ProtectedRoute>},
//         { path: "/brands", element: <ProtectedRoute><Brands /></ProtectedRoute>},
//         { path: "/login", element: <Login /> },
//         { path: "/register", element: <Register /> },
//         { path: "*", element: <NotFound /> },
//       ],
//     },
//   ]);



// path: "/",
// element: <ProtectedRoute><Layout/></ProtectedRoute>,
// children: [
//   { path: "/", element: <Home/>},
//   { path: "/home", element: <Home/>},
//   { path: "/cart", element: <Cart/>},
//   { path: "/wishList", element: <WishList/>},
//   { path: "/products", element: <Products/>},
//   { path: "/categories", element: <Categories/>},
//   { path: "/brands", element: <Brands/>},
// ],
// },
// { path: "/login", element: <Login /> },
// { path: "/register", element: <Register /> },
// { path: "*", element: <NotFound /> },