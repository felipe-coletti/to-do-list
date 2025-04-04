import { useState } from 'react'
import styles from './styles.module.css'
import { useTasks } from '../../context/TaskContext'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { CreateTaskModal } from '../CreateTaskModal'
import { UpdateTaskModal } from '../UpdateTaskModal'
import { DeleteTaskModal } from '../DeleteTaskModal'
import { Icon } from '@iconify/react'

export const TaskTable = ({ displayData }) => {
    const { getTaskById, toggleTaskStatus, moveTaskUp, moveTaskDown } = useTasks()

    const [action, setAction] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null)
    const [open, setOpen] = useState(false)

    const openModal = (action, taskId = null) => {
        setAction(action)
        setSelectedTask(taskId)
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
        setAction(null)
        setSelectedTask(null)
    }

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.tableItem}></th>
                        <th className={styles.tableItem}>Status</th>
                        <th className={styles.tableItem}>Tarefa</th>
                        <th className={styles.tableItem}>Ações</th>
                    </tr>
                </thead>
                <tbody className={styles.tableBody}>
                    {displayData.map((id, i) => {
                        const task = getTaskById(id)

                        if (!task) return null

                        return (
                            <tr className={styles.tableRow} key={task.id}>
                                <td className={styles.tableItem}>
                                    <Button variant='secondary' onClick={() => moveTaskUp(task.id)} disabled={i === 0}>
                                        <Icon icon='oui:arrow-up' />
                                    </Button>
                                    <Button
                                        variant='secondary'
                                        onClick={() => moveTaskDown(task.id)}
                                        disabled={i === displayData.length - 1}
                                    >
                                        <Icon icon='oui:arrow-down' />
                                    </Button>
                                </td>
                                <td className={styles.tableItem}>
                                    <Checkbox checked={task.status} onChange={() => toggleTaskStatus(task.id)} />
                                </td>
                                <td className={styles.tableItem}>
                                    <p className='paragraph'>{task.title}</p>
                                </td>
                                <td className={styles.tableItem}>
                                    <div className='actions-area'>
                                        <Button variant='secondary' onClick={() => openModal('update', task.id)}>
                                            Editar
                                        </Button>
                                        <Button variant='secondary' onClick={() => openModal('delete', task.id)}>
                                            Excluir
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Button className={styles.floatingActionButton} onClick={() => openModal('create')}>
                <Icon icon='ic:round-plus' />
            </Button>
            <CreateTaskModal isOpen={open && action === 'create'} onClose={closeModal} />
            <UpdateTaskModal isOpen={open && action === 'update'} onClose={closeModal} taskId={selectedTask} />
            <DeleteTaskModal isOpen={open && action === 'delete'} onClose={closeModal} taskId={selectedTask} />
        </>
    )
}
