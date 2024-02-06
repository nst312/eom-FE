import Button from '@mui/material/Button';
import Hidden from '@mui/material/Hidden';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, setPostsSearchText } from './store/postsSlice';

function PostHeader(props) {
  const dispatch = useDispatch();
  const mainTheme = useSelector(selectMainTheme);
  const searchText = useSelector(({ postApp }) => postApp.posts.searchText);
  const user = useSelector(({ auth }) => auth.user);

  const handleSearch = () => {
    props.onSearch(true);
    dispatch(getAllPosts({ userId: user.id, searchKeyword: searchText, page: 1, perPage: 10 }))
      .then(res => {
        props.onSearch(false);
      });
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="flex flex-1">
        <Paper className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 shadow">
          <Hidden lgUp>
            <IconButton
              onClick={(ev) => props.pageLayout.current.toggleLeftSidebar()}
              aria-label="open left sidebar"
              size="large"
            >
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>

          <Icon color="action">search</Icon>

          <Input
            placeholder="Search"
            className="px-16"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && searchText !== '') {
                handleSearch()
              }
            }}
            onChange={(ev) => {
              if (ev.target.value === '') {
                dispatch(getAllPosts({ userId: user.id, page: 1, perPage: 10 }))
                  .then(res => {
                    props.onSearch(false);
                  });
              }
              dispatch(setPostsSearchText(ev))
            }}
          />
          <Button
            onClick={() => {
              handleSearch(searchText)
              props.onSearch(true);
            }}
            variant="contained"
            color="secondary"
            disabled={searchText.replace(/ /g, '') === ''}
          >
            Submit
          </Button>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default PostHeader;
