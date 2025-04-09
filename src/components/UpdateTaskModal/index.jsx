import { useState, useEffect } from 'react'
import { useTasks } from '../../context/TaskContext'
import { Button } from '../Button'
import { Input } from '../Input'
import { Modal } from '../Modal'
import { ButtonGroup } from '../ButtonGroup'

export const UpdateTaskModal = ({ isOpen, onClose, taskId }) => {
    const { getTaskById, updateTask } = useTasks()
    const task = getTaskById(taskId)

    const [newTitle, setNewTitle] = useState(task?.title || '')

    useEffect(() => {
        if (task) {
            setNewTitle(task.title)
        }
    }, [task])

    const handleUpdate = () => {
        if (newTitle.trim().length > 0) {
            updateTask(taskId, newTitle)
            onClose()
        }
    }

    return (
        <Modal.Root isOpen={isOpen} onClose={onClose}>
            <Modal.Title onClose={onClose}>Editar tarefa</Modal.Title>
            <Input label='Título' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant='secondary' onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleUpdate}>Salvar</Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal.Root>
    )
}
