import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { BASE_URL, fetchFromAPI, getSearchVideo } from "../utils/fetchFromAPI";
import { Videos } from "./";
import axios from "axios";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    getSearchVideo(searchTerm)
      .then(result => {
        setVideos(result);
      })
      .catch(err => {
        console.log(err);
      });
    let query = {
      query: `

      query{
        getVideo {
          video_id
          video_name
          thumbnail
          description
          views
          source
          user_id
          type_id
          users {
            full_name
          }
          video_type {
            type_name
          }
        }
      }


      `,
      variables: {},
    };
    axios.post(`${BASE_URL}/api`, query).then(response => {
      console.log(response);
    });
  }, [searchTerm]);

  return (
    <Box p={2} minHeight='95vh'>
      <Typography variant='h4' fontWeight={900} color='white' mb={3} ml={{ sm: "100px" }}>
        Search Results for <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display='flex'>
        <Box sx={{ mr: { sm: "100px" } }} />
        {<Videos videos={videos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
