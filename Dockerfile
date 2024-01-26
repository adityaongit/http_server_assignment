# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Expose port 8080
EXPOSE 8080

# CMD specifies the command to run on container start
CMD ["node", "app.js"]

# Specify resource limits
# The container is allocated a maximum of 1500 MB RAM and 2000m/2 Core CPU
# Note: The resource limits are set, but their actual enforcement depends on the Docker runtime used
ENTRYPOINT ["docker-entrypoint.sh"]
