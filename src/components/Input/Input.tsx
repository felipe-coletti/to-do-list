import type { InputProps } from './Input.types'
import styles from './Input.module.css'

export const Input = ({ label, value, onChange, onKeyDown, placeholder }: InputProps) => {
	return label ? (
		<label className={styles.label}>
			{label}
			<input className={styles.input} value={value} onChange={onChange} onKeyDown={onKeyDown} />
		</label>
	) : (
		<input
			className={styles.input}
			value={value}
			onChange={onChange}
			onKeyDown={onKeyDown}
			placeholder={placeholder}
		/>
	)
}
