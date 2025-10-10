import styles from './styles.module.css'

export const Chip = ({ active = false, value, onClick, children }) => {
	return (
		<button
			type='button'
			className={`${styles.chip} ${active ? styles.active : ''}`}
			value={value}
			onClick={onClick}
		>
			{children}
		</button>
	)
}
