import type { BoxProps } from './Box.types'
import styles from './Box.module.css'

export const Box = ({ className, children }: BoxProps) => <div className={`${styles.box} ${className}`}>{children}</div>
