import type { TextProps } from './Text.types'
import styles from './Text.module.css'

export const Text = ({ children }: TextProps) => <p className={styles.text}>{children}</p>
