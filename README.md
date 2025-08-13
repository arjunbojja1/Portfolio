# Arjun Bojja's Portfolio

A modern, full-stack portfolio website built with React, TypeScript, and Firebase Functions. Features dynamic content management, responsive design, and a contact form with email notifications.

## 🚀 Features

- **Modern React Frontend**: Built with TypeScript, featuring animations and responsive design
- **Firebase Functions Backend**: Serverless Python backend with all your existing API endpoints
- **Dynamic Content**: Easy-to-update portfolio data through Firebase Functions
- **Contact Form**: Integrated email functionality for visitor inquiries
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Performance Optimized**: Fast loading with proper caching and optimization

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, CSS3, Axios
- **Backend**: Firebase Functions (Python), Firebase Hosting
- **Deployment**: Firebase (Functions + Hosting)
- **Development**: Node.js, npm, Firebase CLI

## 📦 Project Structure

```
Portfolio/
├── frontend/           # React TypeScript application
│   ├── src/
│   │   ├── components/ # React components
│   │   └── App.tsx     # Main application
│   └── build/          # Production build
├── functions/          # Firebase Functions (Python)
│   ├── main.py         # API endpoints
│   └── requirements.txt
├── public/             # Firebase Hosting files
├── backend/            # Original FastAPI backend (for local dev)
└── firebase.json       # Firebase configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python 3.13+
- Firebase CLI (`npm install -g firebase-tools`)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   npm run install-all
   ```

2. **Firebase Setup:**
   ```bash
   firebase login
   firebase init  # Select Functions and Hosting
   ```

3. **Configure your Firebase project:**
   - Update `REACT_APP_FIREBASE_PROJECT_ID` in `frontend/.env.production`
   - Replace `your-firebase-project-id` with your actual project ID

### Development

**Local Development (with original backend):**
```bash
npm run dev  # Runs both frontend and backend
```

**Firebase Local Development:**
```bash
npm run firebase:serve  # Test Firebase Functions locally
```

### Deployment

**Deploy everything:**
```bash
npm run firebase:deploy
```

**Deploy only functions:**
```bash
npm run firebase:deploy:functions
```

**Deploy only hosting:**
```bash
npm run firebase:deploy:hosting
```

## 🔧 Configuration

### Environment Variables

Create `frontend/.env.local` for local development:
```bash
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

### Email Configuration

Set up email environment variables in Firebase Functions:
```bash
firebase functions:config:set \
  smtp.host="smtp.gmail.com" \
  smtp.port="587" \
  smtp.username="your-email@gmail.com" \
  smtp.password="your-app-password" \
  smtp.from_email="your-email@gmail.com" \
  smtp.to_email="your-email@gmail.com"
```

## 📝 Content Management

Update your portfolio content by editing the data in `functions/main.py`:
- `profile_data`: Personal information and skills
- `experience_data`: Work experience
- `projects_data`: Project portfolio

After making changes, redeploy functions:
```bash
npm run firebase:deploy:functions
```

## 🔥 Firebase Functions Endpoints

- `GET /get_profile` - Retrieve profile information
- `GET /get_experience` - Retrieve work experience
- `GET /get_projects` - Retrieve project portfolio
- `POST /contact_form` - Handle contact form submissions
- `GET /health_check` - API health status

## 🎨 Customization

### Styling
- Main styles: `frontend/src/App.css`
- Component styles: Individual component files

### Components
- `Hero`: Landing section with name and title
- `About`: Skills, education, and personal info
- `Experience`: Work experience timeline
- `Projects`: Project showcase with links
- `Contact`: Contact form with validation

## 📱 Features

- **Responsive Design**: Mobile-first approach
- **Animated UI**: Particle effects and smooth transitions
- **Loading States**: Skeleton loading for better UX
- **Error Handling**: Comprehensive error boundaries
- **Form Validation**: Client-side form validation
- **SEO Optimized**: Proper meta tags and structure

## 🚀 Performance

- Static hosting via Firebase
- Serverless functions for dynamic content
- Optimized bundle splitting
- Proper caching headers
- Image optimization

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio!

## 🤝 Contributing

This is a personal portfolio, but feel free to fork and create your own version!

---

Built with ❤️ by Arjun Bojja