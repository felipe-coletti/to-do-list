import styles from './styles.module.css'

export const Button = ({ variant = 'primary', title, onClick, active, disabled = false, className, children }) => {
    let style

    switch (variant) {
        case 'primary':
            style = styles.primaryButton
            break
        case 'secondary':
            style = styles.secondaryButton
            break
        case 'ghost':
            style = styles.ghostButton
    }

    return (
        <button
            className={`${style} ${styles.button}${active ? ` ${styles.active}` : ''}
            ${className ? ` ${className}` : ''}`}
            title={title}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
