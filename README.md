# Auth App

A secure and modular authentication system built with Node.js, Express, and MongoDB. This application supports user registration, email-based OTP verification, JWT authentication, password reset functionality, and role-based access control.

## 🚀 Features

- **User Registration**: Sign up with email and password.
- **Email Verification**: OTP sent to email for account verification.
- **JWT Authentication**: Secure login with JSON Web Tokens.
- **Password Reset**: Request and reset password via email link.
- **Role-Based Access Control**: Admin-only routes and middleware protection.
- **Modular Architecture**: Clean separation of concerns with organized folders.
- **Environment Configuration**: Manage sensitive data with `.env` variables.

## 🛠️ Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB database (local or hosted).
- A Gmail account for sending emails (or configure another SMTP service).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/auth-app.git
   cd auth-app

2. **Install dependencies**:

   ```bash
   npm install

3. **Configure environment variables**:
   
   Create a .env file in the root directory and add the following:
   ```bash
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   NODE_ENV=development

4. **Start the server**:

   ```bash
   npm start

### 📬 API Endpoints

**Authentication Routes (/api/auth)**
- **POST /register:** Register a new user.
- **POST /login:** Login with email and password; receive OTP via email.
- **POST /verify-otp:** Verify OTP to complete login.
- **POST /resend-otp:** Resend OTP to email.
- **POST /forgot-password:** Request password reset link.
- **POST /reset-password/:token:** Reset password using the token.

### Protected Routes (/api/protected)

- **GET /user:** Access user-specific data (requires authentication).
- **GET /admin:** Access admin-only data (requires admin role).

### 🔐 Security Considerations

- Passwords are hashed using bcryptjs.
- OTPs are time-bound and stored securely.
- JWTs are used for session management.
- Sensitive routes are protected with middleware checks.

### 📧 Email Configuration

Emails are sent using nodemailer with Gmail's SMTP service. Ensure that:
- Less secure app access is enabled for your Gmail account, or
- Use an app password if you have 2FA enabled, or
- Configure another SMTP service as per your requirements.

### 🧪 Testing

- Use tools like Postman to test API endpoints.
- Ensure MongoDB is running and accessible.
- Monitor console logs for debugging information.

### 📄 License

This project is licensed

### 🙌 Acknowledgments

- Express
- MongoDB
- Nodemailer
- bcryptjs
- jsonwebtoken