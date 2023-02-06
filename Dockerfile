FROM node:10.15.3-alpine as npm

RUN mkdir /app
ADD . /app
RUN cd /app && npm install && npm run build
COPY --from=npm /app/dist/booking .
