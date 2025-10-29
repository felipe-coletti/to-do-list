import { createContext, useContext, useState, useEffect } from 'react'
import type { TaskType } from '../types/task.types'

interface TaskContextType {
	data: TaskType[]
	displayOrder: string[]
	getTaskById: (id: string) => TaskType | undefined
	addTask: (task: TaskType) => void
	updateTask: (taskId: string, newTitle: string) => void
	deleteTask: (taskId: string) => void
	toggleTaskStatus: (taskId: string) => void
	moveTaskUp: (taskId: string) => void
	moveTaskDown: (taskId: string) => void
}

const initialValue: TaskContextType = {
	data: [],
	displayOrder: [],
	getTaskById: () => undefined,
	addTask: () => {},
	updateTask: () => {},
	deleteTask: () => {},
	toggleTaskStatus: () => {},
	moveTaskUp: () => {},
	moveTaskDown: () => {}
}

const TaskContext = createContext<TaskContextType>(initialValue)

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
	const [data, setData] = useState<TaskType[]>(() => {
		try {
			const stored = localStorage.getItem('data')
			return stored ? JSON.parse(stored) : []
		} catch {
			return []
		}
	})

	const [displayOrder, setDisplayOrder] = useState<string[]>(() => {
		try {
			const stored = localStorage.getItem('displayOrder')
			return stored ? JSON.parse(stored) : []
		} catch {
			return []
		}
	})

	useEffect(() => {
		try {
			localStorage.setItem('data', JSON.stringify(data))
			localStorage.setItem('displayOrder', JSON.stringify(displayOrder))
		} catch (error) {
			console.error('Erro ao salvar no localStorage:', error)
		}
	}, [data, displayOrder])

	const getTaskById = (id: string) => data.find((task: TaskType) => task.id === id)

	const addTask = (task: TaskType) => {
		setData(prev => [...prev, task])
		setDisplayOrder(prev => [...prev, task.id])
	}

	const updateTask = (taskId: string, newTitle: string) => {
		setData((prev: TaskType[]) =>
			prev.map((task: TaskType) => (task.id === taskId ? { ...task, title: newTitle } : task))
		)
	}

	const deleteTask = (taskId: string) => {
		setData((prev: TaskType[]) => prev.filter((task: TaskType) => task.id !== taskId))
		setDisplayOrder((prev: string[]) => prev.filter(id => id !== taskId))
	}

	const toggleTaskStatus = (taskId: string) => {
		setData((prev: TaskType[]) =>
			prev.map((task: TaskType) => (task.id === taskId ? { ...task, status: !task.status } : task))
		)
	}

	const moveTaskUp = (taskId: string) => {
		setDisplayOrder((prev: string[]) => {
			const index = prev.indexOf(taskId)
			if (index > 0) {
				const newOrder = [...prev]
				;[newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]]
				return newOrder
			}
			return prev
		})
	}

	const moveTaskDown = (taskId: string) => {
		setDisplayOrder((prev: string[]) => {
			const index = prev.indexOf(taskId)
			if (index < prev.length - 1) {
				const newOrder = [...prev]
				;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
				return newOrder
			}
			return prev
		})
	}

	return (
		<TaskContext.Provider
			value={{
				data,
				displayOrder,
				getTaskById,
				addTask,
				updateTask,
				deleteTask,
				toggleTaskStatus,
				moveTaskUp,
				moveTaskDown
			}}
		>
			{children}
		</TaskContext.Provider>
	)
}

export const useTasks = () => {
	const context = useContext(TaskContext)
	if (!context) {
		throw new Error('useTasks deve ser usado dentro de um TaskProvider')
	}
	return context
}
