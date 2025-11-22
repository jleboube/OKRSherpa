# OKR Sherpa

AI-driven Socratic OKR planning assistant powered by Google Gemini.

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

## Features

- **Socratic OKR Guidance**: AI-powered Socratic questioning to refine objectives
- **Dual AI Modes**: Fast (Gemini 2.5 Flash Lite) and Deep (Gemini 3.0 Pro)
- **Context Awareness**: Aligns OKRs with leadership goals and org context
- **Google OAuth**: Sign in to save your OKR data (mock implementation)
- **Privacy & Terms**: Complete legal pages included

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
```

Get your API key: https://aistudio.google.com/apikey

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
