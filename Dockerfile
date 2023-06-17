FROM node:19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

COPY database.sql /docker-entrypoint-initdb.d/

# Expose the port your NestJS application is running on (e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
