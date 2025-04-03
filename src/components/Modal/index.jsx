import { useEffect } from 'react'
import styles from './styles.module.css'
import { Icon } from '@iconify/react'

export const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

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

    return (
        <div className={styles.modalContainer}>
            <div className={styles.container}>
                <div className={styles.backdrop} onClick={onClose}></div>
                <div className={styles.contentArea}>
                    <div className={styles.topArea}>
                        <button className={styles.button} title='Fechar' onClick={onClose}>
                            <Icon icon='tabler:x' />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}
