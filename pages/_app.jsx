// Mobile menu
// import Navbar from '../components/Navbar';

// For datepicker
// import "react-datepicker/dist/react-datepicker.css";

import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

// Below required for NextUI components
import * as React from "react";
import {NextUIProvider} from "@nextui-org/system";

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
	<NextUIProvider>
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>	
	</NextUIProvider>
);

export default App;
