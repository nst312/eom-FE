import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import withRouter from '@fuse/core/withRouter';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Fade } from '@mui/material';
import { debounce } from 'lodash';
import ClientListTableHead from './ClientListTableHeader';
import { getClient, removeClients, selectClient } from '../store/clientSlice';
import FuseProgress from '../../Components/FuseProgress';
import constants from '../../../../fuse-configs/constants';

function ClientListTable(props) {
  const dispatch = useDispatch();
  const clients = useSelector(selectClient);
  const [selected, setSelected] = useState([]);
  const totalCount = useSelector(({ clientsApp }) => clientsApp.clients.totalCount);
  const [data, setData] = useState(clients);
  const [page, setPage] = useState(1);
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    if (atEnd && !loadingMore && !isLastPage) {
      setLoadingMore(true);
      setPage(page + 1);
      getClientData();
    }
    if (!isLastPage && data.length >= totalCount) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [dispatch, atEnd, loadingMore]);

  useEffect(() => {
    if (clients) {
      if (atEnd) {
        setData([...data, ...clients]);
        setAtEnd(false);
      } else {
        setData(clients);
      }
    }
  }, [clients]);

  const getClientData = () => {
    dispatch(getClient({ page: 1, perPage: 10 })).then((res) => {
      setData(res.payload);
      setLoading(false);
      setLoadingMore(false);
    });
  };

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

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/apps/client/${item.id}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          Clients not found!
        </Typography>
      </motion.div>
    );
  }

  function deleteClients() {
    dispatch(removeClients(selected)).then((res) => {
      getClientData();
    });
    setSelected([]);
  }

  return loading ? (
    <FuseProgress />
  ) : (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ClientListTableHead
            selectedEmployeeIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
            onDelete={deleteClients}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            ).map((n, index) => {
              const isSelected = selected.indexOf(n.id) !== -1;

              return (
                <TableRow
                  className="h-72 cursor-pointer"
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  key={index}
                  selected={isSelected}
                  onClick={(event) => handleClick(n)}
                >
                  <TableCell className="w-40 md:w-64 text-center" padding="none">
                    <Checkbox
                      checked={isSelected}
                      onClick={(event) => event.stopPropagation()}
                      onChange={(event) => handleCheck(event, n.id)}
                    />
                  </TableCell>
                  <TableCell className="w-52 px-8" scope="row" padding="none">
                    <img
                      src={
                        n.avatar_url !== null && n.avatar_url !== ''
                          ? `${constants.API_URL}/api/clients/logo/${n.avatar_url}`
                          : 'assets/images/avatars/profile.jpg'
                      }
                    />
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.client_type}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.client_name}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.contact_number}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.work_email}
                  </TableCell>
                  <TableCell className="p-4 md:p-16" component="th" scope="row">
                    {n.website}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
    </div>
  );
}
export default withRouter(ClientListTable);
