import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { fetchFromAPI } from "../utils/fetchFromAPI"
import { Box } from "@mui/material"

import { Videos, ChannelCard } from './'

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState([]);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();
  
  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);
      setChannelDetail(data?.items[0]);
      const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);
      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{ background:' linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(2,2,124,1) 100%, rgba(0,212,255,1) 100%)', zIndex: 10, height: '300px' }} />
        <ChannelCard channelDetail={channelDetail} marginTop="-100px" />
      </Box>
      <Box p={2} display="flex">
          <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail