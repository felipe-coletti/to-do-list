import styles from './styles.module.css'

export const ButtonGroup = ({ children, direction = 'horizontal' }) => {
    return (
        <div className={styles.buttonGroup + (direction === 'vertical' ? ` ${styles.verticalButtonGroup}` : '')}>
            {children}
        </div>
    )
}
