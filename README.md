# OKR Sherpa

<div align="center">

[![Docker](https://img.shields.io/badge/Docker-Compose-blue.svg)](https://docs.docker.com/compose/)
[![GitHub stars](https://img.shields.io/github/stars/jleboube/OKRSherpa?style=social)](https://github.com/jleboube/OKRSherpa/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/jleboube/OKRSherpa?style=social)](https://github.com/jleboube/OKRSherpa/network/members)
[![GitHub issues](https://img.shields.io/github/issues/jleboube/OKRSherpa)](https://github.com/jleboube/OKRSherpa/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/jleboube/OKRSherpa)](https://github.com/jleboube/OKRSherpa/pulls)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CCBY--NC--SA4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/muscl3n3rd)



AI-driven Socratic OKR planning assistant powered by Google Gemini.

[Demo](https://okrsherpa.app) • [Screenshots](#screenshots) • [Features](#features) • [Quick Start](#quick-start)


</div>

## Screenshots

OKRSherpa.app Landing Page

![Alt text](docs/os-1.png "OKRSherpa.app Landing Page")

OKRSherpa.app benefits

![Alt text](docs/os-2.png "OKRSherpa.app benefits")

How OKRSherpa.app works

![Alt text](docs/os-3.png "How OKRSherpa.app works")


## Features

- **Socratic OKR Guidance**: AI-powered Socratic questioning to refine objectives
- **Dual AI Modes**: Fast (Gemini 2.5 Flash Lite) and Deep (Gemini 3.0 Pro)
- **Context Awareness**: Aligns OKRs with leadership goals and org context
- **Google OAuth**: Sign in to save your OKR data (mock implementation)
- **Privacy & Terms**: Complete legal pages included


## Quick Start

```bash
# 1. Copy environment file
cp .env.example .env.local

# 2. Add your Gemini API key
nano .env.local
# Add: VITE_GEMINI_API_KEY=your_key_here

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev
```

## Docker Deployment

```bash
# 1. Ensure .env.local exists with your API key
cp .env.example .env.local
nano .env.local

# 2. Build and run
docker-compose up -d --build

# 3. Access at http://localhost:7337
```


## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **AI**: Google Gemini API
- **Database**: MongoDB (for future user data)
- **Deployment**: Docker + Nginx
- **Domain**: okrsherpa.app (via Cloudflare Tunnel)

## Configuration

### Environment Variables

Create `.env.local`:

```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

**Get API keys:**
- Gemini API: https://aistudio.google.com/apikey
- Google OAuth: https://console.cloud.google.com/apis/credentials
  - Create OAuth 2.0 Client ID
  - Add authorized redirect URI: `https://okrsherpa.app/auth/callback`

### Port

- **Development**: 3000
- **Production**: 7337 (mapped to internal 8080)

## Project Structure

```
okr-sherpa/
├── components/           # React components
│   ├── LandingPage.tsx
│   ├── PrivacyPolicy.tsx
│   ├── TermsConditions.tsx
│   └── ...
├── services/            # API services
│   └── geminiService.ts
├── Dockerfile           # Multi-stage build
├── docker-compose.yml   # Service orchestration
├── nginx.conf           # Production web server
└── TASKS.md            # Development log
```

## Development

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Deployment

See [TASKS.md](./TASKS.md) for detailed deployment history and configuration notes.

## License

Private project - All rights reserved
