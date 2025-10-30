# Use an official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency definitions

COPY package*.json ./

# Install dependencies
# RUN npm cache clean --force
# RUN rm -rf node_modules package-lock.json


RUN npm install
RUN npm install antd

# Copy app source code
COPY . .

# Expose the React dev server port
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]