import type { ModalFooterProps } from './Modal.types'
import styles from './Modal.module.css'

export const ModalFooter = ({ children }: ModalFooterProps) => {
	return <div className={styles.modalFooter}>{children}</div>
}
