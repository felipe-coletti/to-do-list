import type { DividerProps } from './Divider.types'
import styles from './Divider.module.css'

export const Divider = ({ orientation = 'horizontal' }: DividerProps) => (
	<hr className={`${orientation == 'vertical' ? styles.vertical : styles.horizontal}`} />
)
