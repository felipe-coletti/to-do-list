import { useState } from 'react'
import styles from './styles.module.css'

const Checkbox = ({ checked, onChange }) => {
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
            <input className={styles.input} type='checkbox' checked={isChecked} onChange={handleChange}/>
            <div className={isChecked ? styles.activedCheckbox : styles.disabledCheckbox}>
                <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512"><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7l233.4-233.3c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
            </div>
        </label>
    )
}

export default Checkbox