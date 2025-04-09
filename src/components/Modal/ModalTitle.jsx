import styles from './styles.module.css'
import { Button } from '../Button'
import { Icon } from '@iconify/react'

export const ModalTitle = ({ children, onClose }) => {
    return (
        <div className={styles.modalHeader}>
            <h2 className='secondary-title'>{children}</h2>
            <Button variant='ghost' title='Fechar' onClick={onClose}>
                <Icon className='icon' icon='tabler:x' />
            </Button>
        </div>
    )
}
