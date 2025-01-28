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
        localStorage.setItem('data', JSON.stringify(data))
    }, [data])

    const handleCreate = () => {
        if (newTask.trim().length > 0) {
            setData((prevData) => [...prevData, { status: false, title: newTask }])
            setNewTask('')
        }
    }

    const handleEdit = (i, taskTitle) => {
        if (selectedTask === i) {
            let newData = [...data]

            newData[i].title = newTaskTitle

            setData(newData)
            setSelectedTask(null)
        } else {
            setNewTaskTitle(taskTitle)
            setSelectedTask(i)
        }
    }

    const handleDelete = (i) => {
        setData((prevData) => prevData.filter((item, j) => j != i))
    }

    const handleSaveStatus = (i, newStatus) => {
        let newData = [...data]

        newData[i].status = newStatus

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
                    {data.length} {data.length == 1 ? 'tarefa' : 'tarefas'}
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
                                <tr className='table-row' key={i}>
                                    <td className='table-item'>
                                        <div className='status-area'>
                                            <Checkbox
                                                checked={item.status}
                                                onChange={() => handleSaveStatus(i, !item.status)}
                                            />
                                        </div>
                                    </td>
                                    <td className='table-item'>
                                        {selectedTask === i ? (
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
                                                onClick={() => handleEdit(i, item.title)}
                                            >
                                                {selectedTask === i ? 'Salvar' : 'Editar'}
                                            </button>
                                            <button className='secondary-button' onClick={() => handleDelete(i)}>
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
