export interface InputProps {
	label?: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
	placeholder?: string
}
