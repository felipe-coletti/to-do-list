import { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { useTasks } from '../../context/TaskContext'

export const DeleteTaskModal = ({ isOpen, onClose, taskId }) => {
    const { deleteTask } = useTasks()

    const handleDelete = () => {
        deleteTask(taskId)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className='secondary-title'>Remover tarefa</h2>
            <p className='paragraph'>Tem certeza de que deseja excluir essa tarefa?</p>
            <div className='actions-area'>
                <Button variant='secondary' onClick={onClose}>
                    Cancelar
                </Button>
                <Button onClick={handleDelete}>Remover</Button>
            </div>
        </Modal>
    )
}
