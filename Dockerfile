FROM node:20-alpine
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install && npm install sharp
COPY . .
RUN mkdir -p public/images public/docs public/teasers public/audit && \
    export PNG="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" && \
    echo $PNG | base64 -d > public/images/dummy.png && \
    for f in En0 En1 En2 En3 En4 JP0 JP1 JP2 JP3 JP4 JP5 JP6; do cp public/images/dummy.png public/images/${f}.png; done && \
    for f in aces-logo cyber-cross-logo logo og scan-demo; do cp public/images/dummy.png public/${f}.png; done && \
    touch public/header-bg.jpg public/3.mp4 public/9.mp4 public/hero-movie2.mp4 public/soluna_rnb.mp3
ENV NEXT_SHARP_PATH=/app/node_modules/sharp
RUN npm run build
EXPOSE 7860
ENV PORT=7860
ENV HOST=0.0.0.0
CMD ["npm", "start"]
