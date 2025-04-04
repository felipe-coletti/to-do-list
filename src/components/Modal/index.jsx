import { useEffect } from 'react'
import styles from './styles.module.css'
import { Button } from '../Button'
import { Icon } from '@iconify/react'

export const Modal = ({ isOpen, onClose, children }) => {
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

    return (
        <div className={styles.modalContainer}>
            <div className={styles.container}>
                <div className={styles.backdrop} onClick={onClose}></div>
                <div className={styles.contentArea}>
                    <div className={styles.topArea}>
                        <Button variant='ghost' title='Fechar' onClick={onClose}>
                            <Icon icon='tabler:x' />
                        </Button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}
