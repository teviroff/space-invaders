# Space Invaders

This repository contains a website (both backend & frontend) for frontend course at HSSE.
It contains my interpretation of arcade game "Space Invaders". If you want to play game, you can do it [here](http://192.168.8.2:8001) (although I'm not sure for how long I will keep this server alive).

## Deploying

In order to host a server with this website, you need to do your default server configuration (port exposure etc.), then run `pip install -r setup/requirements.txt` and `python app.py` on your server. Note that you must also provide credentials for MongoDB inside of `database/config.py`, in a form, which is present in `database/setup/config.py`.

## Compiling client

If you want to make changes to JS, that runs on a client you must have Node installed. To compile client you should do `cd client`, `npm install` and then `npm run build`. After that all compiled files will automatically be stored in server static directory (`static/scripts`).
