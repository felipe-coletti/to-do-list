import { useState, useEffect } from 'react'
import './App.css'
import Checkbox from './components/Checkbox'

function App() {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('data')
        const initialValue = JSON.parse(saved)
        return initialValue || []
    })
    const [newTask, setNewTask] = useState('')
    const [selectedTask, setSelectedTask] = useState(null)
    const [newTaskTitle, setNewTaskTitle] = useState('')

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('data', JSON.stringify(data))
        }
    
        window.addEventListener('beforeunload', handleBeforeUnload)
    
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [data])

    const handleCreate = () => {
        if (newTask.trim().length > 0) {
            setData((prevData) => [
                ...prevData,
                {
                    id: data.length > 0 ? data[data.length - 1].id + 1 : 0,
                    status: false,
                    title: newTask 
                }
            ])
            setNewTask('')
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
        }
    }

    const switchStatus = (id) => {
        let newData = [...data]

        newData[data.indexOf(data.find((item) => item.id === id))].status = !data[data.indexOf(data.find((item) => item.id === id))].status

        setData(newData)
    }

    return (
        <div className='container'>
            <h1 className='primary-title'>To-do list</h1>
            <div className='content-area'>
                <div className='actions-area'>
                    <input
                        className='input'
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder='Qual é sua próxima tarefa?'
                    />
                    <button className='primary-button' onClick={handleCreate}>
                        Adicionar tarefa
                    </button>
                </div>
                <h2 className='secondary-title'>
                    {data.length} {data.length === 1 ? 'tarefa' : 'tarefas'}
                </h2>
                <div className='table-container'>
                    <table className='table'>
                        <thead className='table-header'>
                            <tr>
                                <th className='table-item'>
                                    <h3 className='tertiary-title'>Status</h3>
                                </th>
                                <th className='table-item'>
                                    <h3 className='tertiary-title'>Nome</h3>
                                </th>
                                <th className='table-item'>
                                    <h3 className='tertiary-title'>Ações</h3>
                                </th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {data.map((item, i) => (
                                <tr className='table-row' key={item.id}>
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
                                            <input
                                                className='input'
                                                value={newTaskTitle}
                                                onChange={(e) => setNewTaskTitle(e.target.value)}
                                            />
                                        ) : (
                                            <p className='paragraph'>{item.title}</p>
                                        )}
                                    </td>
                                    <td className='table-item'>
                                        <div className='actions-area'>
                                            <button
                                                className='secondary-button'
                                                onClick={() => handleEdit(item.id)}
                                            >
                                                {selectedTask === item.id ? 'Salvar' : 'Editar'}
                                            </button>
                                            <button className='secondary-button' onClick={() => handleDelete(item.id)}>
                                                Excluir
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default App
