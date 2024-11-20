// Import required dependencies
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Constants
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use environment variable in production
const JWT_EXPIRES_IN = '7d';
const SALT_ROUNDS = 10;

// Token management
export const generateToken = (userId, role) => {
  return jwt.sign(
    {
      userId,
      role,
      timestamp: Date.now()
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null
    };
  }
};

// Password handling
export const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Authentication middleware
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const { valid, expired, decoded } = verifyToken(token);

    if (!valid) {
      return res.status(401).json({ 
        error: expired ? 'Token expired' : 'Invalid token' 
      });
    }

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Authentication error' });
  }
};

// Role-based authorization middleware
export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

// Session management
export const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
};

// Authentication handlers
export const authHandlers = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Here you would typically:
      // 1. Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      // 2. Find user in database
      // const user = await User.findOne({ email });
      // if (!user) {
      //   return res.status(401).json({ error: 'Invalid credentials' });
      // }

      // 3. Verify password
      // const isValid = await verifyPassword(password, user.password);
      // if (!isValid) {
      //   return res.status(401).json({ error: 'Invalid credentials' });
      // }

      // 4. Generate token
      const token = generateToken(/* user.id, user.role */);

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Login failed' });
    }
  },

  register: async (req, res) => {
    try {
      const { email, password, name, phone } = req.body;

      // 1. Validate input
      if (!email || !password || !name || !phone) {
        return res.status(400).json({ 
          error: 'Email, password, name, and phone required' 
        });
      }

      // 2. Check if user exists
      // const existingUser = await User.findOne({ email });
      // if (existingUser) {
      //   return res.status(400).json({ error: 'Email already registered' });
      // }

      // 3. Hash password
      const hashedPassword = await hashPassword(password);

      // 4. Create user
      // const user = await User.create({
      //   email,
      //   password: hashedPassword,
      //   name,
      //   phone
      // });

      // 5. Generate token
      const token = generateToken(/* user.id, 'user' */);

      res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  logout: async (req, res) => {
    try {
      // Clear session/cookie if using session-based auth
      req.session?.destroy();
      
      // For token-based auth, client should delete token
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Logout failed' });
    }
  },

  refreshToken: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      // Verify refresh token
      const { valid, decoded } = verifyToken(refreshToken);
      
      if (!valid) {
        return res.status(401).json({ error: 'Invalid refresh token' });
      }

      // Generate new access token
      const newToken = generateToken(decoded.userId, decoded.role);
      
      res.json({ token: newToken });
    } catch (error) {
      res.status(500).json({ error: 'Token refresh failed' });
    }
  }
};

// Social authentication endpoints
export const socialAuthConfig = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email']
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    scope: ['email', 'public_profile']
  }
};

// Two-factor authentication
export const twoFactorAuth = {
  generateSecret: () => {
    // Implement 2FA secret generation
    // return speakeasy.generateSecret({ length: 20 });
  },
  
  verifyToken: (secret, token) => {
    // Implement 2FA token verification
    // return speakeasy.totp.verify({
    //   secret,
    //   encoding: 'base32',
    //   token
    // });
  }
};