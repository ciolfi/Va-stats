// Mobile menu
// import Navbar from '../components/Navbar';

// For datepicker
// import "react-datepicker/dist/react-datepicker.css";

import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';

// Below required for NextUI components
import * as React from "react";

// if ("serviceWorker" in navigator) {
// 	navigator.serviceWorker.register("./public/sw.js");
// }

// Reg svc wkr
// useEffect(() => {
// 	if ('serviceWorker' in navigator) {
// 	  navigator.serviceWorker
// 		.register('/service-worker.js')
// 		.then((registration) => console.log('scope is: ', registration.scope));
// 	}
//   }, []);

// function registerSW() {
// 	if ('serviceWorker' in navigator) {
// 		navigator.serviceWorker.register('service-worker.js');
// 	}
// }

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
	<SessionProvider session={session}>
		<Component {...pageProps} />
	</SessionProvider>
);

export default App;
