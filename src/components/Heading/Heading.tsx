import type { HeadingProps } from './Heading.types'
import styles from './Heading.module.css'

export const Heading = ({ as: Tag, size = 'medium', children }: HeadingProps) => {
	let sizeStyle

	switch (size) {
		case 'medium':
			sizeStyle = styles.medium
			break
		case 'large':
			sizeStyle = styles.large
			break
		case 'xlarge':
			sizeStyle = styles.xlarge
	}

	return <Tag className={`${styles.heading} ${sizeStyle}`}>{children}</Tag>
}
