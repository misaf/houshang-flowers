# syntax=docker/dockerfile:1

ARG ALPINE_MIRROR=https://mirror.arvancloud.ir/alpine

FROM node:24-alpine AS base

ARG ALPINE_MIRROR
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

RUN sed -i "s|https://dl-cdn.alpinelinux.org/alpine|${ALPINE_MIRROR}|g" /etc/apk/repositories

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
ARG API_BASE_URL=https://vendra.test/v1
ARG STORAGE_BASE_URL=https://vendra.test
ARG NEXT_PUBLIC_API_BASE_URL=https://vendra.test/v1
ARG NEXT_PUBLIC_STORAGE_BASE_URL=https://vendra.test
# Public canonical origin used for SEO (canonical/hreflang/sitemap/OG/JSON-LD).
ARG NEXT_PUBLIC_SITE_URL=https://houshangflowers.com

ENV API_BASE_URL=$API_BASE_URL
ENV STORAGE_BASE_URL=$STORAGE_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_STORAGE_BASE_URL=$NEXT_PUBLIC_STORAGE_BASE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
RUN apk add --no-cache ca-certificates \
  && addgroup -S nextjs \
  && adduser -S nextjs -G nextjs

ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV API_BASE_URL=https://vendra.test/v1
ENV STORAGE_BASE_URL=https://vendra.test
ENV NEXT_PUBLIC_API_BASE_URL=https://vendra.test/v1
ENV NEXT_PUBLIC_STORAGE_BASE_URL=https://vendra.test
ENV NEXT_PUBLIC_SITE_URL=https://houshangflowers.com
ENV NODE_OPTIONS=--use-system-ca

COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
