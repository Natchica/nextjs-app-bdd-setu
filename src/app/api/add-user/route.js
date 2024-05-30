import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userWalletAddress = searchParams.get('userWalletAddress');
    const platformName = searchParams.get('platformName');
    const protectedData = searchParams.get('protectedData');

    try {
        if (!userWalletAddress || !platformName || !protectedData) {
            throw new Error('All parameters are required');
        }

        await sql`
            INSERT INTO Users (wallet_address, platform, protected_data)
            VALUES (${userWalletAddress}, ${platformName}, ${protectedData});
        `;

        const users = await sql`SELECT * FROM Users;`;
        return NextResponse.json({ users: users.rows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}