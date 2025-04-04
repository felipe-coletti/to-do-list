import { createContext, useContext, useState, useEffect } from 'react'

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        return JSON.parse(localStorage.getItem('data')) || []
    })

    const [displayOrder, setDisplayOrder] = useState(() => {
        return JSON.parse(localStorage.getItem('displayOrder')) || data.map((task) => task.id)
    })

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data))
        localStorage.setItem('displayOrder', JSON.stringify(displayOrder))
    }, [data, displayOrder])

    const getTaskById = (id) => data.find((task) => task.id === id)

    const addTask = (task) => {
        setData((prev) => [...prev, task])
        setDisplayOrder((prev) => [...prev, task.id])
    }

    const updateTask = (taskId, newTitle) => {
        setData((prev) => prev.map((task) => (task.id === taskId ? { ...task, title: newTitle } : task)))
    }

    const deleteTask = (taskId) => {
        setData((prev) => prev.filter((task) => task.id !== taskId))
        setDisplayOrder((prev) => prev.filter((id) => id !== taskId))
    }

    const toggleTaskStatus = (taskId) => {
        setData((prev) => prev.map((task) => (task.id === taskId ? { ...task, status: !task.status } : task)))
    }

    const moveTaskUp = (taskId) => {
        setDisplayOrder((prev) => {
            const index = prev.indexOf(taskId)
            if (index > 0) {
                const newOrder = [...prev]
                ;[newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]]
                return newOrder
            }
            return prev
        })
    }

    const moveTaskDown = (taskId) => {
        setDisplayOrder((prev) => {
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
                moveTaskDown,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export const useTasks = () => useContext(TaskContext)
