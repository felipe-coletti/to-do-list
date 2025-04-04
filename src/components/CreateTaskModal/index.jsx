import { useState } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { Modal } from '../Modal'
import { useTasks } from '../../context/TaskContext'

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
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className='secondary-title'>Adicionar Tarefa</h2>
            <Input label='Título' value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className='actions-area'>
                <Button onClick={handleAddTask}>Adicionar</Button>
            </div>
        </Modal>
    )
}
