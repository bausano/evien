#!/bin/bash
output=$(npm test);

if echo "$output" | grep -q "failing"; then
    echo "Some of tests failed!";
else
  git push
fi
