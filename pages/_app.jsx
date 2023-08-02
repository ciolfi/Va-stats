// Mobile menu
// import Navbar from '../components/Navbar';

// For datepicker
// import "react-datepicker/dist/react-datepicker.css";

import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
	<SessionProvider session={session}>
		<Component {...pageProps} />
	</SessionProvider>
);

export default App;
