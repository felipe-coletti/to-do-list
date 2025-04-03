import { useState, useEffect } from 'react'
import './App.css'
import { Button } from './components/Button'
import { Checkbox } from './components/Checkbox'
import { Input } from './components/Input'
import { Icon } from '@iconify/react'

function App() {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('data')
        const initialValue = JSON.parse(saved)
        return initialValue || []
    })
    const [displayOrder, setDisplayOrder] = useState(() => {
        const savedOrder = localStorage.getItem('displayOrder')
        return savedOrder ? JSON.parse(savedOrder) : data.map((item) => item.id)
    })
    const [newTask, setNewTask] = useState('')
    const [selectedTask, setSelectedTask] = useState(null)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [filter, setFilter] = useState('all')

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('data', JSON.stringify(data))
            localStorage.setItem('displayOrder', JSON.stringify(displayOrder))
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [data, displayOrder])

    const handleCreate = () => {
        let newItem = {
            id: data.length > 0 ? data[data.length - 1].id + 1 : 0,
            status: false,
            title: newTask,
        }

        if (newTask.trim().length > 0) {
            setData((prevData) => [...prevData, newItem])
            setDisplayOrder((prevData) => [...prevData, newItem.id])
            setNewTask('')
        }
    }

    const handleMoveUp = (id) => {
        let index = displayOrder.indexOf(id)

        if (index > 0) {
            let newOrder = [...displayOrder]

            let temp = newOrder[index]
            newOrder[index] = newOrder[index - 1]
            newOrder[index - 1] = temp

            setDisplayOrder(newOrder)
        }
    }

    const handleMoveDown = (id) => {
        let index = displayOrder.indexOf(id)

        if (index < displayOrder.length - 1) {
            let newOrder = [...displayOrder]

            let temp = newOrder[index]
            newOrder[index] = newOrder[index + 1]
            newOrder[index + 1] = temp

            setDisplayOrder(newOrder)
        }
    }

    const handleEdit = (id) => {
        if (selectedTask === id) {
            let newData = [...data]

            newData[data.indexOf(data.find((item) => item.id === id))].title = newTaskTitle

            setData(newData)
            setSelectedTask(null)
            setNewTaskTitle('')
        } else {
            setNewTaskTitle(data[data.indexOf(data.find((item) => item.id === id))].title)
            setSelectedTask(id)
        }
    }

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Você tem certeza que deseja excluir esta tarefa?')

        if (confirmDelete) {
            setData((prevData) => prevData.filter((item) => item.id !== id))
            setDisplayOrder((prevData) => prevData.filter((item) => item !== id))
        }
    }

    const switchStatus = (id) => {
        let newData = [...data]

        newData[data.indexOf(data.find((item) => item.id === id))].status =
            !data[data.indexOf(data.find((item) => item.id === id))].status

        setData(newData)
    }

    const filteredDisplayOrder = displayOrder.filter((id) => {
        const item = data.find((task) => task.id === id)
        if (filter === 'completed') return item.status
        if (filter === 'pending') return !item.status
        return true
    })

    return (
        <div className='container'>
            <h1 className='primary-title'>To-do list</h1>
            <div className='content-area'>
                <div className='actions-area'>
                    <Input
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder='Qual é sua próxima tarefa?'
                    />
                    <Button variant='primary' onClick={handleCreate}>
                        Adicionar tarefa
                    </Button>
                </div>
                <div className='filter'>
                    <Button variant='secondary' active={filter === 'all'} onClick={() => setFilter('all')}>
                        Todas as tarefas
                    </Button>
                    <Button variant='secondary' active={filter === 'completed'} onClick={() => setFilter('completed')}>
                        Tarefas concluidas
                    </Button>
                    <Button variant='secondary' active={filter === 'pending'} onClick={() => setFilter('pending')}>
                        Tarefas não concluidas
                    </Button>
                </div>
                <h2 className='secondary-title'>
                    {filteredDisplayOrder.length} {filteredDisplayOrder.length === 1 ? 'tarefa' : 'tarefas'}
                </h2>
                <div className='table-container'>
                    <table className='table'>
                        <thead className='table-header'>
                            <tr>
                                <th className='table-item'></th>
                                <th className='table-item'>
                                    <h3 className='tertiary-title'>Status</h3>
                                </th>
                                <th className='table-item'>
                                    <h3 className='tertiary-title'>Tarefa</h3>
                                </th>
                                <th className='table-item'>
                                    <h3 className='tertiary-title'>Ações</h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {filteredDisplayOrder.map((id, i) => {
                                const item = data.find((task) => task.id === id)

                                if (!item) return null

                                return (
                                    <tr className='table-row' key={item.id}>
                                        <td className='table-item'>
                                            <div className='actions-area'>
                                                <Button
                                                    variant='secondary'
                                                    onClick={() => handleMoveUp(item.id)}
                                                    disabled={i === 0}
                                                >
                                                    <Icon icon='oui:arrow-up' />
                                                </Button>
                                                <Button
                                                    variant='secondary'
                                                    onClick={() => handleMoveDown(item.id)}
                                                    disabled={i === filteredDisplayOrder.length - 1}
                                                >
                                                    <Icon icon='oui:arrow-down' />
                                                </Button>
                                            </div>
                                        </td>
                                        <td className='table-item'>
                                            <div className='status-area'>
                                                <Checkbox
                                                    checked={item.status}
                                                    onChange={() => switchStatus(item.id)}
                                                />
                                            </div>
                                        </td>
                                        <td className='table-item'>
                                            {selectedTask === item.id ? (
                                                <Input
                                                    value={newTaskTitle}
                                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                                />
                                            ) : (
                                                <p className='paragraph'>{item.title}</p>
                                            )}
                                        </td>
                                        <td className='table-item'>
                                            <div className='actions-area'>
                                                <Button variant='secondary' onClick={() => handleEdit(item.id)}>
                                                    {selectedTask === item.id ? 'Salvar' : 'Editar'}
                                                </Button>
                                                <Button variant='secondary' onClick={() => handleDelete(item.id)}>
                                                    Excluir
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default App
