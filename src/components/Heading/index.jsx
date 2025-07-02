import styles from './styles.module.css'

export const Heading = ({ as: Tag, size = 'medium', children }) => {
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
