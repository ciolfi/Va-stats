import Link from 'next/link';
const NavItem = ({ text, href, active }) => {
	
	return (
		(<Link 
			aria-current={active ? 'page' : undefined}
			href={href}
			className={`nav__item ${active ? 'active' : ''}`}>
			{text}
		</Link>)
	);
};
export default NavItem;
