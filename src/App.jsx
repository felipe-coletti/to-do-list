import { useState, useEffect } from 'react'
import styles from './App.module.css'
import { useTasks } from './context/TaskContext'
import { Button, ButtonGroup, CreateTaskModal, Input, TaskList } from './components'
import { Icon } from '@iconify/react'

function App() {
    const { displayOrder, getTaskById } = useTasks()
    const [selectedFilter, setSelectedFilter] = useState('all')
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

        switch (selectedFilter) {
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
            value: 'all',
        },
        {
            label: 'Concluídas',
            value: 'completed',
        },
        {
            label: 'Pendentes',
            value: 'pending',
        },
    ]

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <header className={styles.header}>
                    <div className={styles.toolBar}>
                        <h1 className={styles.primaryTitle}>To-Do List</h1>
                        <Button
                            variant='ghost'
                            onClick={() => setOpen(true)}
                            icon={<Icon className='icon' icon='ic:round-plus' />}
                        />
                    </div>
                    <Input
                        placeholder='Buscar'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <ButtonGroup>
                        {filters.map((filter, i) => (
                            <button
                                className={`${selectedFilter === filter.value ? styles.active : ''} ${styles.chip}`}
                                onClick={() => setSelectedFilter(filter.value)}
                                key={i}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </ButtonGroup>
                </header>
                <TaskList data={filteredDisplayData} />
            </div>
            <CreateTaskModal isOpen={open} onClose={() => setOpen(false)} />
        </div>
    )
}

export default App
