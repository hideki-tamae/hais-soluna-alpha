import psycopg2
DATABASE_URL = "postgresql://neondb_owner:npg_vwjp7OHEyxI3@ep-lucky-brook-anfsu908-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=30"
try:
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    wallet_address = "0x1234567890abcdef1234567890abcdef12345678"
    email = "test@example.com"
    password_hash = "hashedpassword"
    cur.execute(
        'INSERT INTO "User" (id, email, "passwordHash", "walletAddress", "baseAcesScore", role, "createdAt", "updatedAt") VALUES (gen_random_uuid(), %s, %s, %s, %s, %s, NOW(), NOW()) ON CONFLICT ("walletAddress") DO UPDATE SET email = EXCLUDED.email, "passwordHash" = EXCLUDED."passwordHash", "updatedAt" = NOW();',
        (email, password_hash, wallet_address, 4.0, 'EMPLOYEE')
    )
    conn.commit()
    print(f"User with walletAddress {wallet_address} inserted/updated.")
    cur.close()
    conn.close()
except Exception as e:
    print(e)
