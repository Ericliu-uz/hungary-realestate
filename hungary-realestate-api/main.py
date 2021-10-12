#!/usr/bin/python3

import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from sqlalchemy import func
from starlette.middleware.cors import CORSMiddleware


from auth.token_auth import app06
from api.properties import app01
from api.user import app02


app = FastAPI(
    title='Rental Services',
    description='none',
    version='1.0.0',
    docs_url='/docs',
    redoc_url='/redocs',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1",
        "http://localhost:3000",
        "http://127.0.0.1:8080"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(app06, prefix='/auth', tags=['User Authentication & Login'])
app.include_router(app01, prefix='/api', tags=['Properties'])
app.include_router(app02, prefix='/api', tags=['Users'])

#
# @app.get("/")
# async def root():
#     return {"message": "Hello World"}

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True, debug=True, workers=1)
