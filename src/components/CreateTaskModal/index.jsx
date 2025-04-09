import { useState } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { Modal } from '../Modal'
import { useTasks } from '../../context/TaskContext'
import { ButtonGroup } from '../ButtonGroup'

export const CreateTaskModal = ({ isOpen, onClose }) => {
    const { addTask } = useTasks()
    const [title, setTitle] = useState('')

    const handleAddTask = () => {
        if (title.trim().length > 0) {
            addTask({ id: Date.now(), title, status: false })
            setTitle('')
            onClose()
        }
    }

    return (
        <Modal.Root isOpen={isOpen} onClose={onClose}>
            <Modal.Title>Adicionar tarefa</Modal.Title>
            <Input label='Título' value={title} onChange={(e) => setTitle(e.target.value)} />
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant='secondary' onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleAddTask}>Adicionar</Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal.Root>
    )
}
