import styles from './styles.module.css'

export const Input = ({ value, onChange, placeholder }) => {
    return <input className={styles.input} value={value} onChange={onChange} placeholder={placeholder} />
}
