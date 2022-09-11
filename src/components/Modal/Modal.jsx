import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const Modal = ({ imgData, closeModal }) => {
    const handleOverlayClick = (evt) => {
        const overlay = evt.currentTarget;
        if (evt.target === overlay) {
            closeModal();
        }
    }
    useEffect(() => {
        const handleEcsapeKey = (evt) => {
            if (evt.key === "Escape") {
                closeModal();
            }
        }

        document.addEventListener("keydown", handleEcsapeKey);

        return () => {
            document.removeEventListener("keydown", handleEcsapeKey);
        }
    }, [closeModal])

        const { overlay, modal } = styles;
        
        const { src, alt } = imgData;

        return (
            <div className={overlay} onClick={handleOverlayClick}>
                <div className={modal}>
                    <img src={src} alt={alt} />
                </div>
            </div>
        )
    
}
Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    imgData: PropTypes.objectOf(PropTypes.string),
}
export default Modal;