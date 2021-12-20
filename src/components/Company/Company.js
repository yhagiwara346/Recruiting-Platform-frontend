import {React, Fragment, useState} from "react";
import {useHistory, useLocation, useParams} from "react-router-dom";
import axios from "axios";
import { gql, useQuery, useMutation } from '@apollo/client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { Card, CardMedia, CardHeader, CardContent, CardActionArea, CardActions } from '@mui/material';

import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

import JobListCard from "../Card/JobListCard";

const GET_COMPANY_OPENINGS = gql`
  query Openings($id:Int!){
          openings(where:{companyId:$id}){
            id
            title
            description
            location
            candidate {
              first
              last
            }
            employment {
              title
            }
          }
        }`;

const GET_COMPANY = gql`
  query GetCompany($id:Int!){
          company(id:$id) {
            title
            description
            location
            website
          }
        }`;


export default function Company() {
  const uid = +sessionStorage.getItem("uid");
  var { id } = useParams();
  id = parseInt(id);
  const { loading, error, data } = useQuery(GET_COMPANY, {variables:{id}});

  const { data:openingsData, loading:openingsLoading } = useQuery(GET_COMPANY_OPENINGS, {variables:{id}});

  if (openingsLoading) return 'Loading...';

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return(
    <Container component="main">
      <Grid container sx={{ py: 2 }}>
        <Grid item md={6} sx={{ mx: 'auto' }}>
          <Card sx={{ mb: 2 }}>
            <Box alignItems='center' sx={{p:1, display:'flex'}}>
              <Avatar alt={data.company.title} src={"//logo.clearbit.com/"+data.company.title.toLowerCase()+".com"} />
              <Typography sx={{ml:1, fontWeight:'bold'}} component="h1" variant="h6">{data.company.title}</Typography>
            </Box>
            <CardMedia
              component="img"
              height="200"
              image="https://source.unsplash.com/random"
              alt="image alt"
            />
            <Divider/>
            <CardContent>
              <Typography sx={{fontWeight:'bold'}} component="h1" variant="h6">
                About {data.company.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.company.description}
              </Typography>
              <Typography sx={{fontWeight:'bold', mt:1}} variant="body2" component="h3">
                Website
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Link href={"//"+data.company.website}>{data.company.website}</Link>
              </Typography>
              <Typography sx={{fontWeight:'bold', mt:1}} variant="body2" component="h3">
                Headquarters
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.company.location}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography sx={{fontWeight:'bold'}} component="h2" variant="h6">
                Jobs at {data.company.title}
              </Typography>
            </CardContent>
              {openingsData.openings.map((o, idx) => {return (<div style={{marginBottom:'12px'}}>
              {idx > 0?
                <Divider variant="inset"/>
                :null}
                <JobListCard
                  key = {idx}
                  id = {o.id}
                  title = {o.title}
                  description={o.description.length > 10 ? o.description.substring(0, 80) + "..." : o.description}
                  company = {data.company.title}
                  first = {o.candidate.first}
                  last = {o.candidate.last}
                  location = {o.location}
                  employment = {o.employment.title}
                />
              </div>)})}
          </Card>
        </Grid>
      </Grid>
    </Container>);
}
