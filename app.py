import uvicorn
import config

if __name__ == '__main__':
    uvicorn.run(config.app, host=config.HOST, port=config.PORT)
