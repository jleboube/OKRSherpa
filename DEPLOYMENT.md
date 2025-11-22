# OKR Sherpa - Deployment Guide

## 🚀 Docker Deployment

This guide will help you deploy OKR Sherpa using Docker Compose with Cloudflare Tunnel integration.

### Prerequisites

- Docker and Docker Compose installed
- Cloudflare account with an existing cloudflared deployment
- Google Gemini API key
- Domain: `okrsherpa.app` configured in Cloudflare

### Port Configuration

The application is exposed on **port 7337** (an obscure, uncommon port for security through obscurity).

- **External Port**: 7337
- **Internal Port**: 8080 (nginx)
- **MongoDB Port**: 27017 (only accessible within Docker network)

---

## 📋 Setup Instructions

### 1. Environment Configuration

Copy the example environment file and configure your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```bash
# Required: Google Gemini API Key
GEMINI_API_KEY=your_actual_gemini_api_key

# MongoDB credentials (change the default password!)
MONGO_ROOT_USER=admin
MONGO_ROOT_PASSWORD=your_secure_password_here
MONGODB_URI=mongodb://admin:your_secure_password_here@mongodb:27017/okr_sherpa?authSource=admin

# Application URL
APP_URL=https://okrsherpa.app
```

### 2. Build and Start Services

```bash
# Build and start all services
docker-compose up -d --build

# Check logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### 3. Verify Deployment

Test that the application is running:

```bash
# Check health endpoint
curl http://localhost:7337/health.json

# Expected output:
# {"status":"healthy","service":"okr-sherpa"}
```

Access the application locally:
```
http://localhost:7337
```

---

## 🌐 Cloudflare Tunnel Configuration

### Update Your Existing cloudflared Configuration

Add the following ingress rule to your existing cloudflared configuration:

**Example cloudflared config.yml:**

```yaml
tunnel: your-tunnel-id
credentials-file: /path/to/credentials.json

ingress:
  # OKR Sherpa routing
  - hostname: okrsherpa.app
    service: http://localhost:7337

  # Your other services...
  # - hostname: other.example.com
  #   service: http://localhost:8080

  # Catch-all rule (must be last)
  - service: http_status:404
```

### Apply the Configuration

```bash
# Restart cloudflared with updated config
sudo systemctl restart cloudflared

# Or if running cloudflared manually:
cloudflared tunnel run your-tunnel-name
```

### Verify Cloudflare Tunnel

```bash
# Check tunnel status
cloudflared tunnel info your-tunnel-name

# Check if the route is active
curl https://okrsherpa.app/health.json
```

---

## 🗄️ MongoDB Data Persistence

MongoDB data is persisted using Docker volumes:

```bash
# View volumes
docker volume ls | grep okr

# Backup MongoDB data
docker-compose exec mongodb mongodump --out /data/backup

# Restore MongoDB data
docker-compose exec mongodb mongorestore /data/backup
```

---

## 🔐 Google OAuth Setup (Future Enhancement)

Currently, the app uses a mock authentication system. To implement real Google OAuth:

1. **Create OAuth Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URI: `https://okrsherpa.app/auth/callback`

2. **Update `.env.local`**:
   ```bash
   GOOGLE_CLIENT_ID=your_client_id_here
   GOOGLE_CLIENT_SECRET=your_client_secret_here
   GOOGLE_REDIRECT_URI=https://okrsherpa.app/auth/callback
   ```

3. **Implement OAuth Flow** (requires backend service - see Future Enhancements)

---

## 📊 Monitoring and Logs

### View Application Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f mongodb
```

### Health Checks

The application includes built-in health checks:

```bash
# Application health
curl http://localhost:7337/health.json

# MongoDB health (from within Docker network)
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
```

---

## 🔄 Updates and Maintenance

### Update the Application

```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes data!)
docker-compose down -v
```

---

## 🐛 Troubleshooting

### Application Won't Start

```bash
# Check logs
docker-compose logs app

# Verify environment variables
docker-compose config
```

### Can't Access on Port 7337

```bash
# Check if port is in use
lsof -i :7337

# Verify Docker port mapping
docker-compose ps
docker port okr-sherpa-app
```

### MongoDB Connection Issues

```bash
# Check MongoDB status
docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"

# Verify network connectivity
docker-compose exec app ping mongodb
```

### Cloudflare Tunnel Not Working

```bash
# Check cloudflared logs
journalctl -u cloudflared -f

# Verify tunnel is running
cloudflared tunnel list

# Test local connection first
curl http://localhost:7337/health.json
```

---

## 📁 Project Structure

```
okr-sherpa/
├── App.tsx                 # Main application component
├── components/             # React components
│   ├── LandingPage.tsx
│   ├── PrivacyPolicy.tsx
│   ├── TermsConditions.tsx
│   └── ...
├── services/               # API services
│   └── geminiService.ts
├── Dockerfile              # Multi-stage Docker build
├── docker-compose.yml      # Service orchestration
├── nginx.conf              # Nginx configuration
├── .env.example            # Environment template
├── .env.local              # Your actual config (git-ignored)
└── DEPLOYMENT.md           # This file
```

---

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **MongoDB Password**: Use a strong, unique password
3. **Port 7337**: Obscure port provides minimal security benefit - rely on Cloudflare's security features
4. **HTTPS Only**: Ensure Cloudflare Tunnel enforces HTTPS
5. **Regular Updates**: Keep Docker images and dependencies updated

---

## 🚀 Production Checklist

- [ ] Updated `.env.local` with production values
- [ ] Changed default MongoDB password
- [ ] Verified Gemini API key is valid
- [ ] Configured Cloudflare Tunnel ingress
- [ ] Tested health endpoints
- [ ] Verified application is accessible via `https://okrsherpa.app`
- [ ] Set up MongoDB backups
- [ ] Configured monitoring/alerting
- [ ] Reviewed Privacy Policy and Terms & Conditions

---

## 📞 Support

For issues or questions:
- Check logs: `docker-compose logs -f`
- Review health checks: `curl http://localhost:7337/health.json`
- Verify Cloudflare Tunnel: `cloudflared tunnel info`

---

## 🎯 Future Enhancements

### Real Google OAuth Integration

Currently implemented as mock authentication. To enable real Google OAuth:

1. Create a backend API service (Express.js or FastAPI)
2. Implement OAuth flow with Google's OAuth 2.0
3. Store user sessions in MongoDB
4. Add JWT token management

### MongoDB User Data Storage

Schema structure for future implementation:

```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  googleId: String,
  createdAt: Date,
  okrSessions: [
    {
      sessionId: String,
      messages: Array,
      context: {
        leadershipGoals: String,
        userRole: String,
        organizationType: String
      },
      createdAt: Date,
      updatedAt: Date
    }
  ]
}
```

---

**Last Updated**: November 22, 2025
**Version**: 1.0.0
**Maintainer**: Joe LeBoube
