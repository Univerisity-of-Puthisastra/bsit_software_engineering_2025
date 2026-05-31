FROM node:22-alpine

WORKDIR /app

# Install dependencies required for Prisma with OpenSSL
RUN apk add --no-cache openssl

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]