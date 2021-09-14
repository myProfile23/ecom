import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import carousel from "../images/carousel.png";
import carousel1 from "../images/carousel1.png";
import carousel2 from "../images/carousel2.png";
import carousel3 from "../images/carousel3.png";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);

  const renderProducts = () => {
    const tempArr = [];
    products.map(
      (product) => product.brand === "Adidas" && tempArr.push(product)
    );
    products.map(
      (product) => product.brand === "Puma" && tempArr.push(product)
    );
    return tempArr.map((product) => (
      <Product key={product._id} product={product}></Product>
    ));
  };
  const renderProducts1 = () => {
    const tempArr = [];
    products.map(
      (product) => product.category === "Pants" && tempArr.push(product)
    );
    products.map(
      (product) => product.category === "Joggers " && tempArr.push(product)
    );
    return tempArr.map((product) => (
      <Product key={product._id} product={product}></Product>
    ));
  };
  return (
    <HomeStyled>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {/* {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>} */}
          <Carousel
            showArrows
            showThumbs={false}
            emulateTouch
            infiniteLoop
            showStatus={false}
            transitionTime={1000}
            useKeyboardArrows
            className="carousel-container"
          >
            <>
              <div className="carousel1">
                <img src={carousel} alt={carousel} />
                {/* <p className="legend">{seller.seller.name}</p> */}
                <div className="text">
                  <p>discover lastest trend</p>
                  <h1>Wild collections & more</h1>
                  <button className="button">Shop now</button>
                </div>
              </div>
            </>
            <>
              <div className="carousel2">
                <img src={carousel2} alt={carousel2} className="left" />
                <img src={carousel3} alt={carousel3} />
                {/* <p className="legend">{seller.seller.name}</p> */}
                <div className="text">
                  <p>discover lastest trend</p>
                  <h1>Even clothes for every man</h1>
                  <button className="button">Shop now</button>
                </div>
              </div>
            </>
            <>
              <div className="carousel3">
                <img src={carousel1} alt={carousel1} />
                {/* <p className="legend">{seller.seller.name}</p> */}
                <div className="text">
                  <p>discover lastest trend</p>
                  <h1>Most colorful collection is here</h1>
                  <button className="button">Shop now</button>
                </div>
              </div>
            </>
          </Carousel>
        </>
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row-products">
            {products.slice(0, 4).map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
      <h2>Adidas & Puma</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row-products">{renderProducts()}</div>
        </>
      )}
      <h2>Pants & Joggers</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row-products">{renderProducts1()}</div>
        </>
      )}
    </HomeStyled>
  );
}

const HomeStyled = styled.div`
  .carousel-container {
    margin: -10px;
    height: 80vh;
    .carousel-slider {
      height: 100%;
    }
    h1 {
      font-family: "FontAwesome";
      font-size: 4.6rem;
    }
    .text {
      position: absolute;
    }

    p {
      text-transform: uppercase;
      font-size: 18px;
      line-height: 18px;
      font-weight: 400;
      color: rgb(17, 17, 17);
      font-family: Rubik;
      -webkit-letter-spacing: 4px;
      -moz-letter-spacing: 4px;
      -ms-letter-spacing: 4px;
      letter-spacing: 5px;
      margin: 0px;
    }
    img {
      position: relative;
    }
    .button {
      width: 20rem;
      background-color: #333333;
      color: white;
      text-transform: uppercase;
      border: none;
      transition: all 0.5s ease-in-out;
      &:hover {
        border: 1px solid #333333;
        color: #333333;
        background-color: white;
        transition: all 0.5s ease-in-out;
      }
    }

    .carousel1 {
      height: 80vh;
      background-color: #e0c8a5;

      img {
        top: 0;
        left: 30%;
      }
      .text {
        top: 20rem;
        left: 25rem;
      }
    }
    .carousel2 {
      height: 80vh;
      background-color: #e4d8b8;
      img {
        top: 0;
        left: 23%;
        height: 100%;
      }

      .left {
        left: -20%;
      }
      .text {
        top: 20rem;
        right: 50rem;
      }
    }

    .carousel3 {
      height: 80vh;
      background-color: #f7da92;
      img {
        top: 30px;
        right: 30%;
      }
      .text {
        top: 20rem;
        right: 25rem;
      }
    }

    .row center {
      justify-content: flex-start;
    }

    /* img {
      position: relative;
      top: 0;
      left: 30%;
    } */
  }
  .row-products {
    display: flex;
    justify-content: flex-start;
    column-gap: 4rem;
    padding: 1rem 8rem;
  }
`;
