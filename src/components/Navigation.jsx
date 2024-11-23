import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import logoNav from '../assets/logoNav.svg';
import logoNavMobile from '../assets/logoNavMobile.svg';
import { useTheme } from '@mui/material/styles';

const pages = ['Inicio', 'Usuarios', 'Edificios'];

function Navigation() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logoNav} alt="EntrePisos" />
            </Link>
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: theme.palette.primary.main }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page} 
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={`/${page === "Inicio" ? "" : page.toLowerCase()}`}
                  sx={{ textAlign: 'center', color: theme.palette.text.default }}
                >
                  <Typography variant="inherit" sx={{ color: theme.palette.text.default, textTransform: 'none' }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Link to="/">
              <img src={logoNavMobile} alt="EntrePisos" style={{ height: '40px', width: 'auto' }} />
            </Link>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <MenuItem 
                key={page} 
                component={Link}
                to={`/${page === "Inicio" ? "" : page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{
                  color: theme.palette.text.default,
                  textAlign: 'center',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <Typography variant="inherit" sx={{ color: theme.palette.text.default, textDecoration: 'none' }}>
                  {page}
                </Typography>
              </MenuItem>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;