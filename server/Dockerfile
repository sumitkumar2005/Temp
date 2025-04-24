# Use a minimal Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of your server code
COPY . .

# Expose the port your app runs on (change if it's not 5000)
EXPOSE 5000

# Start the server
CMD ["node", "index.js"]
