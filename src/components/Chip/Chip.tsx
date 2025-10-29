import type { ChipProps } from './Chip.types'
import styles from './Chip.module.css'

export const Chip = ({ active = false, value, onClick, children }: ChipProps) => {
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
