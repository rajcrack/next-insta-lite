import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
export const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
        // ...add more providers here
    ],
    callbacks: {
        async session({ session, token }) {
            let userData: any = session.user ?? '';
            userData.username = session.user?.name?.split(' ').join('').toLocaleLowerCase();
            userData.uid = token.sub;
            session.user = userData;
            return session;
        }
    }
});
export { handler as GET, handler as POST };

