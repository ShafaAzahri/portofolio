#!/bin/sh
set -e

# Sync PostgreSQL schema with Prisma if AUTO_MIGRATE is enabled
if [ "$AUTO_MIGRATE" = "true" ]; then
  echo "[entrypoint] AUTO_MIGRATE is true. Syncing schema to PostgreSQL..."
  npx prisma db push --skip-generate || echo "[entrypoint] Warning: prisma db push failed, continuing startup..."
fi

exec "$@"
