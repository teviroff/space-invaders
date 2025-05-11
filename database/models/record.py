from typing import (
    Annotated,
    Any,
    Self,
)
from datetime import (
    UTC,
    datetime,
)

import mongoengine as mongo
import pydantic


class Record(mongo.Document):
    meta = {
        'collection': 'record',
    }

    USERNAME_REGEX = r'^[A-Za-z\d]{1,30}$'

    username = mongo.StringField(required=True)  # `regex=USERNAME_REGEX` ommited
    score = mongo.IntField(required=True)
    timestamp = mongo.DateTimeField(required=True, default=lambda: datetime.now(UTC))

    @classmethod
    def create(cls, model: 'CreateModel') -> Self:
        return Record(username=model.username, score=model.score).save()

    def to_dict(self) -> dict[str, Any]:
        return {
            'username': self.username,
            'score': self.score,
            'timestamp': str(self.timestamp),
        }


class CreateModel(pydantic.BaseModel):
    model_config = {
        'extra': 'ignore',
    }

    username: Annotated[str, pydantic.Field(pattern=Record.USERNAME_REGEX)]
    score: Annotated[int, pydantic.Field(ge=0)]
