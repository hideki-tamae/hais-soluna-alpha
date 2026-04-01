FROM node:20-alpine

# 依存ライブラリのインストール
RUN apk add --no-cache openssl libc6-compat

WORKDIR /app

# パッケージとPrismaを先にコピー
COPY package*.json ./
COPY prisma ./prisma/

# 依存関係インストール
RUN npm install

# 全ソースコードをコピー
COPY . .

# =========================================================================
# 【有効なダミー資産生成部】
# 0バイトファイルではなく、有効な1x1透明PNGを流し込んでNext.jsのチェックを回避する
# =========================================================================
RUN mkdir -p public/images public/docs public/teasers public/audit && \
    export PNG_1X1="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" && \
    echo $PNG_1X1 | base64 -d > public/images/En0.png && \
    cp public/images/En0.png public/images/En1.png && \
    cp public/images/En0.png public/images/En2.png && \
    cp png public/images/JP1.png && \
    cp public/images/En0.png public/images/JP2.png && \
    cp public/images/En0.png public/images/JP3.png && \
    cp public/images/En0.png public/images/JP4.png && \
    cp public/images/En0.png public/images/JP5.png && \
    cp public/images/En0.png public/images/JP6.png && \
    cp public/images/En0.png public/aces-logo.png && \
    cp public/images/En0.png public/cyber-cross-logo.png && \
    cp public/images/En0.png public/logo.png && \
    cp public/images/En0.png public/og.png && \
    cp public/images/En0.png public/scan-demo.png && \
    touch public/header-bg.jpg public/3.mp4 public/9.mp4 public/hero-movie2.mp4 public/soluna_rnb.mp3

# Next.jsのビルド
RUN npm run build

# ポート設定
EXPOSE 7860
ENV PORT=7860
ENV HOST=0.0.0.0

# サーバー起動
CMD ["npm", "start"]
