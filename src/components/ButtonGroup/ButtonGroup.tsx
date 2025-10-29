import type { ButtonGroupProps } from './ButtonGroup.types'
import styles from './ButtonGroup.module.css'

export const ButtonGroup = ({ children, direction = 'horizontal' }: ButtonGroupProps) => {
	return (
		<div className={styles.buttonGroup + (direction === 'vertical' ? ` ${styles.verticalButtonGroup}` : '')}>
			{children}
		</div>
	)
}
