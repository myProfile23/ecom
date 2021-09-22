import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, NavLink, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./screens/MapScreen";
import DashboardScreen from "./screens/DashboardScreen";
// import SupportScreen from './screens/SupportScreen';
// import ChatBox from './components/ChatBox';
import { RiShoppingBasket2Line, RiLock2Line } from "react-icons/ri";
import styled from "styled-components";
import { addToCart, removeFromCart } from "./actions/cartActions";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import MenScreen from "./screens/MenScreen";
import WomenScreen from "./screens/WomenScreen";
require("typeface-rubik");

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [cartSidebarIsOpen, setCartSidebarIsOpen] = useState(false);

  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  return (
    <BrowserRouter>
      <AppStyled className="grid-container">
        useOutsideAlerter(wrapperRef);
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars" style={{ color: "black" }}></i>
            </button>
            <Link className="brand" to="/">
              Ecom
            </Link>
          </div>
          <div className="nav-items">
            <NavLink to="/search/men" activeClassName="active">
              Men
            </NavLink>
            <NavLink to="/search/women" activeClassName="active">
              Women
            </NavLink>
            <Link to="/">About</Link>
            <Link to="/">Contact</Link>
          </div>
          {/* <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div> */}
          <div style={{ display: "flex" }}>
            <Route
              style={{ marginTop: "0.4rem" }}
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
            <Link to="#">
              <RiShoppingBasket2Line
                size={25}
                onClick={() => setCartSidebarIsOpen(true)}
              />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown" style={{ margin: "auto" }}>
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">
                <RiLock2Line size={25} />
              </Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown" style={{ margin: "auto" }}>
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown" style={{ margin: "auto" }}>
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  {/* <li>
                    <Link to="/support">Support</Link>
                  </li> */}
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? "open" : ""}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <AiOutlineClose />
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <aside id="cart" className={cartSidebarIsOpen ? "open" : ""}>
          <ul className="cart">
            <li>
              <strong>Cart</strong>
              <button
                onClick={() =>
                  setCartSidebarIsOpen(false) ||
                  document.getElementById("cart").classList.remove("open")
                }
                className="close-sidebar"
                type="button"
              >
                <AiOutlineClose />
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : cartItems.length === 0 ? (
              <MessageBox>
                Cart is empty. <Link to="/">Go Shopping</Link>
              </MessageBox>
            ) : (
              <ul>
                {cartItems.map((item) => (
                  <li key={item.product} id="cart-list">
                    {/* <p>{console.log(cartItems)}</p> */}
                    <div className="cart-item">
                      <div>
                        <img src={item.image} alt={item.name}></img>
                      </div>
                      <div className="middle">
                        <div>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <p>
                          {item.qty} x ${item.price}
                        </p>
                      </div>
                      <div>
                        <button
                          className="remove-icon"
                          type="button"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <AiOutlineCloseCircle />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
                <h2>
                  Subtotal: $
                  {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h2>
                <div className="checkout-buttons">
                  <Link to="/cart">
                    <button
                      className="primary"
                      onClick={() =>
                        setCartSidebarIsOpen(false) ||
                        document.getElementById("cart").classList.remove("open")
                      }
                    >
                      View cart
                    </button>
                  </Link>
                  <Link to="/signin?redirect=shipping">
                    <button
                      className="primary"
                      onClick={() =>
                        setCartSidebarIsOpen(false) ||
                        document.getElementById("cart").classList.remove("open")
                      }
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
              </ul>
            )}
          </ul>
        </aside>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route path="/search/women/" component={WomenScreen} exact></Route>
          <Route
            path="/search/women/category/:category"
            component={WomenScreen}
            exact
          ></Route>
          <Route
            path="/search/women/category/:category/name/:name"
            component={WomenScreen}
            exact
          ></Route>
          <Route
            path="/search/women/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={WomenScreen}
            exact
          ></Route>
          <Route path="/search/men/" component={MenScreen} exact></Route>
          <Route
            path="/search/men/category/:category"
            component={MenScreen}
            exact
          ></Route>
          <Route
            path="/search/men/category/:category/name/:name"
            component={MenScreen}
            exact
          ></Route>
          <Route
            path="/search/men/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={MenScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          {/* <AdminRoute path="/support" component={SupportScreen}></AdminRoute> */}

          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          {/* {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />} */}
          <div>All right reserved</div>{" "}
        </footer>
      </AppStyled>
    </BrowserRouter>
  );
}

const AppStyled = styled.div`
  .nav-items {
    display: flex;
    justify-content: space-between;
    gap: 5rem;
    font-size: 2rem;
  }

  .active {
    font-weight: 500;
    color: #ff8000;
  }
  aside {
    background: white;
  }
  .close-sidebar {
    background: transparent;
    border: none;
    font-size: 2rem;
    svg {
      transition: transform 0.8s, opacity 0.25s;
      &:hover {
        transform: rotate(180deg);
        color: #ff8000;
      }
    }
  }

  #cart {
    svg {
      transition: transform 0.8s, opacity 0.25s;
      &:hover {
        transform: rotate(180deg);
        color: #ff8000;
      }
    }
    transform: translateX(150rem);
    width: 40rem;
    overflow-y: scroll;

    &.open {
      transform: translateX(110rem);
    }

    img {
      width: 12rem;
      height: 12rem;
    }

    #cart-list {
      justify-content: flex-start;
      .cart-item {
        display: flex;
        gap: 3rem;
      }
      .middle {
        min-width: 11rem;
      }
      .remove-icon {
        background: transparent;
        border: none;
        font-size: 2.4rem;
        padding: 0;
        margin-left: 2rem;
      }
    }
    h2 {
      text-align: center;
    }
    .checkout-buttons {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 5rem;
      button {
        width: 15rem;
      }
    }
  }
`;

export default App;
