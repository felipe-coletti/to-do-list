import { useState, useEffect } from 'react'
import { useTasks } from '../../context/TaskContext'
import { Button } from '../Button'
import { Input } from '../Input'
import { Modal } from '../Modal'

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
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className='secondary-title'>Editar Tarefa</h2>
            <Input label='Título' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <div className='actions-area'>
                <Button onClick={handleUpdate}>Salvar</Button>
            </div>
        </Modal>
    )
}
