"use client";

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		})
	],
	secret: process.env.JWT_SECRET,
	// Adding callback to record the last login for a particular user
	callbacks: {
		async signIn({ user }) {
			try {
				// Call User API to get user data
				const userResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + `getuserdata`, {
					method: "Post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: user.email
					}),
				});

				const res = await userResponse.json();

				const result = res.users[0];

				 // Update user's last login to today's date
				await fetch(process.env.NEXT_PUBLIC_API_URL + `updateusers`, {
					method: "Post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						...result['0'], lastlogin: new Date(Date.now())
					}),
				});
				return true
			} catch (err) {
				return false
			}
		}
	}
};

export default NextAuth(authOptions);
