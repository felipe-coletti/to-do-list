import styles from './styles.module.css'

export const Divider = (orientation = 'horizontal') => (
	<hr className={`${orientation == 'vertical' ? styles.vertical : styles.horizontal}`} />
)
