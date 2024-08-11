'use client';
import { useState } from 'react';
import { Box, Button, Container, Typography, AppBar, Toolbar, CssBaseline, Stack, Modal, IconButton, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ChatBot from '../chatbot/page';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

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
        },
    },
});

const LandingPage = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <ThemeProvider theme={themePrimary}>
            <CssBaseline />
            <AppBar position="static" color="inherit" sx={{ bgcolor: '#1f1f1f', boxShadow: '0 12px 24px rgba(0,0,0,0.3)' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                    
                        <Typography variant="h4" color="inherit" fontWeight={'bold'}>
                    Codefixer<span style={{ color: "#00fffb" }}>AI</span> 
                </Typography>
                    </Stack>

                    <Button variant="contained" sx={{ border: `2px solid #00fffb`, boxShadow: '0 12px 24px rgba(0,0,0,0.3)' }} onClick={handleOpen}>
                        Help
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', textAlign: 'center', backgroundColor: themePrimary.palette.background.paper }}>
                <Box sx={{ mt: '10%', backgroundColor: themePrimary.palette.background.paper, padding: '40px', borderRadius: '12px', boxShadow: '0 40px 50px rgba(0,0,0,0.5)', width: '100%', maxWidth: '700px' }}>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                        <span><span style={{ fontWeight: 'bold', color: "#00fffb" }}>Code Queries?</span> <span></span>Get Code-Cracking Solutions  </span>
                    </Typography>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold', mt: '3%' }}>
                     Get Answers from Experts 
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mt: '5%' }}>
                        
                        <Button variant="contained" sx={{ border: `2px solid #00fffb`, boxShadow: '0 12px 24px rgba(0,0,0,0.3)' }} onClick={handleOpen}>
                       Ask 
                    </Button>
                    </Stack>
                </Box>
             
            </Container>
            <Modal open={open} onClose={handleClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ bgcolor: 'transparent' }}>
                    <ChatBot />
                </Box>
            </Modal>
           
            <Box sx={{ textAlign: 'center', py: 4, bgcolor: '#1f1f1f', color: '#ffffff' }}>
                <Typography>
                    Copyright © 2024 Codefixer<span style={{ fontWeight: 'bold', color: "#00fffb" }}>AI</span>  - <span style={{ fontWeight: 'bold', color: "#00fffb" }}></span>. All rights reserved.
                </Typography>
            </Box>
        </ThemeProvider>
    );
}

export default LandingPage;
