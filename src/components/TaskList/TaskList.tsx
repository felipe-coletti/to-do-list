import { useState } from 'react'
import type { ActionType, TaskListProps } from './TaskList.types'
import styles from './TaskList.module.css'
import { useTasks } from '../../context/TaskContext'
import type { Task } from '../../types/task.types'
import { Button } from '../Button'
import { ButtonGroup } from '../ButtonGroup'
import { Checkbox } from '../Checkbox'
import { Text } from '../Text'
import { Icon } from '../Icon'
import { UpdateTaskModal } from '../UpdateTaskModal'
import { DeleteTaskModal } from '../DeleteTaskModal'

export const TaskList = ({ data }: TaskListProps) => {
	const { getTaskById, toggleTaskStatus, moveTaskUp, moveTaskDown } = useTasks()

	const [action, setAction] = useState<ActionType>('')
	const [selectedTask, setSelectedTask] = useState<string>('')
	const [open, setOpen] = useState<boolean>(false)

	const openModal = (action: ActionType, taskId: string) => {
		setAction(action)
		if (selectedTask !== taskId) setSelectedTask(taskId)
		setOpen(true)
	}

	const closeModal = () => {
		setOpen(false)
		setAction('')
		setSelectedTask('')
	}

	return data.length > 0 ? (
		<ul className={styles.taskList}>
			{data.map((id, i) => {
				const task: Task = getTaskById(id)!

				return (
					<li className={styles.task} key={task.id}>
						<ButtonGroup direction='vertical'>
							<Button
								variant='secondary'
								onClick={() => moveTaskUp(task.id)}
								disabled={i === 0}
								icon={<Icon icon='oui:arrow-up' />}
							/>
							<Button
								variant='secondary'
								onClick={() => moveTaskDown(task.id)}
								disabled={i === data.length - 1}
								icon={<Icon icon='oui:arrow-down' />}
							/>
						</ButtonGroup>
						<Checkbox checked={task.status} onChange={() => toggleTaskStatus(task.id)} />
						<Text>{task.title}</Text>
						<ButtonGroup>
							<Button
								variant='secondary'
								onClick={() => openModal('update', task.id)}
								icon={<Icon icon='material-symbols:edit' />}
							/>
							<Button
								variant='secondary'
								onClick={() => openModal('delete', task.id)}
								icon={<Icon icon='material-symbols:delete' />}
							/>
						</ButtonGroup>
					</li>
				)
			})}

			<UpdateTaskModal isOpen={open && action === 'update'} onClose={closeModal} taskId={selectedTask} />
			<DeleteTaskModal isOpen={open && action === 'delete'} onClose={closeModal} taskId={selectedTask} />
		</ul>
	) : (
		<div className={styles.emptyList}>
			<Text>Nenhuma tarefa encontrada</Text>
		</div>
	)
}
