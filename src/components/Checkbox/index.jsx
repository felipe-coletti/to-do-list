import { useState } from 'react'
import styles from './styles.module.css'

export const Checkbox = ({ checked, onChange }) => {
	const [isChecked, setIsChecked] = useState(checked != null ? checked : false)

	const handleChange = () => {
		if (onChange != null) {
			onChange()
			checked != null && setIsChecked(!isChecked)
		} else {
			checked == null && setIsChecked(!isChecked)
		}
	}

	return (
		<label className={styles.label}>
			<input className={styles.input} type='checkbox' checked={isChecked} onChange={handleChange} />
			<span className={`${isChecked && styles.actived} ${styles.checkbox}`}></span>
		</label>
	)
}
