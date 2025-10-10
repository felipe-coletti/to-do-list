import styles from './styles.module.css'

export const Input = ({ label, value, onChange, onKeyDown, placeholder }) => {
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
