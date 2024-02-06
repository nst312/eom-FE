import StarIcon from '@mui/icons-material/Star';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ratingPost } from './store/postsSlice';


const defaultValues = [];

export default function PostRatingDialog(props) {
  const dispatch = useDispatch();
  const { handleSubmit, control, register, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      rating: []
    }
  });

  const { fields, append } = useFieldArray({
    control,
    name: "rating",
  });

  const [isSubmitRating, setIsSubmitRating] = useState({
    rating: false,
    feedback: false,
  });
  const [isDefaultData, setIsDefaultData] = useState(false);
  const [isShowQuestionModal, setIsShowQuestionModal] = useState(false);

  useEffect(() => {
    let data = [...props.postsAccepted]
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        data[i] = { ...data[i], rating: 0, feedback: '' }
        defaultValues[i] = { userId: data[i].userId, rating: 0, feedback: '', displayName: data[i].acceptBy.displayName }
        if (i === data.length - 1) {
          setIsDefaultData(true)
        }
      }
    }
  }, [props.isShowPostRatingDialog])

  useEffect(() => {
    if (isDefaultData) {
      append(defaultValues);
    }
  }, [isDefaultData])

  const handleClickOpen = () => {
    setIsShowQuestionModal(true);
  };

  const handleClose = () => {
    setIsShowQuestionModal(false);
  };

  function onSubmit(data) {
    const newData = []
    if (isSubmitRating.rating || isSubmitRating.feedback) {
      for (let i = 0; i < data.rating.length; i++) {
        if (data.rating[i].rating > 0 || data.rating[i].feedback !== '') {
          newData.push({
            userId: data.rating[i].userId,
            rating: data.rating[i].rating,
            feedback: data.rating[i].feedback
          })
        }
        if (i === data.rating.length - 1) {
          dispatch(ratingPost({ id: props.postId, data: newData })).then(res => {
            props.handleClose()
          });
        }
      }
    } else {
      handleClickOpen()
    }

  }

  const onAgreePress = () => {
    dispatch(ratingPost({ id: props.postId, data: [] })).then(res => {
      setIsShowQuestionModal(false);
      props.handleClose()
    });
  }

  return (
    <>
      <Dialog open={props.isShowPostRatingDialog} onClose={props.handleClose} fullWidth maxWidth="md" scroll="body">
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              Add rating
            </Typography>
          </Toolbar>
        </AppBar>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent classes={{ root: 'p-0' }}>
            <div className="px-16 mt-16 sm:px-24">
              <FormControl className="mt-8 mb-16" required fullWidth>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Feedback</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fields && fields?.map((item, index) => {
                        return (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell scope="row">
                              <Typography>
                                {item.displayName}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                }}
                              >
                                <FormControl required fullWidth>
                                  <Rating
                                    name={`rating[${index}]rating`}
                                    onChange={(event, newValue) => {
                                      setIsSubmitRating({ ...isSubmitRating, rating: true })
                                      setValue(`rating.${index}.rating`, newValue);
                                    }}
                                    size="large"
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                  />
                                </FormControl>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <FormControl required fullWidth>
                                <TextField
                                  name={`rating[${index}]feedback`}
                                  {...register(`rating.${index}.feedback`)}
                                  onChange={(event) => {
                                    if (event.target.value.replace(/ /g, '') !== '') {
                                      setIsSubmitRating({ ...isSubmitRating, feedback: true })
                                    } else {
                                      setIsSubmitRating({ ...isSubmitRating, feedback: false })
                                    }
                                  }}
                                  label="Feedback"
                                  variant="outlined"
                                />
                              </FormControl>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </FormControl>
            </div>
          </DialogContent>


          <DialogActions className="justify-between px-8 py-16">
            <div className="px-16">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
              >
                Submit
              </Button>
            </div>
          </DialogActions>
        </form>
      </Dialog >
      <div>
        <Dialog
          open={isShowQuestionModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to submit and close question without rating?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={onAgreePress} autoFocus> Submit </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}