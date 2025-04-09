import { useEffect } from 'react'
import styles from './styles.module.css'
import { ModalContext } from '../../context/ModalContext'

export const ModalRoot = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        if (isOpen) {
            const handleEsc = (event) => {
                if (event.key === 'Escape') {
                    onClose()
                }
            }

            window.addEventListener('keydown', handleEsc)

            return () => {
                window.removeEventListener('keydown', handleEsc)
            }
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.()
        }
    }

    return (
        <ModalContext.Provider value={{ onClose }}>
            <div className={styles.modalContainer}>
                <div className={styles.backdrop} onClick={handleOverlayClick}>
                    <div className={styles.modal}>{children}</div>
                </div>
            </div>
        </ModalContext.Provider>
    )
}
