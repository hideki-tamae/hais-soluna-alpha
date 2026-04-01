FROM node:20-alpine

# 依存ライブラリのインストール
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# パッケージとPrismaを先にコピー
COPY package*.json ./
COPY prisma ./prisma/

# 依存関係インストール（Prismaクライアント生成含む）
RUN npm install

# 全ソースコードをコピー
COPY . .

# =========================================================================
# 【幽霊ファイル生成部】
# ビルドエラーを回避するため、削除した画像や動画のダミー（0バイト）を生成する
# =========================================================================
RUN mkdir -p public/images public/docs public/teasers public/audit && \
    touch public/images/En0.png public/images/En1.png public/images/En2.png public/images/En3.png public/images/En4.png && \
    touch public/images/JP0.png public/images/JP1.png public/images/JP2.png public/images/JP3.png public/images/JP4.png public/images/JP5o-movie2.mp4 public/soluna_rnb.mp3

# Next.jsのビルド
RUN npm run build

# ポート設定
EXPOSE 7860
ENV PORT=7860
ENV HOST=0.0.0.0

# サーバー起動
CMD ["npm", "start"]
