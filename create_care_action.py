import psycopg2
from datetime import datetime
DATABASE_URL = "postgresql://neondb_owner:npg_vwjp7OHEyxI3@ep-lucky-brook-anfsu908-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&connect_timeout=30"
try:
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    # Get the receiver user ID
    cur.execute('SELECT id FROM "User" WHERE "walletAddress" = %s LIMIT 1', ('0x1234567890abcdef1234567890abcdef12345678',))
    result = cur.fetchone()
    if not result:
        print("User not found")
        cur.close()
        conn.close()
        exit(1)
    
    receiver_id = result[0]
    
    # Create a CareAction
    cur.execute('''
        INSERT INTO "CareAction" (id, "receiverId", "actionType", description, "impactScore", "solunaAmount", status, "createdAt", "updatedAt")
        VALUES (gen_random_uuid(), %s, %s, %s, %s, %s, %s, NOW(), NOW())
        RETURNING id, "receiverId", "actionType", "solunaAmount", status, "createdAt"
    ''', (receiver_id, 'VOICE_SCAN', 'Genesis Transaction - Proof of CARE Minting', 8.5, 100.0, 'PENDING'))
    
    action = cur.fetchone()
    conn.commit()
    
    if action:
        print(f"CareAction created successfully!")
        print(f"ID: {action[0]}")
        print(f"Receiver ID: {action[1]}")
        print(f"Action Type: {action[2]}")
        print(f"SOLUNA Amount: {action[3]}")
        print(f"Status: {action[4]}")
        print(f"Created At: {action[5]}")
    
    cur.close()
    conn.close()
except Exception as e:
    print(f"Error: {e}")
