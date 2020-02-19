FROM node:alpine
ENV PORT 8080
ENV MIDDLEWARE_EP="http://0.0.0.0:9000"
ADD package.json ./
ADD package-lock.json ./
RUN npm install
ADD index.js ./
EXPOSE ${PORT}/tcp
CMD [ "node", "index.js" ]
