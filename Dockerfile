# Use Node.JS Image LTS version.
FROM node:18

# Create app directory.
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Copy tsconfig file
COPY tsconfig.json ./

# Install dependencies.
RUN npm install

# Bundle app source.
COPY . .

# Build app code.
RUN npm run build

# Container Image listening port 3333.
EXPOSE 3333

# After image build, the command bellow will be executed.
# CMD [ "npm", "run", "start:migrate:prod" ]
