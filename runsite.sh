#!/bin/bash

(trap 'kill 0' SIGINT; (cd backend; python3 app.py) & (cd frontend; npm run dev))
