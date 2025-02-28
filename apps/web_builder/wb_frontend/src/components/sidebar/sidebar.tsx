import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

const items = [
  { text: 'Dashboard', icon: '/header_img/akar-icons_folder.png', url: '/dashboard' },
  { text: 'Project', icon: '/header_img/akar-icons_folder.png', url: '/projects' },
  { text: 'Your Template', icon: '/header_img/carbon_template.png', url: '/templates' },
  { text: 'Learn', icon: '/header_img/fluent_learning-app-24-regular.png', url: '/learn' },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setIsExpanded(false);
    }
  };

  const toggleSidebar = () => {
    setIsExpanded(true);
    setIsClicked(true);
  };

  const closeSidebar = () => {
    setIsExpanded(false);
    setIsClicked(false);
  };

  const handleMenuClick = (url: string) => {
    if (window.innerWidth < 768) {
      if (!isClicked) {
        toggleSidebar();
      } else {
        navigate(url);
        closeSidebar();
      }
    } else {
      navigate(url);
      closeSidebar();
    }
  };

  const handleClickOutside = (event: any) => {
    const sidebarElement = event.target.closest('.sidebar');
    if (!sidebarElement && isExpanded) {
      closeSidebar();
    }
  };

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      document.addEventListener("click", handleClickOutside);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
      }}
    >
      {isExpanded && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 90,
          }}
        />
      )}

      <Box
        className="sidebar"
        sx={{
          width: isExpanded ? '200px' : '70px',
          backgroundColor: 'var(--side-bar--bg)',
          color: 'white',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          transition: 'width 0.3s',
        }}
        role="presentation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={toggleSidebar}>
              <ListItemIcon>
                <img
                  src="/header_img/Group 12519.png"
                  alt="Logo"
                  style={{
                    width: '40px',
                    height: '40px',
                    transition: 'width 0.3s, height 0.3s',
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary="Ranoar"
                sx={{ display: isExpanded ? 'block' : 'none' }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          {items.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleMenuClick(item.url)}>
                <ListItemIcon>
                  <img
                    src={item.icon}
                    alt={item.text}
                    style={{ width: '24px', height: '24px' }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ display: isExpanded ? 'block' : 'none' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
      </Box>
    </Box>
  );
}
