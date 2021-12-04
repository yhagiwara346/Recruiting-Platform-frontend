import {React, Fragment, useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider from '@mui/material/Divider';
import {Card, CardContent, CardHeader, CardActionArea } from '@mui/material';

const JobCard =({title, description, company}) => {
    return (<Card sx={{mb:2}}>
        <CardActionArea>
          <CardHeader
            sx={{pb:0}}
            avatar={
              <Avatar alt="Google" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTgXvZycVg8nFhEteByZ-aL16Jv-2bNch2GdfV&s=0" />
            }
            title={title}
            subheader={company}
          />
          <CardContent>
            <Typography
                      sx={{ display: "flex", mb:1 }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      >
              <Chip sx={{mr:.5}} size="small" icon={<WorkIcon />} label="Full Time" />
              <Chip size="small" icon={<LocationOnIcon />} label="Palo Alto" />
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary">{description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>)

}

export default JobCard;
