
# Use Node.js as base image
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:stable-alpine as production

# Create nginx temp directories with correct permissions
RUN mkdir -p /var/cache/nginx/client_temp /var/cache/nginx/proxy_temp \
    /var/cache/nginx/fastcgi_temp /var/cache/nginx/uwsgi_temp /var/cache/nginx/scgi_temp \
    && chmod 777 -R /var/cache/nginx \
    && chmod 777 -R /var/run \
    && chmod 777 -R /var/log/nginx

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Create a custom nginx.conf that doesn't use the user directive and uses port 8080 instead of 80
RUN echo 'worker_processes auto;' > /etc/nginx/nginx.conf && \
    echo 'error_log /var/log/nginx/error.log warn;' >> /etc/nginx/nginx.conf && \
    echo 'pid /var/run/nginx.pid;' >> /etc/nginx/nginx.conf && \
    echo 'events {' >> /etc/nginx/nginx.conf && \
    echo '    worker_connections 1024;' >> /etc/nginx/nginx.conf && \
    echo '}' >> /etc/nginx/nginx.conf && \
    echo 'http {' >> /etc/nginx/nginx.conf && \
    echo '    include /etc/nginx/mime.types;' >> /etc/nginx/nginx.conf && \
    echo '    default_type application/octet-stream;' >> /etc/nginx/nginx.conf && \
    echo '    log_format main '"'"'$remote_addr - $remote_user [$time_local] "$request" ' >> /etc/nginx/nginx.conf && \
    echo '                      $status $body_bytes_sent "$http_referer" ' >> /etc/nginx/nginx.conf && \
    echo '                      "$http_user_agent" "$http_x_forwarded_for"'"'"';' >> /etc/nginx/nginx.conf && \
    echo '    access_log /var/log/nginx/access.log main;' >> /etc/nginx/nginx.conf && \
    echo '    sendfile on;' >> /etc/nginx/nginx.conf && \
    echo '    keepalive_timeout 65;' >> /etc/nginx/nginx.conf && \
    echo '    server {' >> /etc/nginx/nginx.conf && \
    echo '        listen 8080;' >> /etc/nginx/nginx.conf && \
    echo '        location / {' >> /etc/nginx/nginx.conf && \
    echo '            root /usr/share/nginx/html;' >> /etc/nginx/nginx.conf && \
    echo '            index index.html index.htm;' >> /etc/nginx/nginx.conf && \
    echo '            try_files $uri $uri/ /index.html;' >> /etc/nginx/nginx.conf && \
    echo '        }' >> /etc/nginx/nginx.conf && \
    echo '    }' >> /etc/nginx/nginx.conf && \
    echo '}' >> /etc/nginx/nginx.conf

# Expose port 8080 instead of 80
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
