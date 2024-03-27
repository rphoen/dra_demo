// // app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import users from "@/data/users.json";
// import type { User } from "../../../../types";

// export const authOptions = {
//   providers: [
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { username, password } = credentials

//         // Find the user in the users.json file
//         const user = users.find(
//           (user) =>
//             user.username === username && user.password === password
//         );

//         if (user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user as any;
//         } else {
//           // If you return null then an error will be displayed advising the user to check their details.
//           return null;
//           // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: any) {
//       // Add the user role to the token
//       if (user) {
//         token.role = (user).role;
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       // Add the user role to the session
//       if (token) {
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

export {auth, signIn, signOut, GET, POST} from "@/auth"