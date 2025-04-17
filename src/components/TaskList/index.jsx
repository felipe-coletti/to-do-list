import { useState } from 'react'
import styles from './styles.module.css'
import { useTasks } from '../../context/TaskContext'
import { Button, ButtonGroup, Checkbox, DeleteTaskModal, UpdateTaskModal } from '../'
import { Icon } from '@iconify/react'

export const TaskList = ({ data }) => {
    const { getTaskById, toggleTaskStatus, moveTaskUp, moveTaskDown } = useTasks()

    const [action, setAction] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null)
    const [open, setOpen] = useState(false)

    const openModal = (action, taskId = null) => {
        setAction(action)
        if (selectedTask !== taskId) setSelectedTask(taskId)
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
        setAction(null)
        setSelectedTask(null)
    }

    return data.length > 0 ? (
        <ul className={styles.taskList}>
            {data.map((id, i) => {
                const task = getTaskById(id)

                return (
                    <li className={styles.task} key={task.id}>
                        <ButtonGroup direction='vertical'>
                            <Button
                                variant='ghost'
                                onClick={() => moveTaskUp(task.id)}
                                disabled={i === 0}
                                icon={<Icon className='icon' icon='oui:arrow-up' />}
                            />
                            <Button
                                variant='ghost'
                                onClick={() => moveTaskDown(task.id)}
                                disabled={i === data.length - 1}
                                icon={<Icon className='icon' icon='oui:arrow-down' />}
                            />
                        </ButtonGroup>
                        <Checkbox checked={task.status} onChange={() => toggleTaskStatus(task.id)} />
                        <p className='paragraph'>{task.title}</p>
                        <ButtonGroup>
                            <Button
                                variant='ghost'
                                onClick={() => openModal('update', task.id)}
                                icon={<Icon className='icon' icon='material-symbols:edit' />}
                            />
                            <Button
                                variant='ghost'
                                onClick={() => openModal('delete', task.id)}
                                icon={<Icon className='icon' icon='material-symbols:delete' />}
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
            <p className='paragraph'>Nenhuma tarefa encontrada</p>
        </div>
    )
}
