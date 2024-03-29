import React, {useEffect} from "react";
import {Pagination, PaginationItem} from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../actions/actionPost";
import useStyles from "./styles"


// Will be our pagination component, TLDR if you have more than 8 posts, it will paginate another page creating a better user experience 
const Paginate = ({page}) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const {numberOfPages} = useSelector((state) => state.posts)
  // console.log(page,"what page")
   useEffect(()=>{
    if(page){
    dispatch(getPosts(page));
    }
    },[dispatch,page])

   return (
    <Pagination
    classes={{ul: classes.ul}}
    count={numberOfPages}
    page={Number(page) || 1}
    variant="outlined"
    color="primary"
    renderItem={(item)=>(
        <PaginationItem
        {...item}
        component={Link}
        to={`/posts?page=${item.page}`}
        />
    )}
    />
   )
};

export default Paginate;