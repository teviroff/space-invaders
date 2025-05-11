from fastapi import Request
from fastapi.responses import HTMLResponse

from .base import (
    app,
    templates,
)


@app.get('/game')
async def get_game(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request, 'game.html')
