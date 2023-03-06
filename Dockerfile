FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install --production
RUN npx tailwindcss -i ./src/input.css -o ./public/dist/output.css

CMD [ "npm", "run", "start" ]