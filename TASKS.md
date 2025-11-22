# Development Tasks Log

## Iteration 1 - Initial Docker Setup (Nov 22, 2025)

### Completed
- ✅ Created Privacy Policy page component
- ✅ Created Terms & Conditions page component
- ✅ Updated LandingPage with Privacy/Terms links in footer
- ✅ Added page routing to App.tsx
- ✅ Implemented mock Google OAuth (Sign In/Out, Save/Load)
- ✅ Created Docker Compose setup with MongoDB
- ✅ Configured Nginx for production serving
- ✅ Set up port 7337 (obscure port as requested)
- ✅ Prepared for Cloudflare Tunnel (okrsherpa.app domain)

### Issues Encountered & Resolutions

**Issue 1: Missing CSS File (404)**
- Problem: `index.html` referenced `/index.css` that didn't exist
- Solution: Removed the CSS link (Tailwind loaded via CDN)

**Issue 2: Blank Page / GEMINI_API_KEY Not Loading**
- Problem: Environment variables weren't being loaded correctly
- Attempted Fix 1: User API key input (too complex)
- **Final Solution**: Use `VITE_` prefix for env vars (standard Vite pattern)
  - Changed from `GEMINI_API_KEY` to `VITE_GEMINI_API_KEY`
  - Used `import.meta.env.VITE_GEMINI_API_KEY` in code
  - Vite automatically loads from `.env.local` at build time
  - Follows same pattern as other projects in ~/Development

### Configuration

**Environment Variables**:
```bash
VITE_GEMINI_API_KEY=your_key_here  # Required in .env.local
```

**Docker Setup**:
- Multi-stage Dockerfile
- `.env.local` copied into build (contains API key)
- Nginx serves static files on port 8080 (internal)
- Exposed as port 7337 (external)

**Cloudflare Tunnel**:
```yaml
ingress:
  - hostname: okrsherpa.app
    service: http://localhost:7337
```

### Deployment Commands

```bash
# On remote VM:
cp .env.example .env.local
# Add VITE_GEMINI_API_KEY to .env.local
docker-compose build --no-cache
docker-compose up -d
```

### Files Modified
- `vite.config.ts` - Simplified, removed manual env handling
- `services/geminiService.ts` - Use `import.meta.env.VITE_GEMINI_API_KEY`
- `.env.example` - Changed to `VITE_GEMINI_API_KEY`
- `docker-compose.yml` - Removed env_file and environment vars (not needed for Vite)
- `Dockerfile` - Added comment about .env.local being copied
- `.dockerignore` - Allow .env.local for build (Vite needs it)
- `App.tsx` - Removed ApiKeySetup component
- `index.html` - Removed missing CSS link
- Deleted: `components/ApiKeySetup.tsx`

### Documentation Cleanup
- ❌ Removed: DEPLOYMENT.md, DEPLOYMENT_FIX.md, QUICK_START.md, SUMMARY.md, USER_API_KEY_SETUP.md
- ✅ Created: README.md (project overview, quick start, deployment)
- ✅ Created: TASKS.md (this file - iteration log)

### How It Works Now

1. **Local Development**:
   - Copy `.env.example` to `.env.local`
   - Add `VITE_GEMINI_API_KEY=your_key`
   - Run `npm run dev`
   - Vite loads env vars automatically

2. **Docker Build**:
   - `.env.local` is copied into Docker build context
   - Vite reads `VITE_GEMINI_API_KEY` during build
   - API key is embedded in compiled JavaScript
   - No runtime env vars needed

3. **Production**:
   - Nginx serves static files (including JS with embedded API key)
   - App loads at http://localhost:7337
   - Cloudflare Tunnel proxies okrsherpa.app → localhost:7337

---

---

## Iteration 2 - Real Google OAuth & Scrolling Fix (Nov 22, 2025)

### Issues Fixed

**Issue 1: Mock OAuth showing "Demo User"**
- Removed mock authentication
- Implemented real Google OAuth 2.0 flow
- Uses implicit grant flow (client-side)
- Redirects to `/auth/callback` after authentication
- Fetches user info from Google API

**Issue 2: Terms page frozen/unable to scroll**
- Problem: `body` had `overflow-hidden` class
- Solution: Removed `overflow-hidden` from body tag
- Now allows scrolling on Privacy/Terms pages

### Configuration Required

**Google OAuth Setup:**
1. Go to https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Add authorized redirect URIs:
   - Production: `https://okrsherpa.app/auth/callback`
   - Development: `http://localhost:3000/auth/callback`
4. Add to `.env.local`:
   ```bash
   VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   ```

### Files Modified
- `App.tsx` - Implemented real OAuth flow, added callback handler
- `index.html` - Removed `overflow-hidden` from body
- `.env.example` - Added `VITE_GOOGLE_CLIENT_ID`
- `nginx.conf` - Added `/auth/callback` route
- `README.md` - Updated with OAuth setup instructions

### How OAuth Works Now

1. User clicks "Sign In"
2. Redirects to Google OAuth consent screen
3. User approves
4. Google redirects to `/auth/callback` with access token
5. App fetches user info from Google API
6. User data stored in localStorage
7. Redirects to landing page

---

## Next Steps

- [ ] Test Google OAuth on production
- [ ] Connect MongoDB for persistent user data
- [ ] Add data export functionality
