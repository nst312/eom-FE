import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { openAnnouncementDialog } from '../store/announcementSlice';
import withReducer from '../../../../store/withReducer';
import reducer from '../store';
import AnnouncementDialog from './AnnouncementDialog';
import PostAnnouncementList from '../post-announcement-list/PostAnnouncementList';
import FusePageCarded from '../../../../../@fuse/core/FusePageCarded/FusePageCarded';
import PostAnnouncementHeader from '../post-announcement-list/PostAnnouncementHeader';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
  '& .FusePageCarded-content': {
    display: 'flex',
  },
  '& .FusePageCarded-contentCard': {
    overflow: 'hidden',
  },
}));


const PostAnnouncement = () => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState('');

  const openDialog = () => {
    dispatch(openAnnouncementDialog());
  };



  const onSelectId = (value) => {
    setSelectedId(value);
  };

  return (
    <>
      <Root
        header={
          <PostAnnouncementHeader
          // setLoading={(e) => onLoadingFalse(e)}
          // loading={loading}
          // onSearch={onSearch}
          />
        }
        content={<PostAnnouncementList />}
        innerScroll
      />

      <AnnouncementDialog selectedId={selectedId} setSelectId={onSelectId} />
    </>
  );
};

export default withReducer('announcementApp', reducer)(PostAnnouncement);
