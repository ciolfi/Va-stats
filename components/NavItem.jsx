import Link from 'next/link';
const NavItem = ({ text, href, active,description }) => {
	
	return (
		(<Link 
			aria-current={active ? 'page' : undefined}
			href={href}
			className={`nav__item ${active ? 'active' : ''}`}
			aria-label={description}>
			{text}
		</Link>)
	);
};
export default NavItem;
