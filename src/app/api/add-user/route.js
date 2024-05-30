import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userWalletAddress = searchParams.get('userWalletAddress');
    const protectedData = searchParams.get('protectedData');
    const platformName = searchParams.get('platformName');

    try {
        if (!userWalletAddress || !protectedData || !platformName) {
            throw new Error('All parameters are required');
        }

        await sql`
            INSERT INTO Providers (wallet_address, protected_data, platform)
            VALUES (${userWalletAddress}, ${protectedData}, ${platformName});
        `;

        const users = await sql`SELECT * FROM Users;`;
        return NextResponse.json({ users: users.rows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}