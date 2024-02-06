import Button from '@mui/material/Button';
import { amber } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLabelsEntities } from './store/labelsSlice';
import { openEditPostDialog, acceptPost } from './store/postsSlice';
import PostChip from './PostChip';
import PostRatingDialog from './PostRatingDialog';


const StyledListItem = styled(ListItem)(({ theme, completed }) => ({
  ...(completed && {
    background: 'rgba(0,0,0,0.03)',
    '& .post-title, & .post-notes': {
      textDecoration: 'line-through',
    },
  }),
}));

function PostListItem(props) {
  const dispatch = useDispatch();
  const labels = useSelector(selectLabelsEntities);
  const user = useSelector(({ auth }) => auth.user);
  const [isShowPostRatingDialog, setIsShowPostRatingDialog] = useState(false);


  const handleClose = () => {
    setIsShowPostRatingDialog(false);
  };

  const manageRatting = () => {
    setIsShowPostRatingDialog(true);
  }

  const onAcceptClick = (id) => {
    dispatch(acceptPost(id));
  }

console.log('ACCEPTED====', props)

  return (
    <StyledListItem
      className="py-20 px-0 sm:px-8 pointer"
      completed={props.post.completed ? 1 : 0}
      dense
    >
      <div
        onClick={(ev) => {
          if (props?.post?.createById === user.id) {
            ev.preventDefault();
            dispatch(openEditPostDialog(props.post));
          }
        }}
        className="flex flex-1 flex-col relative overflow-hidden px-8">
        <Typography
          className="post-title truncate text-14 font-medium"
          color={props.post.completed ? 'textSecondary' : 'inherit'}
        >
          {props.post.title}
        </Typography>

        <Typography color="textSecondary" className="post-notes truncate">
          {props.post.description}
        </Typography>

        <div className="flex font-500">
          Post by : <Typography color="textSecondary" className="post-notes truncate ml-2">{props.post.createdBy.displayName}</Typography>
        </div>

        {props?.post?.postsAccepted?.length > 0 &&
          <div className="flex -mx-2 mt-8">
            {props?.post?.postsAccepted?.map((label, index) => (
              <PostChip
                className="mx-2 mt-4"
                items={label}
                key={index}
              />
            ))}
          </div>
        }
      </div>
      {props?.post?.createById !== user.id && !props?.post?.isAcceptedByMe && props?.post?.status !== 'CLOSED'  &&
        <div className="px-8" onClick={() => onAcceptClick(props.post.id)}>
          <Button variant="outlined">Accept</Button>
        </div>
      }
      {props?.post?.createById === user.id && props?.post?.postsAccepted?.length > 0 &&
        (props?.post?.status === 'OPEN' || props?.post?.status === 'ACCEPTED' ? (
          <div className="w-92  justify-center flex" onClick={() => { manageRatting() }}>
            <Icon>star_outline</Icon>
          </div>
        ) : (
          <div className="w-92  justify-center flex">
            <Icon style={{ color: amber[500] }}>star</Icon>
          </div>
        ))
      }
      {
        isShowPostRatingDialog &&
        <PostRatingDialog
          postId={props?.post?.id}
          handleClose={handleClose}
          isShowPostRatingDialog={isShowPostRatingDialog}
          postsAccepted={props?.post?.postsAccepted}
        />
      }
    </StyledListItem>
  );
}

export default PostListItem;
