import React, { useEffect, useState } from 'react';
import { TextField, Grid, Card, CardContent, Typography, Button, Drawer,Chip } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import axios from 'axios';
import ApiConstants from '../../Services/apiconstants';

import './homePageJobLists.css'; 

const HomePageJobLists = () => {

  
  const { promiseInProgress } = usePromiseTracker();

  const [searchTerm, setSearchTerm] = useState('');
  const [allJobData, setAllJobData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const resultsPerPage = 6;
  const [drawerOpen, setDrawerOpen] = useState(false);


  const getAllJobList = () => {
    trackPromise( 
       axios.get(ApiConstants.ALL_JOBS).then((res) => {
       setAllJobData(res.data.jobs)
       const defaultResults = res.data.jobs.slice(0, 6);
       setSearchResults(defaultResults)
      }).catch((error) => {
        console.log(error)
      })
  )
}

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query); 
    const results = allJobData.filter((item) =>
      item.jobTitle.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
    setCurrentPage(1); 
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleViewMore = (card) => {
    setSelectedCard(card);
    setDrawerOpen(true);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  const checkLogin = () => {
    window.location = '/'
  }

  useEffect(() => {
    getAllJobList()
  },[])

  return (
    <div className="search-container" style={{ marginTop: "50px" }}>
      <TextField
        label="Search job title / keywords ,or Company"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      {currentResults.length > 0 ? (
        <>
          <Grid container spacing={2} className="results-container">
            {currentResults.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="div">
                    {truncateText(item.jobTitle, 30)}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {item.companyId.companyName} - {item.city}, {item.state},{" "}
                      {item.country}
                    </Typography>
                 
                   <Typography variant="body2" component="div" sx={{ mt: 2 }}>
          <strong>Skills Required:</strong>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {item.skillRequired.slice(0, 3).map(skill => (
              <Grid item key={skill.skillId._id}>
                <Chip
                  label={skill.skillId.skill.length > 10 ? `${skill.skillId.skill.substring(0, 10)}...` : skill.skillId.skill}
                  variant="outlined"
                />
              </Grid>
            ))}
            {item.skillRequired.length > 3 && (
              <Grid item>
                <Chip label={`+${item.skillRequired.length - 3}`} variant="outlined" />
              </Grid>
            )}
          </Grid>
        </Typography>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end" , marginTop:"10px" }}
                    >
                      <Button
                        onClick={() => handleViewMore(item)}
                        variant="outlined"
                        size="small"
                      >
                        Know More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(searchResults.length / resultsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            className="pagination"
            color="primary"
            style={{ marginBottom: "50px" }}
          />
        </>
      ) : (
        <Typography variant="body1" className="no-results">
          No results found
        </Typography>
      )}

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: '75%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '75%',
          },
        }}
      >
        <div className="drawer-content">
          {selectedCard && (
            <div>
               <Typography variant="h5" component="div"  sx={{ m: 4 }}>
                      {selectedCard.jobTitle}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom  sx={{ m: 4 }}>
                      {selectedCard.companyId.companyName} - {selectedCard.city}, {selectedCard.state},{" "}
                      {selectedCard.country}
                    </Typography>
               <Typography variant="body2" component="div" sx={{ m: 4 }}>
          <strong>Job Description:</strong>
          <div dangerouslySetInnerHTML={{ __html: selectedCard.jobDescription }} />
        </Typography>

             
        <Typography variant="body2" component="div" sx={{ m: 4 }}>
          <strong>Skills Required:</strong>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {selectedCard.skillRequired.map((skill) => (
              <Grid item key={skill.skillId._id}>
                <Chip label={skill.skillId.skill} variant="outlined" />
              </Grid>
            ))}
          </Grid>
        </Typography>

        <div className="d-flex justify-content-center">
                <button className='btn btn-outline-primary m-3' onClick={checkLogin} >
                  Apply for this Job
                </button>
           </div>

            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
};



export default HomePageJobLists;


