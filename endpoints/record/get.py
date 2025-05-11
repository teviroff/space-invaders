from typing import Annotated
from enum import StrEnum

from fastapi.responses import JSONResponse
import pydantic

from ..base import app
from database.models import Record


class Sorting(StrEnum):
    SCORE_DESC = 'score_desc'
    SCORE_ASC = 'score_asc'
    DATE_DESC = 'date_desc'
    DATE_ASC = 'date_asc'


SORTING_TO_ARGS = {
    Sorting.SCORE_DESC: ('-score', '+timestamp'),
    Sorting.SCORE_ASC: ('+score', '+timestamp'),
    Sorting.DATE_DESC: ('-timestamp', '-score'),
    Sorting.DATE_ASC: ('+timestamp', '-score'),
}

RECORDS_PER_PAGE = 25


@app.get('/api/records')
def get_records(
    page: Annotated[int, pydantic.Field(ge=1)] = 1,
    sorting: Sorting = Sorting.SCORE_DESC,
) -> JSONResponse:
    records: list[Record] = Record.objects.order_by(*SORTING_TO_ARGS[sorting])[
        RECORDS_PER_PAGE * (page - 1) : RECORDS_PER_PAGE * page
    ]
    return JSONResponse([record.to_dict() for record in records])
