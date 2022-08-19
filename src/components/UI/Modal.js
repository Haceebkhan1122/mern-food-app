import React from 'react';
import ReactDOM from 'react-dom';

const Backdrop = () => {
    return (
        <div className='backdrop'>
        </div>
    )
}

const ModalOverlay = (props) => {
    return (
        <div className='modal'>
            <div className='content'>
                {props.children}
            </div>
        </div>
    )
}


const Modal = (props) => {
    return (
        ReactDOM.createPortal(
            <div className='ui dimmer modals visible active'>
                <div className='ui standard modal visible active'>
                    <div className='content'>
                        <Backdrop />
                    </div>
                </div>
            </div>,
            document.querySelector('#overlays')
        ),
        ReactDOM.createPortal(
            <div onClick={props.onDismiss} className='ui dimmer modals visible active'>
                <div className='ui standard modal visible active'>
                    <div className='content'>
                        <ModalOverlay>{props.children}</ModalOverlay>
                    </div>
                </div>
            </div>,
            document.querySelector('#overlays')
        )
    )

}

export default Modal