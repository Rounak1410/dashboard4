# Full-Stack User Management Dashboard
Video - 



https://github.com/user-attachments/assets/5f2821eb-c5c8-4a66-bd4a-1c13bb5853e2



A modern, responsive user management dashboard built with Next.js, TypeScript, Tailwind CSS, and Firestore. Features complete CRUD operations with Docker containerization support.

## 🚀 Features

- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **Database**: Firestore integration ready
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Docker Support**: Containerized deployment
- **Real-time Updates**: Optimistic UI updates
- **Error Handling**: Comprehensive error handling and loading states
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: Firestore (Google Cloud)
- **Containerization**: Docker, Docker Compose
- **Icons**: Lucide React
- **State Management**: React hooks with optimistic updates

## 📦 Installation



### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerization)
- Firebase project (for Firestore)

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd fullstack-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Environment Setup**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your Firebase configuration:
   \`\`\`env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Deployment

1. **Build the Docker image**
   \`\`\`bash
   npm run docker:build
   \`\`\`

2. **Run with Docker**
   \`\`\`bash
   npm run docker:run
   \`\`\`

3. **Or use Docker Compose**
   \`\`\`bash
   npm run docker:compose
   \`\`\`

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project
2. Enable Firestore Database
3. Get your Firebase configuration
4. Update `.env.local` with your credentials

### Firestore Integration

The app currently uses mock data for development. To enable Firestore:

1. Uncomment the Firebase configuration in `lib/firebase.ts`
2. Replace the mock service in `services/userService.ts` with `services/firestoreService.ts`
3. Update the import in your components

## 📁 Project Structure

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard
│   ├── UserList.tsx       # User listing
│   ├── UserForm.tsx       # User form modal
│   └── ui/               # shadcn/ui components
├── services/             # API services
│   ├── userService.ts    # Mock user service
│   └── firestoreService.ts # Firestore service
├── types/               # TypeScript types
│   └── user.ts          # User type definitions
└── lib/                 # Utilities
    └── firebase.ts      # Firebase configuration
\`\`\`

## 🎯 Features Overview

### Dashboard
- User statistics and analytics
- Responsive grid layout
- Real-time data updates

### User Management
- Create new users with validation
- Edit existing user information
- Delete users with confirmation
- Search and filter capabilities

### CRUD Operations
- **Create**: Add new users with form validation
- **Read**: Display users in responsive cards
- **Update**: Edit user information inline
- **Delete**: Remove users with confirmation dialog

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Docker Production
\`\`\`bash
docker build -t fullstack-dashboard .
docker run -p 3000:3000 --env-file .env.local fullstack-dashboard
\`\`\`

## 🔒 Security Considerations

- Environment variables for sensitive data
- Input validation on all forms
- Firestore security rules (configure in Firebase Console)
- HTTPS in production
- CORS configuration for API endpoints

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for custom themes
- Update component styles in respective files
- Add custom CSS in `globals.css`

### Components
- All components are modular and reusable
- shadcn/ui components can be customized
- Add new components in the `components/` directory

## 📝 API Integration

To integrate with Google Cloud Functions:

1. Update `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
2. Replace mock service calls with actual API calls
3. Handle authentication if required

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Issues**
   - Verify your Firebase configuration
   - Check Firestore security rules
   - Ensure project ID is correct

2. **Docker Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review Dockerfile for any custom modifications

3. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Restart development server after changes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
