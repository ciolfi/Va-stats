// import '@/styles/globals.css';
import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

// POPUP CODE
import { Alert } from "../components/Alert";

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
	<SessionProvider session={session}>

		{/* POPUP CODE */}
		<div className='container'>
			<Alert />
			<Component {...pageProps} />
		</div>

		{/* <Component {...pageProps} /> */}
	</SessionProvider>
);

export default App;
