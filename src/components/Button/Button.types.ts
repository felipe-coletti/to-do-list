export interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'ghost'
	title?: string
	onClick?: () => void
	disabled?: boolean
	className?: string
	icon?: React.ReactNode
	iconPosition?: 'left' | 'right'
	children?: React.ReactNode
}
