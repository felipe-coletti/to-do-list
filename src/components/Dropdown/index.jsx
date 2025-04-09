import { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'
import { Button } from '../Button'

export const Dropdown = ({ options, icon, iconPosition, children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const dropdownRef = useRef()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (i) => {
        setIsOpen(false)

        if (typeof options[i].action === 'function') {
            options[i].action()
        }
    }

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <Button
                type='button'
                variant='ghost'
                onClick={() => setIsOpen(!isOpen)}
                icon={icon}
                iconPosition={iconPosition}
            >
                {children}
            </Button>
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
