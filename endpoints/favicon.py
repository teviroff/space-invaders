from fastapi.responses import FileResponse

from .base import app


@app.get('/favicon.ico')
async def get_favicon() -> FileResponse:
    return FileResponse('static/assets/favicon.png')
