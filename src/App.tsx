import { useState, useEffect, type SetStateAction } from 'react'
import styles from './App.module.css'
import { useTasks } from './context/TaskContext'
import { Box, Button, ButtonGroup, Chip, CreateTaskModal, Divider, Heading, Icon, Input, TaskList } from './components'

export const App = () => {
	const { displayOrder, getTaskById } = useTasks()

	const [selectedFilter, setSelectedFilter] = useState('all')
	const [query, setQuery] = useState<string>('')
	const [displayData, setDisplayData] = useState(displayOrder)
	const [open, setOpen] = useState<boolean>(false)

	const handleKeyDown = (e: { key: string }) => {
		if (e.key === 'Enter' && onSearch) {
			onSearch()
		}
	}

	const onSearch = () => {
		if (!query.trim()) {
			setDisplayData(displayOrder)
			return
		}

		const filtered = displayOrder.filter(id => {
			const task = getTaskById(id)
			return task?.title.toLowerCase().includes(query.toLowerCase())
		})

		setDisplayData(filtered)
	}

	const filteredDisplayData = displayData.filter(id => {
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
			value: 'all'
		},
		{
			label: 'Concluídas',
			value: 'completed'
		},
		{
			label: 'Pendentes',
			value: 'pending'
		}
	]

	return (
		<div className={styles.container}>
			<Box className={styles.content}>
				<header className={styles.header}>
					<div className={styles.toolBar}>
						<Heading as='h1' size='xlarge'>
							To-Do List
						</Heading>
						<Button
							variant='secondary'
							onClick={() => setOpen(true)}
							icon={<Icon icon='ic:round-plus' />}
						/>
					</div>
					<Input
						label='Buscar'
						value={query}
						onChange={(e: { target: { value: SetStateAction<string> } }) => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<ButtonGroup>
						{filters.map((filter, i) => (
							<Chip
								active={selectedFilter === filter.value}
								value={filter.value}
								onClick={() => setSelectedFilter(filter.value)}
								key={i}
							>
								{filter.label}
							</Chip>
						))}
					</ButtonGroup>
				</header>
				<Divider />
				<TaskList data={filteredDisplayData} />
			</Box>
			<CreateTaskModal isOpen={open} onClose={() => setOpen(false)} />
		</div>
	)
}
