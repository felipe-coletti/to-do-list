import { useState } from 'react'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { useTasks } from '../../context/TaskContext'
import { ButtonGroup } from '../ButtonGroup'

export const DeleteTaskModal = ({ isOpen, onClose, taskId }) => {
    const { deleteTask } = useTasks()

    const handleDelete = () => {
        deleteTask(taskId)
        onClose()
    }

    return (
        <Modal.Root isOpen={isOpen} onClose={onClose}>
            <Modal.Title onClose={onClose}>Excluir tarefa</Modal.Title>
            <p className='paragraph'>Tem certeza de que deseja excluir essa tarefa?</p>
            <Modal.Footer>
                <ButtonGroup>
                    <Button variant='secondary' onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button onClick={handleDelete}>Excluir</Button>
                </ButtonGroup>
            </Modal.Footer>
        </Modal.Root>
    )
}
