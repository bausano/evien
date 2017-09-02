#!/bin/bash
output=$(npm test);

if echo "$output" | grep -q "failing"; then
    echo "$output";
else
  git push
fi
