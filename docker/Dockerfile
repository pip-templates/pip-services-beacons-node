# Start with the Node.js 8 image
FROM node:8

# Set a working directory
WORKDIR /app

# Copy the project file
COPY package*.json ./

# Install ALL node_modules, including 'devDependencies'
RUN npm install

# Copy the entire project
COPY . .

# Set the required environment variables
ENV HTTP_PORT=8080
ENV MONGO_SERVICE_HOST=
ENV MONGO_SERVICE_PORT=27017

# Expose the HTTP port
EXPOSE "8080:8080"

# Specify the command for running the service
CMD [ "node", "bin/main.js" ]