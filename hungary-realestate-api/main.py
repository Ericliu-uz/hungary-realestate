#!/usr/bin/python3

import uvicorn
from fastapi import FastAPI

app = FastAPI()

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000, reload=True, debug=True, workers=1)
