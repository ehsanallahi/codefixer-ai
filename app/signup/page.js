"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Box, Button, Container, Typography, TextField, AppBar, Toolbar, CssBaseline, Stack } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const themePrimary = createTheme({
    typography: {
        fontFamily: 'Georgia, serif', 
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#5d9cec', 
        },
        secondary: {
            main: '#f7a7a7', 
        },
        background: {
            default: '#1f1f1f', 
            paper: '#1f1f1f', 
        },
        text: {
            primary: '#ffffff', 
            secondary: '#cccccc',
            other: 'black',
        },
        myblue: {
            main: '#00fffb',
        },
    },
});

const SignupPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (event) => {
        event.preventDefault();
        if (password.length <= 5) {
          setError('Password must be at least 6 characters long.');
          return;
        }
    
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/landing'); 
        } catch (error) {
          let errorMessage = 'An error occurred. Please try again.';
          switch (error.code) {
            case 'auth/invalid-email':
              errorMessage = 'Invalid email address.';
              break;
            case 'auth/weak-password':
              errorMessage = 'Password is too weak. Please choose a stronger password.';
              break;
            case 'auth/email-already-in-use':
              errorMessage = 'An account already exists with this email address.';
              break;
            default:
              errorMessage = 'Failed to sign up. Please check your details and try again.';
          }
          setError(errorMessage);
        }
      };

    const handleSignIn = () => {
       router.push('/signin');
    };

    return (
        <ThemeProvider theme={themePrimary}>
        <CssBaseline />
    
        <Container maxWidth="xs">
            <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="80vh"
            textAlign="center">

            {/* Logo and text */}
            <Stack direction="row" spacing={2} alignItems="center">
                    
                    <Typography variant="h4" color="inherit" fontWeight={'bold'}>
                Codefixer<span style={{ color: "#00fffb" }}>AI</span> 
            </Typography>
                </Stack>
            <Box
                component="form"
                onSubmit={handleSignUp}
                noValidate
                sx={{
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 12px 24px rgba(0,0,0,0.8)',
                width: '100%',
                maxWidth: '400px',
                border: `2px solid myblue`, // Blue border
                mt: 5,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom >
                Sign Up
                </Typography>
                <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="myblue"
                sx={{ mt: 3, mb: 2, color: 'black' }}
                >
                Sign Up
                </Button>
                <Button
                fullWidth
                variant="text"
                color="myblue"
                onClick={handleSignIn}
                >
                Already have an account? Sign In
                </Button>
            </Box>
            </Box>
        </Container>
        </ThemeProvider>
    );
}

export default SignupPage;
