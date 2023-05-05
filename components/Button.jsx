import styles from '@/styles/Button.module.css';
import Image from 'next/image';

export default function Button({ text, onClick, iconSrc, isLight, style }) {
	let icon = <></>;
	let textClassName = '';
	const buttonClassName = isLight ? styles.genericButtonLight : styles.genericButtonDark;
	if (iconSrc) {
		const altText = `${text}-icon`;
		icon = <Image alt={altText} src={iconSrc} height={20} width={20} />;
		textClassName = styles.buttonText;
	}
	return(
		<button
			className={buttonClassName}
			onClick={onClick}
			style={style}
		>
			{icon}
			{text ? <span className={textClassName} style={style}>{text}</span>: <></>}
			
		</button>
	);
}