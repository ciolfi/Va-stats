import styles from '@/styles/Title.module.css';

export default function Title(props) {
	const { title } = props;
	return (
		<span className={styles.titleSpan}>
			<h1>{title}</h1>
		</span>
	);
}