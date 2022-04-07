import { Fragment } from "react";
import ReactDOM from 'react-dom';
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div onClick={props.onHideHanlder} className={classes.backdrop} />;
};

const ModalOVerlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
  return <Fragment>
      {ReactDOM.createPortal(<Backdrop onHideHanlder={props.onHideHanlder}/>, portalElement)}
      {ReactDOM.createPortal(<ModalOVerlay>{props.children}</ModalOVerlay>, portalElement)}
  </Fragment>
};

export default Modal;
