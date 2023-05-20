import { useState, useEffect } from 'react'
import { Stack, Box, Typography } from '@mui/material'

import { Sidebar, Videos } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then(
      (data) =>{
        setVideos(data.items)
      }
    )
  }, [selectedCategory])
  


  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row'} }}>
      <Box sx={{ width: { sx: '100%', md: '15%'}, height: { sx: 'auto', md: '92vh' }, borderRight: '1px solid #3d3d3d', px: { sx: 0, md: 2 } }}>
        <Sidebar selectedCategory={ selectedCategory } setSelectedCategory={ setSelectedCategory }/>

        {/* <Typography sx={{ mt: 1.5, color: '#fff' }}>
          CopyRight 2023
        </Typography> */}
      </Box>

      <Box p={2} sx={{ width: { sx: '100%', md: '85%'}, overflow: 'auto', height: '90vh', flex: 2}}>
        <Typography variant="h4" fontWeight='bold' mb={2} sx={{ color: '#fff'}}>
          { selectedCategory } <span style={{ color: '#f31503' }}>videos</span>
        </Typography>

        <Videos videos={ videos } />
      </Box>
    </Stack>
  )
}

export default Feed