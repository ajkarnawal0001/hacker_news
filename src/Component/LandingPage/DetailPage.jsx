import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { detailUrl } from '../Redux/actionTypes';
import { Cont } from './Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { textAlign } from '@mui/system';

export const DetailPage = () => {
  const params = useParams();
  const [detailNews, setDetailNews] = useState();
  const [loading, setLoading] = useState(false);
  const objid = params.objectID;
  const fetchDetails = () => {
    setLoading(true);
    const url = `${detailUrl}${objid}`;
    axios.get(url).then((res) => {
      console.log(res.data);
      setDetailNews(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return (
    <>
      <Cont>
        <Heading>News Details</Heading>
        {loading ? (
          <h1>loading</h1>
        ) : (
          <>
            <h3 style={{
                textAlign:"center",
                padding:"3px"
            }}>Title: {detailNews.title}</h3>
            <h3 style={{
                textAlign:"center",
                padding:"3px"
            }}>Points: {detailNews.points}</h3>
            <Details>
              <Heading>Children</Heading>
              <List>
                <Divider variant="inset" component="li" />
                {detailNews.children.map((item) => (
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={`${item.author}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{
                              display: 'inline',
                              fontSize: '19',
                              alignItems: 'center',
                              padding: '3px',
                              textAlign: 'center',
                            }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            fontSize={12}
                          >
                            Comment:
                          </Typography>
                          {`${item.text}`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Details>
          </>
        )}
      </Cont>
    </>
  );
};

const Heading = styled.h1`
  text-align: center;
  padding: 5px;
  font-size: 28px;
`;

const Details = styled.div`
  padding: 4px;
  border: 1px solid black;
  font-size: 17px;
`;
