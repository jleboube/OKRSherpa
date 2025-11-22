# OKR Sherpa - Quick Start Guide

## 🎯 What's New

Your OKR Sherpa project has been updated with:

✅ **Privacy Policy & Terms pages** - Accessible from the landing page footer
✅ **Google OAuth integration** - Sign in to save your OKR data (currently using mock auth)
✅ **Docker Compose deployment** - Runs on port **7337** (obscure port as requested)
✅ **MongoDB integration** - Ready for user data storage
✅ **Cloudflare Tunnel ready** - Configured for okrsherpa.app domain

---

## 🚀 Quick Commands

### Start the Application

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Access the Application

- **Local URL**: http://localhost:7337
- **Health Check**: http://localhost:7337/health.json
- **Production URL**: https://okrsherpa.app (via Cloudflare Tunnel)

---

## 🔧 Setup Checklist

### 1. Environment Setup

```bash
# Copy and configure environment variables
cp .env.example .env.local

# Edit with your actual values
nano .env.local
```

**Required Variables:**
- `GEMINI_API_KEY` - Your Google Gemini API key

### 2. Start Services

```bash
# Build and start
docker-compose up -d --build

# Verify services are running
docker-compose ps
```

### 3. Configure Cloudflare Tunnel

Add to your existing cloudflared config:

```yaml
ingress:
  - hostname: okrsherpa.app
    service: http://localhost:7337
```

Then restart cloudflared:
```bash
sudo systemctl restart cloudflared
```

---

## 📍 Port Configuration

- **External Port**: `7337` (the obscure port you requested)
- **Internal Port**: `8080` (nginx inside container)
- **MongoDB Port**: `27017` (only accessible within Docker network)

---

## 🔐 Authentication

The app currently uses **mock Google OAuth**:
- Click "Sign In" to use demo authentication
- Data is saved to browser localStorage
- For production Google OAuth, see `DEPLOYMENT.md`

---

## 📱 Features

### Landing Page
- Professional SaaS-style landing page
- Links to Privacy Policy and Terms in footer
- "Get Started" button to launch the app

### Privacy & Terms Pages
- ✅ Privacy Policy - Comprehensive privacy information
- ✅ Terms & Conditions - Legal terms of service
- Both have "Back to Home" buttons

### OKR Chat Interface
- Sign in to save your OKR data
- Toggle between Fast (Gemini 2.5 Flash Lite) and Deep (Gemini 3.0 Pro) modes
- Save/Load functionality when authenticated
- Context panel for leadership goals

---

## 🗂️ File Structure

```
okr-sherpa/
├── App.tsx                    # Main app with routing
├── components/
│   ├── LandingPage.tsx       # Landing page
│   ├── PrivacyPolicy.tsx     # Privacy policy page
│   ├── TermsConditions.tsx   # Terms & conditions page
│   └── ...
├── Dockerfile                 # Multi-stage Docker build
├── docker-compose.yml         # Service orchestration (port 7337)
├── nginx.conf                 # Nginx configuration
├── .env.example               # Environment template
├── .env.local                 # Your config (git-ignored)
├── DEPLOYMENT.md              # Full deployment guide
└── QUICK_START.md             # This file
```

---

## 🛠️ Common Commands

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f app
docker-compose logs -f mongodb

# Restart services
docker-compose restart

# Rebuild after code changes
docker-compose up -d --build

# Stop and remove everything
docker-compose down -v  # WARNING: Deletes data!
```

---

## 🔍 Testing

```bash
# Test health endpoint
curl http://localhost:7337/health.json

# Test main app
curl -I http://localhost:7337/

# Test via Cloudflare (after tunnel setup)
curl https://okrsherpa.app/health.json
```

---

## 🌐 Cloudflare Tunnel Setup

Your cloudflared configuration should include:

```yaml
# Add to your existing cloudflared config
ingress:
  - hostname: okrsherpa.app
    service: http://localhost:7337

  # ... your other services ...

  - service: http_status:404
```

After updating the config:

```bash
# Restart cloudflared
sudo systemctl restart cloudflared

# Check status
sudo systemctl status cloudflared
```

---

## 📊 Monitoring

### View Container Status
```bash
docker-compose ps
```

### Check Health
```bash
# App health
curl http://localhost:7337/health.json

# MongoDB health
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
```

### View Logs
```bash
# All services
docker-compose logs -f

# Just the app
docker-compose logs -f app
```

---

## 🎨 Features Implemented

### ✅ Pages & Components
- [x] Privacy Policy page with back button
- [x] Terms & Conditions page with back button
- [x] Updated landing page with Privacy/Terms links
- [x] Mock Google OAuth sign-in
- [x] Save/Load OKR data functionality

### ✅ Infrastructure
- [x] Docker Compose setup
- [x] Nginx web server
- [x] MongoDB database
- [x] Port 7337 exposure
- [x] Health check endpoints
- [x] Multi-stage Dockerfile

### ✅ Configuration
- [x] .env.example template
- [x] .dockerignore optimization
- [x] Cloudflare Tunnel ready

---

## 🔄 Next Steps for Production

1. **Get Real Google OAuth Credentials**
   - Visit [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create OAuth 2.0 Client ID
   - Add to `.env.local`

2. **Implement Backend API** (optional)
   - Create Express.js or FastAPI backend
   - Implement real OAuth flow
   - Connect to MongoDB for persistent storage

3. **Domain Setup**
   - Ensure `okrsherpa.app` points to your Cloudflare Tunnel
   - Verify SSL certificate is active
   - Test public access

4. **Security Hardening**
   - Change MongoDB default password
   - Set up regular backups
   - Configure rate limiting
   - Enable monitoring/alerting

---

## 💡 Tips

- **Development**: Run `npm run dev` for local React development
- **Production**: Use `docker-compose up -d` for containerized deployment
- **Logs**: Always check logs if something isn't working: `docker-compose logs -f`
- **Updates**: After code changes, rebuild with `docker-compose up -d --build`

---

## 🆘 Troubleshooting

**Port 7337 already in use?**
```bash
# Check what's using the port
lsof -i :7337

# Stop the service or change port in docker-compose.yml
```

**Can't connect to MongoDB?**
```bash
# Check MongoDB is running
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb
```

**Cloudflare Tunnel not working?**
```bash
# Verify tunnel is running
systemctl status cloudflared

# Check tunnel logs
journalctl -u cloudflared -f

# Test local first
curl http://localhost:7337/health.json
```

---

## 📞 Support

For detailed deployment instructions, see `DEPLOYMENT.md`.

**Service Status:**
- Application: http://localhost:7337
- Health Check: http://localhost:7337/health.json
- MongoDB: mongodb://localhost:27017 (within Docker network)

---

**Last Updated**: November 22, 2025
