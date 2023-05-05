import Image from 'next/image';
import styles from '@/styles/ImageCard.module.css';

export default function ImageCard({ image, description, imageTitle, subTitle }) {
	const altText = `${imageTitle} image`;

	return(
		<div className={styles.flexCard}>
			<Image alt={altText} src={image} height={250} width={200} />
			<div className={styles.flexCardText}>
				<h3 className={styles.imageTitle}>{imageTitle}</h3>
				<p className={styles.imageSubTitle}>{subTitle}</p>
				<p>{description}</p>
			</div>
		</div>
	);
}