# ===== App config =====

HOST: str = 'localhost'
PORT: int = 8001

from fastapi import FastAPI  # noqa: E402
from fastapi.staticfiles import StaticFiles  # noqa: E402

app = FastAPI()

app.mount('/static', StaticFiles(directory='static'), name='static')

# ===== Database config =====

from database import config as dbcfg  # noqa: E402


def connect_mongo_db(
    user: str, password: str, host: str, port: int, db_name: str, auth_db_name: str
) -> None:
    import mongoengine as mongo

    mongo.connect(
        host=f'mongodb://{user}:{password}@{host}:{port}/{db_name}?authSource={auth_db_name}'
    )


connect_mongo_db(
    user=dbcfg.MONGO_USERNAME,
    password=dbcfg.MONGO_PASSWORD,
    host=dbcfg.MONGO_HOST,
    port=dbcfg.MONGO_PORT,
    db_name=dbcfg.MONGO_DB_NAME,
    auth_db_name=dbcfg.MONGO_AUTH_DB_NAME,
)
