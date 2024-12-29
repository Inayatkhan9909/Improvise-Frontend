import React, { useContext } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Button,
    InputBase,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon, AccountCircle, Search as SearchIcon } from '@mui/icons-material';
import { useAuth } from '../auth/hooks/useAuth'; // Access global user data
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../auth/Context/userContext';

const StyledSearch = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[200],
    padding: '0 10px',
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    maxWidth: '400px',
}));

const Navbar: React.FC = () => {
    const {  logout } = useAuth();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
            <Toolbar>
                {/* Logo */}
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    Classify
                </Typography>

                {/* Search Bar */}
                <StyledSearch>
                    <SearchIcon sx={{ marginRight: '8px' }} />
                    <InputBase
                        placeholder="Search for classes..."
                        inputProps={{ 'aria-label': 'search' }}
                        sx={{ width: '100%' }}
                    />
                </StyledSearch>

                {/* Desktop Navigation Links */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: 2 }}>
                    <Button color="inherit" onClick={() => navigate('/classes')}>Classes</Button>
                    <Button color="inherit" onClick={() => navigate('/instructors')}>Instructors</Button>
                    <Button color="inherit" onClick={() => navigate('/about')}>About Us</Button>
                    <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
                </Box>

                {/* Mobile Menu Button */}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { md: 'none' }, marginLeft: 1 }}
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>

                {/* User Profile / Authentication Menu */}
                <IconButton color="inherit" onClick={handleMenuClick}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {user ? (
                        <>
                            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem onClick={() => navigate('/login')}>Login</MenuItem>
                            <MenuItem onClick={() => navigate('/signup')}>Sign Up</MenuItem>
                        </>
                    )}
                </Menu>
            </Toolbar>

            {/* Mobile Drawer */}
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List sx={{ width: 250 }}>
                    <ListItemButton onClick={() => navigate('/classes')}>
                        <ListItemText primary="Classes" />
                    </ListItemButton>
                    <ListItemButton  onClick={() => navigate('/instructors')}>
                        <ListItemText primary="Instructors" />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/about')}>
                        <ListItemText primary="About Us" />
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('/contact')}>
                        <ListItemText primary="Contact" />
                    </ListItemButton>
                </List>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
