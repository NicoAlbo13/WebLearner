import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux";

export const SideBar = ({drawerWidth=240}) => {

  const {displayName} = useSelector(state => state.auth);

  return (
    <Box
    component='nav'
    sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
    >
      <Drawer
        variant="permanent" //temporary if conditional
        open
        sx={{display: {xs: 'block'},
          '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}}}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component='div'>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider/>

        <List>
          {
            ['one', 'two', 'three', 'four'].map((element)=>(
              <ListItem key={element} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot/>
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={element}/>
                    <ListItemText secondary='Sunt pariatur velit nisi nisi ullamco consectetur sit.'/>
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>

      </Drawer>
    </Box>
  )
}
