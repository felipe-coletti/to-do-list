import styles from './styles.module.css'

export const Box = ({ className, children }) => <div className={`${styles.box} ${className}`}>{children}</div>
