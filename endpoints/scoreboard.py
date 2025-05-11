from fastapi import Request
from fastapi.responses import HTMLResponse

from .base import (
    app,
    templates,
)


@app.get('/scoreboard')
async def get_scoreboard(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request, 'scoreboard.html')
