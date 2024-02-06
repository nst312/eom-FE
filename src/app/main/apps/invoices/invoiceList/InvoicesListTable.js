import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Checkbox, Fade, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getAllInvocies, setAllInvoiceData, setInvoiceCount } from '../store/invoicesSlice';
import InvoiceTableHeader from './InvoiceTableHeader';
import { downloadInvoicePdf, sendInvoiceWithMail } from '../store/invoicesBillingSlice';

const rupeeIndian = Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
});

function InvoicesListTable(props) {
  const {filter, setPage, page} = props;
  const [selected, setSelected] = useState([]);
  const data = useSelector((state) => state.invoicesApp?.invoices?.allInvoices);
  const totalCount = useSelector((state) => state.invoicesApp?.invoices?.totalCount);
  const navigate = useNavigate();
  const [isProgress, setIsProgress] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  function handleClick(item) {
    navigate(`/app/invoices/${item.id}`);
  }

  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'asc';
    if (order.direction === 'asc') {
      direction = 'desc';
    }

    setOrder({
      direction,
      id,
    });
    dispatch(setAllInvoiceData([]));
    setAtEnd(true);
    setPage(1);
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

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setAllInvoiceData([]));
    };
  }, []);

  useEffect(() => {
    if (atEnd || filter || !filter) getAllInvoicesFunction();
  }, [dispatch, order, page, filter]);

  const getAllInvoicesFunction = () => {
    const { id, direction } = order;
    const sort = id === null ? {} : { [id]: direction };

    setLoadingMore(true);
    dispatch(getAllInvocies({ page, perPage: 20, filterData: { ...filter, sort } })).then((res) => {
      if (data.length !== 0 && res.payload) {
        const { data: items, count: itemsCount } = res.payload;
        dispatch(setAllInvoiceData([...data, ...items]));
        dispatch(setInvoiceCount(itemsCount));
        setAtEnd(false);
      }
      setLoadingMore(false);
      if (totalCount <= data.length) setAtEnd(false);
    });
  };

  function downloadPdf(e, id) {
    e.stopPropagation();

    dispatch(downloadInvoicePdf(id)).then((resp) => {
      if (resp) {
        const a = document.createElement('a');
        a.href = `data:data:application/pdf;base64,${resp.payload.pdf}`;
        a.download = 'invoice.pdf';
        a.click();
      }
    });
  }

  function sendInvoiceWithEmail(e, id) {
    e.stopPropagation();
    setIsProgress(true);
    setSelectedInvoiceId(id);
    dispatch(sendInvoiceWithMail(id)).then((resp) => {
      if (resp) {
        setIsProgress(false);
      }
    });
  }

  if (data?.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          Invoice Not Found
        </Typography>
      </motion.div>
    );
  }

  const onPagination = () => {
    setAtEnd(true);
    setPage(page + 1);
  };

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <InvoiceTableHeader
            selectedInvoiceIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />
          {data.map((n, index) => {
            const {
              id,
              invoiceNumber,
              clients,
              grandTotal,
              createdAt,
              invoiceDate,
              discountTotal,
              status,
              dueDate,
            } = n;
            const isSelected = selected.indexOf(n.id) !== -1;
            return (
              <TableRow
                className="h-72 cursor-pointer"
                hover
                role="checkbox"
                key={index}
                onClick={(event) => handleClick(n)}
              >
                <TableCell className="w-40 md:w-64 text-center" padding="none">
                  <Checkbox
                    onClick={(event) => event.stopPropagation()}
                    checked={isSelected}
                    onChange={(event) => handleCheck(event, n.id)}
                  />
                </TableCell>
                <TableCell className="p-4 md:p-16" component="th" scope="row">
                  {invoiceNumber}
                </TableCell>
                <TableCell className="p-4 md:p-16" component="th" scope="row">
                  {clients?.client_name}
                </TableCell>
                <TableCell className="p-4 md:p-16" component="th" scope="row">
                  {clients?.work_email}
                </TableCell>
                <TableCell className="p-4 md:p-16" component="th" scope="row">
                  {rupeeIndian.format(grandTotal)}
                </TableCell>
                <TableCell className="p-4 md:p-16" component="th" scope="row">
                  {moment(invoiceDate).format('DD-MM-YYYY')}
                </TableCell>
                <TableCell className="p-4 md:p-16" component="th" scope="row">
                  {moment(dueDate).format('DD-MM-YYYY')}
                </TableCell>
                <TableCell className="p-4 md:p-16" component="th" scope="row">
                  {rupeeIndian.format(discountTotal)}
                </TableCell>
                <TableCell className="p-4 md:p-16" component="th" scope="row">
                  {status}
                </TableCell>
                <TableCell className="p-4 md:p-16">
                  <Tooltip disableFocusListener title="Download">
                    <Icon className="text-20 mr-10" onClick={(e) => downloadPdf(e, id)}>
                      cloud_download
                    </Icon>
                  </Tooltip>
                  <Tooltip disableFocusListener title="Send Email">
                    {isProgress && id === selectedInvoiceId ? (
                      <CircularProgress size={25} />
                    ) : (
                      <Icon className="text-20 mr-10" onClick={(e) => sendInvoiceWithEmail(e, id)}>
                        send
                      </Icon>
                    )}
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
          <TableBody />
        </Table>
        {data?.length < totalCount && (
          <Box className="relative flex justify-center p-12">
            {data?.length >= 1 && (
              <Fade in={!loadingMore}>
                <Button className="absolute" variant="text" onClick={onPagination}>
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

export default InvoicesListTable;
