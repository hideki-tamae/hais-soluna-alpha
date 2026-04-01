FROM node:18-alpine

WORKDIR /app

# パッケージのインストール
COPY package*.json ./
RUN npm install

# ソースコードのコピー
COPY . .

# Next.jsのビルド
RUN npm run build

# Hugging Face Spacesはデフォルトでポート7860を要求する
EXPOSE 7860
ENV PORT=7860
ENV HOST=0.0.0.0

# サーバー起動
CMD ["npm", "start"]
