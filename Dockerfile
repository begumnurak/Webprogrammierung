FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
RUN npx tailwindcss -i ./src/input.css -o ./public/dist/output.css
COPY . .

CMD [ "npm", "run", "start" ]