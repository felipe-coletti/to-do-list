import styles from './styles.module.css'

export const Input = ({ label, value, onChange, placeholder }) => {
    return label ? (
        <label className={styles.label}>
            {label}
            <input className={styles.input} value={value} onChange={onChange} placeholder={placeholder} />
        </label>
    ) : (
        <input className={styles.input} value={value} onChange={onChange} placeholder={placeholder} />
    )
}
