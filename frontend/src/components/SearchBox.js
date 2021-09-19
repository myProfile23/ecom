import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/name/${name}`);
  };

  const openSearch = () => {
    document.getElementById("box").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    document.body.style.overflowY = "hidden";
  };

  const closeSearch = () => {
    document.getElementById("box").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.body.style.overflowY = "visible";
  };
  useEffect(() => {
    return () => {
      document.getElementById("box").style.display = "none";
      document.getElementById("overlay").style.display = "none";
      document.body.style.overflowY = "visible";
    };
  }, [props]);
  return (
    <SearchBoxStyled>
      <div id="overlay"></div>
      <form className="search" onSubmit={submitHandler}>
        <div id="box">
          <div className="a">
            <CgClose size={55} className="x" onClick={closeSearch} />

            <input
              type="text"
              name="q"
              id="q"
              placeholder="Search"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
        </div>
      </form>
      <button onClick={openSearch} style={{ border: "none" }}>
        <BsSearch size={20} />
      </button>
    </SearchBoxStyled>
  );
}

const SearchBoxStyled = styled.div`
  button {
    color: #000000;
    background-color: transparent;
  }
  /* input {
    display: none;
  } */
  #overlay {
    width: 100%;
    height: 100%;
    background-color: black;
    position: absolute;
    left: 0;
    z-index: 3;
    opacity: 0.3;
    display: none;
  }
  .x {
    position: absolute;
    z-index: 123;
    right: 22%;
    top: 32%;
    color: white;
    transition: all 0.5s ease-in-out;

    :hover {
      cursor: pointer;
      transform: rotate(180deg);
      color: #ff8000;
    }
  }
  #box {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
    left: 0;
    z-index: 13;

    input {
      display: block;
      /* text-align: center; */
      margin: auto;
      width: 55%;
      margin-top: 22%;
      height: 3rem;
      font-size: 3rem;
      color: white;
      background-color: transparent;
      border-bottom: 0.75rem solid white;
      border-left: none;
      border-top: none;
      ::placeholder {
        color: white;
      }
      :focus {
        outline: none;
      }
      :hover {
        border-left: none;
        border-top: none;
      }
    }
  }
`;
