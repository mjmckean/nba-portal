# NBA Portal

A small application for NBA Player statistics. 

## Overview

This is a [React](https://react.dev/) application built with the [Next.js](https://nextjs.org/) framework.

Within this app, you can find information about NBA teams and individual players. Upon running, you will see links to (1) search for players or (2) view teams. 

## Running the App

### API Key

This app's data is provided by the [balldontlie API](https://app.balldontlie.io/), which requires an API key. You can easily register for a free balldontlie API key, with premium tiers available at a cost. While the free tier has certain limitations, the app currently only requires what is available with the free tier.

Once you have your API key, add it to a `.env.local` file at the project's root level. It will look like this:

```bash
#.env.local
NEXT_PUBLIC_BDL_API_KEY='your-api-key'
```

#### Warning

This is a small project and does not have proper API Key security practices for production.

### Docker

To run this app with Docker, you will need to [install Docker & Docker Compose](https://docs.docker.com/compose/install/). Once installed, the application can be deployed with the following command-line instruction:

```bash
docker-compose up --build
```

If this does not work, try one of the following:

```bash
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build && docker-compose up
```
OR
```bash
docker build -t nba-portal .
docker run -p 3000:3000 nba-portal
```

### Alternative

If Docker is not working for you, you can build/run it on your machine's main environment (note: you must [install Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for this approch).

In the project's root directory, execute one of the two following command-line instructions:

```bash
# Optimized build (slower startup, much faster at runtime)
npm install
npm run build
npm run start

# Dev mode (faster startup, slower on each page view)
npm install
npm run dev
```

## Assumptions & Trade-offs

### Balldontlie API

- Free and easy to set up
- No need to maintain & update our own data/database
- Free tier has limitations
  - Rate limiting (30 requests per minute) is a bottleneck for making this app much larger or robust than it currently is
  - Stats data is limited to current season only
  - Premium tier required for other interesting endpoints & data
    - Active players--currently all players are fetched, so some players do not have stats (if they did not play in the past season)
    - Advanced stats
    - Box scores
    - Stat leaders
- Depending on an external API
  - Less control over data structures
  - Possibility of outages or breaking updates
- Having an API Key
  - Possibility of it being exposed or abused
    - Exposed by network in current state
    - Endpoints can be called in rapid succession to reach API Key rate limit
  - Intermediary layer would be required to fully secure the key (e.g., prevent exposure & throttle bad requestors)
        
### React & Next.js

- I am most familiar with React components for frontend work
- React has widespread adoption
- Next.js is [recommended by React](https://react.dev/learn/start-a-new-react-project)
- Next.js is less lightweight than I had originally thought
