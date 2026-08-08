#!/bin/bash
cd /home/z/my-project
export DISABLE_HMR=true
export VITE_CONFIG_NATIVE_IGNORE_WARNING=true
exec bun vite --host=0.0.0.0 2>&1 | tee dev.log
