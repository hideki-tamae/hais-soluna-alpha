import os
import psycopg2

DATABASE_URL = "postgresql://neondb_owner:npg_vwjp7OHEyxI3@ep-lucky-brook-anfsu908-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=30"

try:
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    cur.execute('SELECT * FROM "ScanHistory" ORDER BY "createdAt" DESC LIMIT 1')
    row = cur.fetchone()
    print(row)
    cur.close()
    conn.close()
except Exception as e:
    print(e)
