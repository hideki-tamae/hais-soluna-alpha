# Node.js 20を使用（EBADENGINE警告対策）
FROM node:20-alpine

# Prismaの動作に必要なライブラリをインストール
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# パッケージ定義とPrismaスキーマを先にコピー（これが重要）
COPY package*.json ./
COPY prisma ./prisma/

# 依存関係のインストール（ここで prisma generate も自動で走る）
RUN npm install

# 残りのソースコードをコピー
COPY . .

# Next.jsのビルド
RUN npm run build

# ポート設定
EXPOSE 7860
ENV PORT=7860
ENV HOST=0.0.0.0

# サーバー起動
CMD ["npm", "start"]
