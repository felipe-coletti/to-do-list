import { useState } from 'react'
import styles from './App.module.css'
import { Button } from './components/Button'
import { useTasks } from './context/TaskContext'
import { TaskTable } from './components/TaskTable'
import { Input } from './components/Input'

function App() {
    const { displayOrder, getTaskById } = useTasks()
    const [filter, setFilter] = useState('all')
    const [query, setQuery] = useState('')

    const filteredDisplayOrder = displayOrder
        .filter((id) => {
            const item = getTaskById(id)
            if (!item) return false
            if (filter === 'completed') return item.status
            if (filter === 'pending') return !item.status
            return true
        })
        .filter((id) => {
            const item = getTaskById(id)
            return item?.title.toLowerCase().includes(query.toLowerCase())
        })

    return (
        <div className={styles.container}>
            <h1 className={styles.primaryTitle}>To-Do List</h1>
            <div className={styles.contentArea}>
                <Input placeholder='Buscar' value={query} onChange={(e) => setQuery(e.target.value)} />
                <div className={styles.filter}>
                    {['all', 'completed', 'pending'].map((type) => (
                        <Button key={type} variant='secondary' active={filter === type} onClick={() => setFilter(type)}>
                            {type === 'all' ? 'Todas' : type === 'completed' ? 'Concluídas' : 'Não concluídas'}
                        </Button>
                    ))}
                </div>
                <h2 className='secondary-title'>
                    {filteredDisplayOrder.length} {filteredDisplayOrder.length === 1 ? 'tarefa' : 'tarefas'}
                </h2>
                <TaskTable data={filteredDisplayOrder} />
            </div>
        </div>
    )
}

export default App
