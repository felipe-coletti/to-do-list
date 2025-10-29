import type { ModalTitleProps } from './Modal.types'
import styles from './Modal.module.css'
import { useModalContext } from '../../context/ModalContext'
import { Button } from '../Button'
import { Heading } from '../Heading'
import { Icon } from '../Icon'

export const ModalTitle = ({ children }: ModalTitleProps) => {
	const { onClose } = useModalContext()

	return (
		<div className={styles.modalHeader}>
			<Heading as='h1' size='large'>
				{children}
			</Heading>
			<Button variant='secondary' title='Fechar' onClick={onClose} icon={<Icon icon='tabler:x' />} />
		</div>
	)
}
