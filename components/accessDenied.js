/*
BASED ON THIS TUTORIAL:
https://dev.to/ndom91/adding-authentication-to-an-existing-serverless-next-js-app-in-no-time-with-nextauth-js-192h

OAUTH INFO
- Authentication is handled in this page
- This is 1 of 3 pages involved in authentication:
  - /pages/_app.js
  - /pages/api/auth/[...nextauth].js
  - /components/accessDenied.js (this page)
- With OAuth, JWT Support is enabled by default for session handling

USERS
- Users, AKA, Project Managers (PMs) are stored in the Google API services section of the developer console: https://console.cloud.google.com. A Google developer account is required
- Eventually, users will be stored in the MySQL database, when MySQL is fully implemented, the user parent category will contain the following children with different levels of access: Admins, PMs

PROTECTED API ROUTE SAMPLE, e.g., studentreg.js

import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })

  if (session) {
    res.send({ content: 'This is protected content. You can access this content because you are signed in.' })
  } else {
    res.send({ error: 'You must be signed in to access this api route' })
  }
}


import { signIn } from 'next-auth/client';

export default function AccessDenied () {
	return (
		<>
			<h1>Access Denied</h1>
			<p>
				/{/*<a href="/api/auth/signin"
					onClick={(e) => {
						e.preventDefault();
						signIn();
					}}>You must be signed in to view this page</a> }
			</p>
		</>
	);
}
*/
