import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import styled from "styled-components";

export default function Product(props) {
  const { product } = props;
  return (
    <CardStyled key={product._id} className="card">
      <div className="sale"> SALE!</div>
      <Link to={`/product/${product._id}`}>
        <div>
          <img className="medium" src={product.image} alt={product.name} />
        </div>
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <div className="price">${product.price}</div>

        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {/* {product.seller.seller?.name} */}
            </Link>
          </div>
        </div>
      </div>
    </CardStyled>
  );
}

const CardStyled = styled.div`
  height: 45rem;
  width: 27rem;
  position: relative;
  overflow: hidden;

  &:hover {
    img {
      transform: scale(1.2);
      overflow: hidden;
    }
  }

  div {
    overflow: hidden;
    img {
      height: 35rem;
      object-fit: cover;
      border-radius: 4px 4px 0 0;
      transition: transform 0.5s;
    }
  }

  .sale {
    background-color: black;
    color: white;
    display: block;
    position: absolute;
    height: 100px;
    width: 200px;
    left: -100px;
    top: -50px;
    transform: rotate(-45deg);
    line-height: 170px;
    text-align: center;
    z-index: 1;
    right: auto;
    overflow: hidden;
    text-shadow: 0 1px 1px rgb(0 0 0 / 60%);
    letter-spacing: 2.2px;
    font-family: "FontAwesome";
  }

  .card-body {
    padding: 0;
    text-align: center;
    h2 {
      padding: 0;
      color: #272727;
      margin: 1rem;
    }
    .price {
      font-size: 1.8rem;
      margin-bottom: 0.9rem;
    }
  }
`;
