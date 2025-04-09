import { createContext, useContext } from 'react'

export const ModalContext = createContext(null)

export function useModalContext() {
    const context = useContext(ModalContext)

    if (!context) {
        throw new Error('Modal components must be used within <Modal.Root>')
    }

    return context
}
