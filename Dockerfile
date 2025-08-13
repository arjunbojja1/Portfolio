# Multi-stage build for React frontend
FROM node:18-alpine as frontend-build

# Set working directory
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy frontend source code
COPY frontend/ ./

# Build the frontend
RUN npm run build

# Production stage - serve the built frontend
FROM nginx:alpine

# Copy the built frontend from the previous stage
COPY --from=frontend-build /app/frontend/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 to match your portfolio's expected port
EXPOSE 3000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]