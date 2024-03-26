import styles from '@/styles/Button.module.css';
import Image from 'next/image';

export default function Button({ text, onClick, iconSrc, isLight, style,courseName, batch }) {
	let icon = <></>;
	let textClassName = '';
	const buttonClassName = isLight ? styles.genericButtonLight : styles.genericButtonDark;
	if (iconSrc) {
		// const altText = `${text}-icon`; // Redundant for screen readers
		const altText = "";
		icon = <Image alt={altText} src={iconSrc} height={20} width={20} />;
		textClassName = styles.buttonText;
	}
	return(
		<button
			className={buttonClassName}
			onClick={onClick}
			style={style}
			aria-label={ text === 'Roster'? `${text} button to view attendance list for training of ${courseName} in batch ${batch}`: text}
		>
			{icon}
			{text ? <span className={textClassName} style={style}>{text}</span>: <></>}
		</button>
	);
}