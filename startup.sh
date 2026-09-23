#!/bin/sh
# Idempotent preview boot. Probe first so a running server is left alone.
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
cd /workspace
npm run dev
