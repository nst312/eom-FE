import FuseLoading from '@fuse/core/FuseLoading';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { CircularProgress, Fade, Box, Button } from '@mui/material';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllPosts, getMyPosts, selectAllPost } from './store/postsSlice';
import PostListItem from './PostListItem';
import FuseProgress from '../Components/FuseProgress';


function PostList(props) {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const posts = useSelector(selectAllPost);
  const searchText = useSelector(({ postApp }) => postApp.posts.searchText);
  const totalCount = useSelector(({ postApp }) => postApp.posts.totalCount);
  const orderBy = useSelector(({ postApp }) => postApp.posts.orderBy);
  const user = useSelector(({ auth }) => auth.user);
  const orderDescending = useSelector(({ postApp }) => postApp.posts.orderDescending);
  const [filteredData, setFilteredData] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    function getFilteredArray(entities, _searchText) {
      if (_searchText.length === 0) {
        return posts;
      }
      return FuseUtils.filterArrayByString(posts, _searchText);
    }

    if (posts) {
      setFilteredData(
        _.orderBy(
          getFilteredArray(posts, searchText),
          [orderBy],
          [orderDescending ? 'desc' : 'asc']
        )
      );
    }
  }, [posts, searchText, orderBy, orderDescending]);


  useEffect(() => {
    if (atEnd && !loadingMore && !isLastPage) {
      setLoadingMore(true);
      setPage(page + 1);
      getPostData()
    }
    if (!isLastPage && data.length >= totalCount) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [dispatch, atEnd, loadingMore, routeParams]);

  useEffect(() => {
    if (props.search) {
      setData([]);
    }
    setPage(2);
    setIsLastPage(false);
  }, [props]);

  useEffect(() => {
    if (posts) {
      if (atEnd) {
        setData([...data, ...posts]);
        setAtEnd(false);
      } else {
        setData(posts);
      }
    }
  }, [posts]);

  const getPostData = () => {
    if (routeParams.folderHandle === "all") {
      dispatch(getAllPosts({ userId: user.id, page: page, perPage: 10 }))
        .then(res => {
          setLoadingMore(false);
          setLoading(false);
        }).catch(err => console.log('err school table', err));
    } else if (routeParams.folderHandle === "myPost") {
      dispatch(getMyPosts({ userId: user.id, page: page, perPage: 10 }))
        .then(res => {
          setLoadingMore(false);
          setLoading(false);
        }).catch(err => console.log('err school table', err));
    }
  }

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There are no questions!
        </Typography>
      </motion.div>
    );
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };


  if (loading) {
    return <FuseProgress />;
  }

  return (
    // <List className="p-0">
    <FuseScrollbars
      className="flex-grow overflow-x-auto"
      onYReachEnd={debounce(() => {
        setAtEnd(true);
      }, 100)}
    >
      <motion.div animate="show">
        {data.map((post) => (
          <motion.div variants={item} key={post.id}>
            <PostListItem post={post} />
          </motion.div>
        ))}
      </motion.div>

      {data.length < totalCount && (
        <Box className="relative flex justify-center p-12">
          {data.length >= 10 && (
            <Fade in={!loadingMore}>
              <Button
                className="absolute"
                variant="text"
                onClick={debounce(() => setAtEnd(true), 100)}
              >
                Load More
              </Button>
            </Fade>
          )}
          <Fade in={loadingMore}>
            <CircularProgress className="absolute" color="secondary" />
          </Fade>
        </Box>
      )}
    </FuseScrollbars>
    // </List>
  );
}

export default PostList;
