import type { DeleteTaskModalProps } from './DeleteTaskModal.types'
import { Button } from '../Button'
import { ButtonGroup } from '../ButtonGroup'
import { Modal } from '../Modal'
import { Text } from '../Text'
import { useTasks } from '../../context/TaskContext'

export const DeleteTaskModal = ({ isOpen, onClose, taskId }: DeleteTaskModalProps) => {
	const { deleteTask } = useTasks()

	const handleDelete = () => {
		deleteTask(taskId)
		onClose()
	}

	return (
		<Modal.Root isOpen={isOpen} onClose={onClose}>
			<Modal.Title>Excluir tarefa</Modal.Title>
			<Text>Tem certeza de que deseja excluir essa tarefa?</Text>
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
