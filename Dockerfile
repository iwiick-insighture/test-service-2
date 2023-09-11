# Use a single base image for both build and production
FROM node:18-alpine AS build

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command for development
RUN npm ci

# Copy app source
COPY --chown=node:node . .

# Build the application
RUN npm run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force

# Set the user to node
USER node

###################
# PRODUCTION
###################

# Use the built app image as the base for the production image
FROM node:18-alpine AS production

# Create app directory
WORKDIR /usr/src/app

# Copy the bundled code and production dependencies from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
