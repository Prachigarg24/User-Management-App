# User Management Application

A modern, full-featured CRUD application built with React, TypeScript, and Tailwind CSS for managing users with authentication and real-time data persistence.

![User Management Dashboard](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🚀 Features

### Core Functionality
- ✅ **Complete CRUD Operations**: Create, Read, Update, and Delete users
- ✅ **Authentication System**: Secure login and signup with session persistence
- ✅ **Protected Routes**: Route guards to secure authenticated pages
- ✅ **Real-time Search**: Filter users by name, email, phone, or username
- ✅ **Column Sorting**: Sort users by name or email in ascending/descending order
- ✅ **Data Persistence**: LocalStorage integration for offline data caching
- ✅ **Statistics Dashboard**: Real-time user count and filtered results display

### UI/UX Features
- 🎨 **Modern Design**: Clean, professional interface with shadcn/ui components
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Loading States**: Skeleton screens for better user experience
- 🔔 **Toast Notifications**: Real-time feedback for all user actions
- 🎯 **Form Validation**: Client-side validation with error handling
- 🔒 **Secure Authentication**: Password validation and session management

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives + shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Hooks (useState, useEffect, useContext)
- **HTTP Client**: Fetch API
- **Icons**: Lucide React
- **Notifications**: Sonner (toast notifications)
- **Build Tool**: Vite
- **API**: JSONPlaceholder (mock REST API)

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Prachigarg24/User-Management-App.git
cd user-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔑 Usage

### Authentication
1. **Sign Up**: Create a new account with username, email, and password
2. **Login**: Access your account with username and password
3. **Auto-redirect**: Logged-in users automatically redirect to dashboard

### User Management
1. **View Users**: Browse the complete list of users with pagination
2. **Search**: Use the search bar to filter users in real-time
3. **Sort**: Click column headers to sort by name or email
4. **Add User**: Click "Add User" button and fill in the form
5. **Edit User**: Click edit icon on any user row to modify details
6. **Delete User**: Click delete icon and confirm to remove a user

### Data Persistence
- All user data is cached in localStorage
- Login sessions persist across browser refreshes
- No data loss on page reload

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn)
│   ├── UserTable.tsx    # User list table with sorting
│   ├── UserDialog.tsx   # Create/Edit user form dialog
│   ├── DeleteDialog.tsx # Delete confirmation dialog
│   ├── ProtectedRoute.tsx # Route authentication guard
│   └── NavLink.tsx      # Custom navigation link component
├── contexts/
│   └── AuthContext.tsx  # Authentication context provider
├── pages/
│   ├── Dashboard.tsx    # Main user management page
│   ├── Auth.tsx         # Login/Signup page
│   └── NotFound.tsx     # 404 error page
├── lib/
│   └── utils.ts         # Utility functions
├── hooks/
│   └── use-toast.ts     # Toast notification hook
├── App.tsx              # Main app component with routing
├── main.tsx             # App entry point
└── index.css            # Global styles and design tokens
```

## 🎯 Key Implementation Details

### Authentication Flow
```typescript
// Context-based authentication with localStorage persistence
- Login: Validates credentials against stored users
- Signup: Creates new user with validation
- Auto-redirect: Checks auth state on mount
- Protected routes: Wraps authenticated pages
```

### CRUD Operations
```typescript
// All operations sync with both API and localStorage
- CREATE: POST to API + add to localStorage
- READ: Fetch from API with localStorage cache
- UPDATE: PUT to API + update localStorage
- DELETE: DELETE from API + remove from localStorage
```

### State Management
```typescript
// Using React Hooks for efficient state handling
- useState: Component-level state
- useEffect: Side effects and data fetching
- useContext: Global auth state
- useMemo: Optimized filtering and sorting
```

## 🔒 Security Features

- Password validation (minimum 6 characters)
- Password confirmation matching
- Protected route guards
- Session persistence with localStorage
- Secure logout functionality

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Flexible grid layouts
- Touch-friendly UI elements

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

## 🧪 Testing

The application includes:
- Error boundary handling
- Input validation
- API error handling
- Loading states
- Empty state handling

## 📈 Future Enhancements

- [ ] Backend integration with real database
- [ ] Email verification for signup
- [ ] Password reset functionality
- [ ] Role-based access control
- [ ] User profile images
- [ ] Export users to CSV
- [ ] Advanced filtering options
- [ ] Pagination for large datasets
- [ ] Dark/Light theme toggle

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.




## 👨‍💻 Author

Built with ❤️ by Prachi Garg 

## 🙏 Acknowledgments

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Free fake API for testing
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives

---

⭐ If you found this project helpful, please give it a star!
