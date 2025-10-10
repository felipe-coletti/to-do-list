import styles from './styles.module.css'
import { Icon as IconifyIcon } from '@iconify/react'

export const Icon = ({ icon }) => <IconifyIcon className={styles.icon} icon={icon} />
