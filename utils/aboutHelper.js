import ImageCard from '@/components/ImageCard';
import aboutConfig from '@/configs/aboutPage.json';

export function generateTeamCards() {
	const memberCards = [];
	const membersData = aboutConfig.team.members;
	const baseImagePath = '/images/';
	membersData.map((memberData) => {
		memberCards.push(<ImageCard image={`${baseImagePath}${memberData.image}`} imageTitle={memberData.name} subTitle={memberData.role} description={memberData.description} />);
	});

	return memberCards;
}
