import React, { Fragment } from 'react'
import ReactDom from 'react-dom'
import { Backdrop } from './Loader'
import '../styles/modal.scss'


const Modal = ({ onClose, children }) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Fragment>
          <Backdrop onClose={onClose} />
          <div className='flex-center modal'>
            <button type='close' onClick={onClose}>
              X
            </button>
            <div className='content'>{children}</div>
          </div>
        </Fragment>,
        document.getElementById('modal-root')
      )}
    </Fragment>
  )
}

export default Modal
