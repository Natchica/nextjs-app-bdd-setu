import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const userWalletAddress = searchParams.get('userWalletAddress');
    const protectedData = searchParams.get('protectedData');
    const platformName = searchParams.get('platformName');
    const slot = searchParams.get('slot');
    const price = searchParams.get('price');

    try {
        if (!userWalletAddress || !protectedData || !platformName || !slot || !price) {
            throw new Error('All parameters are required');
        }

        await sql`
            INSERT INTO Providers (wallet_address, protected_data, platform, slot, price)
            VALUES (${userWalletAddress}, ${protectedData}, ${platformName}, ${slot}, ${price});
        `;

        const providers = await sql`SELECT * FROM Providers;`;
        return NextResponse.json({ providers: providers.rows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}