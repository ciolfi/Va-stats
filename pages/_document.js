/* This file is used to modify the DOM structure
of the app. It plays a key role in allowing proper
function of the Student Registration confirmation modal */

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body>
				<Main />
				<NextScript />

				{/* MODAL WRAPPER BELOW: INSERTS A DOM NODE */}
				<div id="modal-root"></div>
			</body>
		</Html>
	);
}
