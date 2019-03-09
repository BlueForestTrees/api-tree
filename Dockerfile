FROM node:alpine AS api-builder

RUN mkdir -p /build
COPY package.json ./build/
COPY package-lock.json ./build/
COPY src/ ./build/src

WORKDIR /build
RUN npm ci
RUN npm run build

FROM node:alpine
COPY --from=api-builder /build/package.json ./
COPY --from=api-builder /build/package-lock.json ./
COPY --from=api-builder /build/dist ./
COPY --from=api-builder /build/node_modules ./node_modules

EXPOSE 80
ENTRYPOINT ["npm","run","start"]