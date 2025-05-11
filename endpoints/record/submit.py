from fastapi.responses import JSONResponse

from ..base import app
from database.models import Record
from database.models.record import CreateModel


@app.post('/api/record')
def submit_record(body: CreateModel) -> JSONResponse:
    Record.create(body)
    return JSONResponse({})
