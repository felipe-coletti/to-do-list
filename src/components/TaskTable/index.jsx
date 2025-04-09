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

export const TaskTable = ({ data }) => {
    const { getTaskById, toggleTaskStatus, moveTaskUp, moveTaskDown } = useTasks()

    const [action, setAction] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null)
    const [open, setOpen] = useState(false)

    const openModal = (action, taskId = null) => {
        setAction(action)
        selectedTask != taskId && setSelectedTask(taskId)
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
        setAction(null)
        setSelectedTask(null)
    }

    return (
        <ul className={styles.taskList}>
            {data.map((id, i) => {
                const task = getTaskById(id)

                if (!task) return null

                return (
                    <li className={styles.task} key={task.id}>
                        <ButtonGroup direction='vertical'>
                            <Button variant='ghost' onClick={() => moveTaskUp(task.id)} disabled={i === 0}>
                                <Icon className='icon' icon='oui:arrow-up' />
                            </Button>
                            <Button
                                variant='ghost'
                                onClick={() => moveTaskDown(task.id)}
                                disabled={i === data.length - 1}
                            >
                                <Icon className='icon' icon='oui:arrow-down' />
                            </Button>
                        </ButtonGroup>
                        <Checkbox checked={task.status} onChange={() => toggleTaskStatus(task.id)} />
                        <p className='paragraph'>{task.title}</p>
                        <ButtonGroup>
                            <Button variant='ghost' onClick={() => openModal('update', task.id)}>
                                <Icon className='icon' icon='material-symbols:edit' />
                            </Button>
                            <Button variant='ghost' onClick={() => openModal('delete', task.id)}>
                                <Icon className='icon' icon='material-symbols:delete' />
                            </Button>
                        </ButtonGroup>
                    </li>
                )
            })}
            <Button className={styles.floatingActionButton} onClick={() => openModal('create')}>
                <Icon className='icon' icon='ic:round-plus' />
            </Button>
            <CreateTaskModal isOpen={open && action === 'create'} onClose={closeModal} />
            <UpdateTaskModal isOpen={open && action === 'update'} onClose={closeModal} taskId={selectedTask} />
            <DeleteTaskModal isOpen={open && action === 'delete'} onClose={closeModal} taskId={selectedTask} />
        </ul>
    )
}
