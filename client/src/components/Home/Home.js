import React, {useState, useEffect} from 'react';
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Tooltip } from '@material-ui/core';
import {ClickAwayListener} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from "material-ui-chip-input";
import { getPosts } from '../../actions/actionPost';
import useStyles from "../../styles";
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import { getPostsBySearch } from '../../actions/actionPost';

function useQuery(){
  return new URLSearchParams(useLocation().search);
} //this function will get the query string from the url

// this component will display the home page of the app, it will display the posts and the form to create a new post
const Home = () => {

    const [currentId, setCurrentId] = useState(null); // this state will be used to determine if we are in editing mode or not
  
    const dispatch = useDispatch(); // dispatch an action
    const query = useQuery(); // get the query string from the url
    const history = useHistory(); // get the history of the app
    const page = query.get('page') || 1 // get the page number from the query string, if there is no page number, set it to page 1
    const searchQuery = query.get('searchQuery') // get the search query from the query string
    const classes = useStyles(); 
    const [search, setSearch] = useState('') // if text is typed into the search bar, set the search state to the text
    const [tags,setTags] = useState([])  // same as above but for tags
    const [open, setOpen] = useState(false); // this state will be used to determine if the tooltip is open or not

    const handleTooltipClose = () => {
      setOpen(false);
    }; 
  
    const handleTooltipOpen = () => {
      setOpen(true);
    };
    //basically added tooltips for more readability and better user experience
  //console.log(query.get('page') || 1, "hello")
    // useEffect(()=>{
    // dispatch(getPosts());
    // },[currentId,dispatch])
    
    const searchPost= ()=>{
      if(search.trim() || tags){
        dispatch(getPostsBySearch({search, tags: tags.join(',')}));
        history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(',')}`)
      }  // if the search bar is not empty or the tags array is not empty, dispatch the getPostsBySearch action and push the search query to the url
      else{
        history.push('/')
      }
    }
    const handleKeyPress = (e) => {
      if(e.keyCode === 13){
         searchPost()
      }// if the enter key is pressed, call the searchPost function
    }

    const handleAdd = (tag) => setTags([...tags, tag]); // if a tag is added, add it to the tags array
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete)) // if a tag is deleted, remove it from the tags array
    // Note: the tags array must be populated first in order to search by tags, by pressing enter
  return (
    <Grow in>
        <Container maxWidth='xl'>
          <Grid className={classes.mainContainer} container justifyContent = "space-between" alignItems="stretch" spacing={3}>
           <Grid item xs={12} sm={7} md={9}>
             <Posts setCurrentId = {setCurrentId} />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
            
            <AppBar className={classes.appBarSearch} position="static" color='inherit'>
              <TextField 
              
              name='search' 
              variant='outlined' 
              label="Search Memories"
              onKeyPress={handleKeyPress}

              fullWidth 
              value={search} 
              onChange={(e)=>setSearch(e.target.value)}
              />
              <ClickAwayListener onClickAway={handleTooltipClose}>
               <Tooltip  onClose={handleTooltipClose}
                open={open}
                disableFocusListener 
                disableHoverListener
                disableTouchListener 
                title="Input a Tag and press Enter before submitting"
                placement='right'>
              <ChipInput
              style={{margin: '10px 0'}}
              value={tags}
              onClick={handleTooltipOpen}
              onAdd = {handleAdd}
              onDelete = {handleDelete}
              label = "Search Tags"
              variant= "outlined"
              />
              </Tooltip>
              </ClickAwayListener>
              <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary"> Search  </Button>
            </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                   <Pagination page={page}/>
              </Paper>
               )}
           </Grid> 
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home