from fastapi.responses import FileResponse

from .base import app


@app.get('/game')
async def get_game() -> FileResponse:
    return FileResponse('static/html/game.html')
