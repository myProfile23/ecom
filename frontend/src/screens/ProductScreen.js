import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";
import styled from "styled-components";
import { addToCart } from "../actions/cartActions";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    dispatch(addToCart(productId, qty));
    document.getElementById("cart").classList.add("open");

    // props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };

  const show = (e) => {
    document.getElementById(e.target.id).classList.add("active");

    if (e.target.id === "1") {
      document.getElementById("2").classList.remove("active");
      document.getElementById("3").classList.remove("active");
      document.getElementById("attributes").style.display = "none";
      document.getElementById("description").style.display = "block";
      document.getElementById("reviews").style.display = "none";
    }

    if (e.target.id === "2") {
      document.getElementById("1").classList.remove("active");
      document.getElementById("3").classList.remove("active");
      document.getElementById("attributes").style.display = "table";
      document.getElementById("description").style.display = "none";
      document.getElementById("reviews").style.display = "none";
    }
    if (e.target.id === "3") {
      document.getElementById("2").classList.remove("active");
      document.getElementById("1").classList.remove("active");
      document.getElementById("reviews").style.display = "block";
      document.getElementById("description").style.display = "none";
      document.getElementById("attributes").style.display = "none";
    }
  };
  return (
    <ProductScreenStyled>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div>
            <div className="wrapper">
              <div className="left-content">
                <div>
                  <img src={product.image} alt={product.name}></img>
                </div>
              </div>
              <div className="right-content">
                <div className="details-description">
                  <ul>
                    <li>
                      <h1>{product.name}</h1>
                    </li>
                    <li>
                      <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                      ></Rating>
                    </li>
                    <li>${product.price}</li>
                    <li>
                      <p>
                        {product.description} <br />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="cart-container">
                    <ul>
                      {product.countInStock > 0 && (
                        <>
                          <li>
                            <div>
                              <div>Qty</div>
                              <div>
                                <select
                                  value={qty}
                                  onChange={(e) => setQty(e.target.value)}
                                >
                                  {[...Array(product.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </div>
                            </div>
                          </li>
                          <li>
                            <button
                              onClick={addToCartHandler}
                              className="primary block"
                            >
                              Add to Cart
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div className="additional-information">
                    <ul>
                      <li>SKU: DR-055-1</li>
                      <li>Category: Kid</li>
                      <li>Tags: Dress, Fashion, Furniture, Women</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="down-container">
            <div className="tap-top">
              <ul>
                <li id="1" onClick={(e) => show(e)} className="active">
                  Description
                </li>
                <li id="2" onClick={(e) => show(e)}>
                  Additional Information
                </li>
                <li id="3" onClick={(e) => show(e)}>
                  Reviews ({product.reviews.length})
                </li>
              </ul>
            </div>
            <div className="content">
              <div className="tab-pane">
                <div id="description">
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using ‘Content here, content here’, making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for ‘lorem ipsum’ will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                  </p>
                </div>
              </div>
              <div className="tab-pane">
                <table id="attributes">
                  <tbody>
                    <tr>
                      <th>Colors</th>
                      <td>
                        <p>
                          <a href="https://www.google.com" rel="tag">
                            Black
                          </a>
                          ,
                          <a href="https://www.google.com" rel="tag">
                            Red
                          </a>
                          ,
                          <a href="https://www.google.com" rel="tag">
                            Yellow
                          </a>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <th>Size</th>
                      <td>
                        <p>
                          <a href="https://www.google.com" rel="tag">
                            L
                          </a>
                          ,
                          <a href="https://www.google.com" rel="tag">
                            M
                          </a>
                          ,
                          <a href="https://www.google.com" rel="tag">
                            XXL
                          </a>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="tab-pane">
                <div id="reviews">
                  <ul>
                    <li>
                      {userInfo ? (
                        <form className="form" onSubmit={submitHandler}>
                          <div>
                            <h2>Write a customer review</h2>
                          </div>
                          <div>
                            <label htmlFor="rating">Rating</label>
                            <select
                              id="rating"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1- Poor</option>
                              <option value="2">2- Fair</option>
                              <option value="3">3- Good</option>
                              <option value="4">4- Very good</option>
                              <option value="5">5- Excelent</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="comment">Comment</label>
                            <textarea
                              id="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                          </div>
                          <div>
                            <label />
                            <button className="primary" type="submit">
                              Submit
                            </button>
                          </div>
                          <div>
                            {loadingReviewCreate && <LoadingBox></LoadingBox>}
                            {errorReviewCreate && (
                              <MessageBox variant="danger">
                                {errorReviewCreate}
                              </MessageBox>
                            )}
                          </div>
                        </form>
                      ) : (
                        <MessageBox>
                          Please <Link to="/signin">Sign In</Link> to write a
                          review
                        </MessageBox>
                      )}
                    </li>
                    <h2 id="reviews">Reviews</h2>
                    {product.reviews.length === 0 && (
                      <MessageBox>There is no review</MessageBox>
                    )}
                    {product.reviews.map((review) => (
                      <li key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating rating={review.rating} caption=" "></Rating>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProductScreenStyled>
  );
}

const ProductScreenStyled = styled.div`
  padding: 2rem;
  img {
    width: 50rem;
  }

  .active {
    font-weight: 500;
    color: #ff8000;
  }

  .wrapper {
    display: flex;
    justify-content: center;
    gap: 15rem;
    .right-content {
      width: 45%;

      .rating {
        margin-top: -1.5rem;
      }

      .cart-container {
        ul {
          display: flex;
          li:nth-child(2) {
            position: relative;
            bottom: -20px;
            width: 20rem;
            margin-left: 3rem;
          }
        }
      }
    }
  }
  .down-container {
    .tap-top {
      ul {
        display: flex;
        justify-content: center;
        gap: 10rem;
        padding: 2rem;

        li {
          cursor: pointer;
          :active {
            color: red;
          }
        }
      }
    }
    .content {
      width: 65%;
      margin: auto;

      #description {
        display: block;
      }

      #attributes {
        border: 0;
        border-top: 1px dotted rgba(0, 0, 0, 0.1);
        margin-bottom: 1.618em;
        width: 100%;
        display: none;
      }

      #reviews {
        display: none;
      }
    }
  }
`;
