import styles from './styles.module.css'
import { Button } from '../Button'
import { Icon } from '@iconify/react'
import { useModalContext } from '../../context/ModalContext'

export const ModalTitle = ({ children }) => {
    const { onClose } = useModalContext()

    return (
        <div className={styles.modalHeader}>
            <h2 className='secondary-title'>{children}</h2>
            <Button variant='ghost' title='Fechar' onClick={onClose} icon={<Icon className='icon' icon='tabler:x' />} />
        </div>
    )
}
