import React from 'react'
import { createRoot } from 'react-dom/client'
import { TaskProvider } from './context/TaskContext'
import { App } from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<TaskProvider>
			<App />
		</TaskProvider>
	</React.StrictMode>
)
