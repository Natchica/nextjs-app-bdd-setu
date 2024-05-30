import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const result =
            await sql`
                CREATE TABLE IF NOT EXISTS Providers (
                    wallet_address char(42),
                    protected_data varchar(255),
                    platform varchar(255),
                    slot integer,
                    price float8
                )
                CREATE TABLE IF NOT EXISTS Users (
                    wallet_address char(42),
                    protected_data varchar(255),
                    platform varchar(255),
                );
        `;
            return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}
