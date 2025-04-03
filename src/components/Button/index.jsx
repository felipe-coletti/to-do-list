import styles from './styles.module.css'

export const Button = ({ variant = 'primary', onClick, active, disabled = false, children }) => {
    let style

    switch (variant) {
        case 'primary':
            style = styles.primaryButton
            break
        case 'secondary':
            style = styles.secondaryButton
    }

    return (
        <button
            className={`${style} ${styles.button}${active ? ` ${styles.active}` : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
