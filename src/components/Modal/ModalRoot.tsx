import { useEffect } from 'react'
import type { ModalRootProps } from './Modal.types'
import styles from './Modal.module.css'
import { ModalContext } from '../../context/ModalContext'
import { Box } from '../Box'

export const ModalRoot = ({ isOpen, onClose, children }: ModalRootProps) => {
	useEffect(() => {
		if (isOpen) {
			const handleEsc = (e: { key: string }) => {
				if (e.key === 'Escape') {
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

	const handleOverlayClick = (e: { target: any; currentTarget: any }) => {
		if (e.target === e.currentTarget) {
			onClose?.()
		}
	}

	return (
		<ModalContext.Provider value={{ onClose }}>
			<div className={styles.modalContainer}>
				<div className={styles.backdrop} onClick={handleOverlayClick}>
					<Box className={styles.modal}>{children}</Box>
				</div>
			</div>
		</ModalContext.Provider>
	)
}
