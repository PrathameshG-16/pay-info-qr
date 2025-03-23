
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

# Create a custom nginx.conf that doesn't use the user directive
RUN echo 'worker_processes auto;\n\
error_log /var/log/nginx/error.log warn;\n\
pid /var/run/nginx.pid;\n\
events {\n\
    worker_connections 1024;\n\
}\n\
http {\n\
    include /etc/nginx/mime.types;\n\
    default_type application/octet-stream;\n\
    log_format main \'$remote_addr - $remote_user [$time_local] "$request" \'\n\
                      \'$status $body_bytes_sent "$http_referer" \'\n\
                      \'"$http_user_agent" "$http_x_forwarded_for"\';\n\
    access_log /var/log/nginx/access.log main;\n\
    sendfile on;\n\
    keepalive_timeout 65;\n\
    server {\n\
        listen 80;\n\
        location / {\n\
            root /usr/share/nginx/html;\n\
            index index.html index.htm;\n\
            try_files $uri $uri/ /index.html;\n\
        }\n\
    }\n\
}' > /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
