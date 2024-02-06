import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { createFilterOptions } from '@mui/material/Autocomplete';
import _ from '@lodash';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import * as yup from 'yup';
import { Edit } from '@mui/icons-material';
import moment from 'moment';
import { CircularProgress, Fade } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { debounce } from 'lodash';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import {
  getAllAnnouncement,
  openEditAnnouncementDialog,
  removeAnnouncement,
} from '../store/announcementSlice';
import PostAnnouncementHead from './PostAnnouncementHead';
import FuseScrollbars from '../../../../../@fuse/core/FuseScrollbars';
import withRouter from '../../../../../@fuse/core/withRouter';

const defaultValues = {
  message: '',
};
const schema = yup.object().shape({
  message: yup.string().required('You must enter message'),
});

function PostAnnouncementList() {
  const dispatch = useDispatch();
  const getAnnouncementData = useSelector(
    ({ announcementApp }) => announcementApp.announcement.announcementData
  );
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });
  const announceDialog = useSelector(
    ({ announcementApp }) => announcementApp.announcement.AnnouncementDialog
  );
  const [selectValue, setSelectValue] = useState(null);
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { handleSubmit, formState, reset, control, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const filter = createFilterOptions();
  const { errors, isValid, dirtyFields } = formState;
  const totalCount = useSelector(({ announcementApp }) => announcementApp.announcement.totalCount);

  useEffect(() => {
    if (atEnd && !loadingMore && !isLastPage) {
      setLoadingMore(true);
      setPage(page + 1);
      getDetailsAllAnnouncement();
    }
    if (!isLastPage && data?.length >= totalCount) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [dispatch, atEnd, loadingMore]);

  useEffect(() => {
    if (getAnnouncementData) {
      if (atEnd) {
        setData([...data, ...getAnnouncementData]);
        setAtEnd(false);
      } else {
        setData(getAnnouncementData);
      }
    }
  }, [getAnnouncementData]);

  const user = useSelector(({ auth }) => auth.user);

  const { company_id } = user


  const getDetailsAllAnnouncement = () => {
    dispatch(getAllAnnouncement({ page, perPage: 10 , companyId:company_id })).then((res) => {
      setData(res.payload);
      setLoadingMore(false);
      setLoading(false);
    });
  };

  const onEditAnnouncement = (announceData) => {
    dispatch(openEditAnnouncementDialog(announceData));
  };

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      // setSelected(props.positionData.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';
    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }
    setOrder({
      direction,
      id,
    });
  }

  function handleDeselect() {
    setSelected([]);
  }

  if (data?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          Announcement not found!
        </Typography>
      </motion.div>
    );
  }

  function deleteAnnouncement(item) {
    dispatch(removeAnnouncement(item)).then((res) => {
      if (res) {
        const newArr = [...data];
        const allData = newArr.filter((el) => el.id !== item);
        setData(allData);
      }
    });
    // setSelected([]);
  }

  return (
    // <div className="p-16 pt-0 sm:p-24 sm:pt-0 w-full">
    //   {getAnnouncementData && getAnnouncementData.length > 0 && (
    //     <motion.div variants={container} initial="hidden" animate="show">
    //       {getAnnouncementData.map((_item) => (
    //         <Paper
    //           component={motion.div}
    //           variants={item}
    //           className="p-16 mb-16 rounded-16 shadow overflow-hidden"
    //           key={_item.id}
    //         >
    //           <div className="flex">
    //             <div className="w-5/6">
    //               <div className="flex ">
    //                 <Typography
    //                   className="text-18 pr-4 font-medium cursor-pointer"
    //                   sx={{
    //                     color: blue[800],
    //                   }}
    //                 >
    //                   {moment(_item.createdAt).format('DD MM YYYY')} :
    //                 </Typography>
    //                 <Typography
    //                   className="text-18 font-medium cursor-pointer ml-4 "
    //                   sx={{
    //                     color: blue[800],
    //                   }}
    //                 >
    //                   {_item.message}
    //                 </Typography>
    //               </div>
    //             </div>
    //             <div className="w-1/6 flex justify-end items-end cursor-pointer">
    //               <Stack direction="row" spacing={2}>
    //                 <Button
    //                   variant="outlined"
    //                   startIcon={<EditRounded />}
    //                   onClick={() => onEditAnnouncement(_item)}
    //                 >
    //                   Edit
    //                 </Button>
    //               </Stack>
    //               <Stack direction="row" spacing={2} className="ml-8">
    //                 <Button variant="outlined" startIcon={<DeleteIcon />}>
    //                   Delete
    //                 </Button>
    //               </Stack>
    //             </div>
    //           </div>
    //         </Paper>
    //       ))}
    //     </motion.div>
    //   )}
    // </div>

    <div className="w-full flex flex-col">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <PostAnnouncementHead
            selectedProductIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            // rowCount={props?.positionData?.length}
            onMenuItemClick={handleDeselect}
          />
          <TableBody>
            {_.orderBy(
              data && data?.length > 0 && data,
              [
                (o) => {
                  switch (order.id) {
                    case 'categories': {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                  >
                    <TableCell style={{ width: '75%' }}>{n.message}</TableCell>

                    <TableCell>{moment(n?.createdAt).format('DD/MM/YYYY')}</TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      <Tooltip title="Edit">
                        <IconButton onClick={() => onEditAnnouncement(n)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => deleteAnnouncement(n.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {data?.length < totalCount && (
          <Box className="relative flex justify-center p-12">
            {data?.length >= 10 && (
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

      {/* <Dialog open={open} onClose={handleClose}> */}
      {/*  <DialogTitle>Delete Job Position</DialogTitle> */}
      {/*  <DialogContent> */}
      {/*    <DialogContentText>Are you sure you want to delete?</DialogContentText> */}
      {/*  </DialogContent> */}
      {/*  <DialogActions> */}
      {/*    <Button onClick={(e) => onDeleteJobPosition(selectedId)}>Yes</Button> */}
      {/*    <Button onClick={(e) => handleClose()}>No</Button> */}
      {/*  </DialogActions> */}
      {/* </Dialog> */}
    </div>
  );
}

export default withRouter(PostAnnouncementList);
