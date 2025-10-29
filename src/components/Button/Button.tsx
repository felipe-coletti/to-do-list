import type { ButtonProps } from './Button.types'
import styles from './Button.module.css'

export const Button = ({
	variant = 'primary',
	title,
	onClick,
	disabled = false,
	className,
	icon,
	iconPosition = 'left',
	children
}: ButtonProps) => {
	let variantStyle

	switch (variant) {
		case 'primary':
			variantStyle = styles.primaryButton
			break
		case 'secondary':
			variantStyle = styles.secondaryButton
			break
		case 'ghost':
			variantStyle = styles.ghostButton
	}

	const buttonStyles = `${variantStyle} ${children ? styles.textButton : ''} ${styles.button} ${
		className ? className : ''
	}`

	return (
		<button className={buttonStyles} title={title} onClick={onClick} disabled={disabled}>
			{iconPosition === 'left' && icon}
			{children}
			{iconPosition === 'right' && icon}
		</button>
	)
}
