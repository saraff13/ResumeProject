# Use an official Node.js image (LTS version) as a base
FROM node:18

# Install necessary build tools and CA certificates
RUN apt-get update && \
    apt-get install -y build-essential python3 openssl ca-certificates && \
    apt-get clean && \
    update-ca-certificates

# Configure npm to use the correct registry and set strict-ssl to false
RUN npm config set strict-ssl false
RUN npm config set registry https://registry.npmjs.org/

# Set the working directory
WORKDIR /src

# Copy package.json and package-lock.json first
COPY package*.json ./

# Set environment variable to bypass SSL verification
ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Install dependencies
RUN npm install --unsafe-perm

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
