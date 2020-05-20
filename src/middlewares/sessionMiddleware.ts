import session from 'express-session';
//setting session configuration
const sessionConfig = {
  secret: 'thisShouldBeSecret',
  cookie: {secure:false},
  resave: false,
  saveUninitialized: false
}

export const sessionMiddleware = session(sessionConfig);
