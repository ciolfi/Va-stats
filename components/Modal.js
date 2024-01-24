import React from "react";
import styles from "../styles/StudentReg.module.css";

const Modal = ({ toggleModal }) => {
  return (
    <div
      // className="modalcontainer"
      style={{
        border: "3px solid blue",
        color: "red",
        height: "8em",
        position: "absolute",
        top: "-5%",
        width: "20em"
      }}>
      <div
        className="modal"
        style={{
          border: "3px solid red",
        }}
      >
        {/* <div
          style={{
            border: "3px solid magenta",
            height: "100px",
            width: "auto"
          }}
        > */}
        <header
          style={{
            border: "3px solid black"
          }}
        >
          <div
            className="close"
            style={{
              border: "0px solid orange",
              float: "right",
              height: "auto"
            }}
          >
            <span className="close-btn" onClick={() => toggleModal(false)}>
              &times;
            </span>
          </div>
          <h1
            style={{
              border: "0px solid green"
            }}
          >
            Modal Title
          </h1>
        </header>
        <body
          style={{
            border: "3px solid yellow",
            // height: "4em"
          }}
        >
          <p
            style={{
              border: "0px solid yellow",
              height: "auto"
            }}
          >
            Modal content
          </p>
        </body>
        <footer
          style={{
            border: "3px solid green"
          }}
        >
          <button onClick={() => toggleModal(false)}>Close</button>
        </footer>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Modal;