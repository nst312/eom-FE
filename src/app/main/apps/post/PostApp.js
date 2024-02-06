import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import { useRef, useState } from 'react';
import reducer from './store';
import PostDialog from './PostDialog';
import PostHeader from './PostHeader';
import PostList from './PostList';
import PostSidebarContent from './PostSidebarContent';
import PostSidebarHeader from './PostSidebarHeader';
import PostToolbar from './PostToolbar';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-content': {
    display: 'flex'
  },
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
}));

function PostApp(props) {
  const pageLayout = useRef(null);
  const [isSearch, setIsSearch] = useState(false);

  const onSearch = value => {
    setIsSearch(value);
  };

  return (
    <>
      <Root
        header={<PostHeader pageLayout={pageLayout} onSearch={onSearch} />}
        contentToolbar={<PostToolbar />}
        content={<PostList search={isSearch} />}
        leftSidebarHeader={<PostSidebarHeader />}
        leftSidebarContent={<PostSidebarContent />}
        ref={pageLayout}
        innerScroll
      />
      <PostDialog />
    </>
  );
}

export default withReducer('postApp', reducer)(PostApp);
