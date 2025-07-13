# Use Node.js for frontend build
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the React dev server port
EXPOSE 3000

# Start development server (or use `npm run build` for production)
CMD ["npm", "run", "dev"]