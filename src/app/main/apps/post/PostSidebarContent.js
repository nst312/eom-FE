import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilters } from './store/filtersSlice';
import { selectFolders } from './store/foldersSlice';
import { selectLabels } from './store/labelsSlice';
import { openNewPostDialog, getAllPosts, getMyPosts } from './store/postsSlice';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  color: 'inherit!important',
  textDecoration: 'none!important',
  height: 40,
  width: '100%',
  borderRadius: 6,
  paddingLeft: 12,
  paddingRight: 12,
  marginBottom: 4,
  '&.active': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, .05)!important'
        : 'rgba(255, 255, 255, .1)!important',
    pointerEvents: 'none',
    '& .list-item-icon': {
      color: 'inherit',
    },
  },
  '& .list-item-icon': {
    fontSize: 16,
    width: 16,
    height: 16,
    marginRight: 16,
  },
}));

function PostSidebarContent(props) {
  const dispatch = useDispatch();
  const labels = useSelector(selectLabels);
  const folders = useSelector(selectFolders);
  const filters = useSelector(selectFilters);
  const user = useSelector(({ auth }) => auth.user);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.4 } }}
      className="flex-auto border-l-1 border-solid"
    >
      <div className="p-24 pb-16">
        <Button
          onClick={() => {
            dispatch(openNewPostDialog());
          }}
          variant="contained"
          color="secondary"
          className="w-full"
        >
          Ask Question
        </Button>
      </div>

      <div className="px-12">
        <List>
          <StyledListItem
            button
            component={NavLinkAdapter}
            to="/apps/post/all"
            activeClassName="active"
            onClick={() => {
              dispatch(getAllPosts({ userId: user.id, page: 1, perPage: 10 }));
            }}
          >
            <Icon className="list-item-icon" color="action">
              format_list_bulleted
            </Icon>
            <ListItemText primary="All" disableTypography />
          </StyledListItem>
          <StyledListItem
            button
            component={NavLinkAdapter}
            to="/apps/post/myPost"
            activeClassName="active"
            onClick={() => {
              dispatch(getMyPosts({ userId: user.id, page: 1, perPage: 10 }));
            }}
          >
            <Icon className="list-item-icon" color="action">
              post_add
            </Icon>
            <ListItemText primary="My Questions" disableTypography />
          </StyledListItem>
        </List>
      </div>
    </motion.div>
  );
}

export default PostSidebarContent;
