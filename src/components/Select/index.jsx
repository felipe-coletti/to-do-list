import { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'
import { Icon } from '@iconify/react'

export const Select = ({ options, defaultValue, placeholder = 'Selecione uma opção' }) => {
    const isValidIndex = (index) => index >= 0 && index < options.length

    const [selectedOption, setSelectedOption] = useState(isValidIndex(defaultValue) ? defaultValue : null)
    const [isOpen, setIsOpen] = useState(false)

    const selectRef = useRef()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (i) => {
        setSelectedOption(i)
        setIsOpen(false)

        if (typeof options[i].action === 'function') {
            options[i].action()
        }
    }

    const label = selectedOption !== null ? options[selectedOption].label : placeholder

    return (
        <div className={styles.dropdown} ref={selectRef}>
            <button type='button' className={styles.toggle} onClick={() => setIsOpen(!isOpen)}>
                {label}
                {isOpen ? (
                    <Icon className='icon' icon='oui:arrow-up' />
                ) : (
                    <Icon className='icon' icon='oui:arrow-down' />
                )}
            </button>
            {isOpen && (
                <div className={styles.menu}>
                    {options.map((option, i) => (
                        <button type='button' className={styles.option} onClick={() => handleSelect(i)} key={i}>
                            {option.icon && option.icon}
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
