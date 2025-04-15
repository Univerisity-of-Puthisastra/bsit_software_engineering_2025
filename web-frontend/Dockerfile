# FROM node:18-alpine as build

# WORKDIR /app

# # Copy package.json and package-lock.json first to leverage Docker cache
# COPY package*.json ./

# # Install dependencies
# RUN npm ci

# # Copy the rest of the application code
# COPY . .

# # Build the React app
# RUN npm run build

# Production environment
FROM nginx:alpine

# Copy the build output to replace the default nginx contents
# COPY --from=build /app/build /usr/share/nginx/html
COPY ./build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]