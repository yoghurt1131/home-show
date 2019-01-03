FROM node:10-slim

WORKDIR /app
ADD . /app

RUN groupadd -r display && useradd -r -g display display
RUN mkdir -p /home/display/.config && chown -R display:display /home/display && chown -R display:display /app

EXPOSE 3000
USER display
RUN npm install && npm rebuild node-sass
CMD ["npm", "start"]
