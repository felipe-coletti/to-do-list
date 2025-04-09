import { useState } from 'react'
import styles from './styles.module.css'
import { useTasks } from '../../context/TaskContext'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { CreateTaskModal } from '../CreateTaskModal'
import { UpdateTaskModal } from '../UpdateTaskModal'
import { DeleteTaskModal } from '../DeleteTaskModal'
import { Icon } from '@iconify/react'
import { ButtonGroup } from '../ButtonGroup'
import { Dropdown } from '../Dropdown'

export const TaskTable = ({ data }) => {
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

    const actions = [
        {
            icon: <Icon className='icon' icon='material-symbols:edit' />,
            label: 'Editar',
            action: (taskId) => openModal('update', taskId),
        },
        {
            icon: <Icon className='icon' icon='material-symbols:delete' />,
            label: 'Excluir',
            action: (taskId) => openModal('delete', taskId),
        },
    ]

    return (
        <ul className={styles.taskList}>
            {data.map((id, i) => {
                const task = getTaskById(id)

                if (!task) return null

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
                        <Dropdown
                            options={actions.map((action) => ({
                                ...action,
                                action: () => action.action(task.id),
                            }))}
                            icon={<Icon className='icon' icon='mi:options-vertical' />}
                        />
                    </li>
                )
            })}
            <Button
                className={styles.floatingActionButton}
                onClick={() => openModal('create')}
                icon={<Icon className='icon' icon='ic:round-plus' />}
            />
            <CreateTaskModal isOpen={open && action === 'create'} onClose={closeModal} />
            <UpdateTaskModal isOpen={open && action === 'update'} onClose={closeModal} taskId={selectedTask} />
            <DeleteTaskModal isOpen={open && action === 'delete'} onClose={closeModal} taskId={selectedTask} />
        </ul>
    )
}
