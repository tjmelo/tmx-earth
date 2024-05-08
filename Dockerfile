FROM node:20-alpine

ENV TMX_PATH tmx-earth \
    TMX_NAME "TMX Earth"

LABEL name=${TMX_NAME}

LABEL description="Simple project to search for information in any country. Look for a certain country in the list and see all its information on screen."

WORKDIR /${TMX_PATH}

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
