import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { useTasks } from './context/TaskContext'
import { TaskList } from './components/TaskList'
import { Input } from './components/Input'
import { Select } from './components/Select'
import { CreateTaskModal } from './components/CreateTaskModal'
import { Button } from './components/Button'
import { Icon } from '@iconify/react'

function App() {
    const { displayOrder, getTaskById } = useTasks()
    const [filter, setFilter] = useState('all')
    const [query, setQuery] = useState('')
    const [displayData, setDisplayData] = useState(displayOrder)
    const [open, setOpen] = useState(false)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch()
        }
    }

    const onSearch = () => {
        if (!query.trim()) {
            setDisplayData(displayOrder)
            return
        }

        const filtered = displayOrder.filter((id) => {
            const task = getTaskById(id)
            return task?.title.toLowerCase().includes(query.toLowerCase())
        })

        setDisplayData(filtered)
    }

    const filteredDisplayData = displayData.filter((id) => {
        const item = getTaskById(id)

        if (!item) return false

        switch (filter) {
            case 'completed':
                return item.status
            case 'pending':
                return !item.status
            default:
                return true
        }
    })

    useEffect(() => {
        if (query === '') {
            setDisplayData(displayOrder)
        }
    }, [query, displayOrder])

    const filters = [
        {
            label: 'Todas',
            action: () => setFilter('all'),
        },
        {
            label: 'Concluídas',
            action: () => setFilter('completed'),
        },
        {
            label: 'Pendentes',
            action: () => setFilter('pending'),
        },
    ]

    const getErrorMessage = (filter) => {
        switch (filter) {
            case 'all':
                return 'Você ainda não tem tarefas cadastradas'
            case 'completed':
                return 'Não há tarefas concluidas'
            case 'pending':
                return 'Não há tarefas pendentes'
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <h1 className={styles.primaryTitle}>To-Do List</h1>
                    <Input
                        placeholder='Buscar'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className={styles.toolBar}>
                        <h2 className='secondary-title'>
                            {filteredDisplayData.length} {filteredDisplayData.length === 1 ? 'tarefa' : 'tarefas'}
                        </h2>
                        <Select options={filters} defaultValue={0} />
                    </div>
                </header>
                {filteredDisplayData.length > 0 ? (
                    <TaskList data={filteredDisplayData} />
                ) : (
                    <div className={styles.emptyList}>
                        <p className='paragraph'>{getErrorMessage(filter)}</p>
                    </div>
                )}
            </div>
            <Button
                className={styles.floatingActionButton}
                onClick={() => setOpen(true)}
                icon={<Icon className='icon' icon='ic:round-plus' />}
            />
            <CreateTaskModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
    )
}

export default App
