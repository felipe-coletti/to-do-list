import type { IconProps } from './Icon.types'
import styles from './Icon.module.css'
import { Icon as IconifyIcon } from '@iconify/react'

export const Icon = ({ icon }: IconProps) => <IconifyIcon className={styles.icon} icon={icon} />
