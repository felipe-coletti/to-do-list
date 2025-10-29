import { useState } from 'react'
import type { CreateTaskModalProps } from './CreateTaskModal.types'
import { Button } from '../Button'
import { Input } from '../Input'
import { Modal } from '../Modal'
import { useTasks } from '../../context/TaskContext'
import { ButtonGroup } from '../ButtonGroup'
import type { TaskType } from '../../types/task.types'

export const CreateTaskModal = ({ isOpen, onClose }: CreateTaskModalProps) => {
	const { addTask } = useTasks()
	const [title, setTitle] = useState('')

	const handleAddTask = () => {
		if (title.trim().length < 0) return

		const newTask: TaskType = {
			id: Date.now().toString(),
			title: title.trim(),
			status: false
		}

		addTask(newTask)
		setTitle('')
		onClose()
	}

	const handleClose = () => {
		setTitle('')
		onClose()
	}

	return (
		<Modal.Root isOpen={isOpen} onClose={handleClose}>
			<Modal.Title>Adicionar tarefa</Modal.Title>
			<Input label='Título' value={title} onChange={e => setTitle(e.target.value)} />
			<Modal.Footer>
				<ButtonGroup>
					<Button variant='secondary' onClick={handleClose}>
						Cancelar
					</Button>
					<Button onClick={handleAddTask}>Adicionar</Button>
				</ButtonGroup>
			</Modal.Footer>
		</Modal.Root>
	)
}
