#!/bin/bash
# Keeps Vite dev server alive - restarts if it dies
while true; do
  cd /home/z/my-project
  DISABLE_HMR=true VITE_CONFIG_NATIVE_IGNORE_WARNING=true npx vite --host 0.0.0.0 --port 3000 2>/tmp/vite-server.log
  echo "Vite died, restarting in 3s..."
  sleep 3
done
