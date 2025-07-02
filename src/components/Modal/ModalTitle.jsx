import styles from './styles.module.css'
import { Button } from '../Button'
import { Icon } from '@iconify/react'
import { useModalContext } from '../../context/ModalContext'
import { Heading } from '../Heading'

export const ModalTitle = ({ children }) => {
	const { onClose } = useModalContext()

	return (
		<div className={styles.modalHeader}>
			<Heading as='h1' size='large'>
				{children}
			</Heading>
			<Button variant='ghost' title='Fechar' onClick={onClose} icon={<Icon className='icon' icon='tabler:x' />} />
		</div>
	)
}
