FROM node:alpine
ENV TODAY_SERVICE_EP "http://0.0.0.0:6000"
ENV BITCOIN_SERVICE_EP "http://0.0.0.0:5000"
ENV PORT 8080
COPY package.json ./
COPY package-lock.json ./
RUN npm install
ADD index.js ./
EXPOSE ${PORT}/tcp
CMD [ "node", "index.js" ]
