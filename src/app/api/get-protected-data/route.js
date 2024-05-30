import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const platformName = searchParams.get('platformName');

    try {
        if (!platformName) {
            throw new Error('Platform name is required');
        }

        const result = await sql`
            SELECT protected_data, price
            FROM Providers
            WHERE platform = ${platformName};
        `;

        return NextResponse.json({ protectedData: result.rows }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}