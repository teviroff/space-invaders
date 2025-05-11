from fastapi import Request
from fastapi.responses import HTMLResponse

from .base import (
    app,
    templates,
)


@app.get('/')
async def get_index(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(request, 'index.html')
