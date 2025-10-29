export interface ModalTitleProps {
	children: string
}

export interface ModalRootProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
}

export interface ModalFooterProps {
	children: React.ReactNode
}
