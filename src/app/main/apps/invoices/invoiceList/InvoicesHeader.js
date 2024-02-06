import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormControlLabel, FormGroup, Icon, Input, TextField } from '@mui/material';
import { useState } from 'react';
import './invoiceFilterStyle.css';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import moment from 'moment';
import constants from '../../../../fuse-configs/constants';
import { setAllInvoiceData } from '../store/invoicesSlice';
import _ from 'lodash';
import { CancelSharp, FilterAlt } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

function InvoicesHeader(props) {
  const mainTheme = useSelector(selectMainTheme);
  const { setFilter, setPage, filter } = props;

  const [filterFromDate, setFilterFromDate] = useState(null);
  const [filterToDate, setFilterToDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const handleChangeFromDate = (newValue) => {
    setFilterFromDate(newValue);
  };
  const handleChangeToDate = (newValue) => {
    setFilterToDate(newValue);
  };

  const dispatch = useDispatch();

  const handleFilterInvoiceList = (e) => {
    e.preventDefault();
    const from = moment(filterFromDate).set({ hour: 0, minute: 0, second: 0 }).utc();
    const to = moment(filterToDate).set({ hour: 0, minute: 0, second: 0 }).utc();
    setFilter({ from, to, status });
    setPage(1);
    dispatch(setAllInvoiceData([]));
    setShowFilterMenu(false);
  };

  function handleCheck(e) {
    setStatus(e.target.value);
  }

  function clearFilterValue() {
    setFilterFromDate(null);
    setFilterToDate(null);
    setStatus(null);
  }

  const clearFilter = () => {
    dispatch(setAllInvoiceData([]));
    setFilter(null);
    setPage(1);
  };

  return (
    <div className='flex flex-1 w-full items-center justify-between'>
      <div className='flex items-center'>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className='hidden sm:flex text-16 md:text-24 mx-12 font-semibold'
        >
          Invoices
        </Typography>
      </div>
      <div className='flex flex-1 items-center justify-center px-12'>
        <ThemeProvider theme={mainTheme}>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className={`flex items-center w-full h-58 max-w-512 rounded-none px-8 py-4 shadow main-filter-box ${
              showFilterMenu ? 'border-b-l-none' : null
            }`}
          >
            <Icon color='action'>search</Icon>
            <Input
              placeholder='Search'
              className='px-16'
              disableUnderline
              fullWidth
              inputProps={{
                'aria-label': 'Search',
              }}
            />
            <IconButton color="primary" onClick={() => setShowFilterMenu(!showFilterMenu)} className='mr-2' aria-label='filter'>
              <FilterAlt />
            </IconButton>
            {!_.isEmpty(filter) &&
              <IconButton onClick={clearFilter} className='mr-2' aria-label='cancel'>
                <CancelSharp />
              </IconButton>
            }
            <Paper
              className={`filter-box rounded-none border-t-2 ${
                showFilterMenu ? 'show-filter-box' : null
              }`}
            >
              <form>
                <div className='flex'>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label='From Date'
                      name='fromDate'
                      value={filterFromDate}
                      onChange={handleChangeFromDate}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            fullWidth
                            className='mt-8 mb-16 mx-4 self-start w-auto'
                          />
                        );
                      }}
                      inputFormat='dd/MM/yyyy'
                    />
                    <DatePicker
                      label='To Date'
                      name='toDate'
                      value={filterToDate}
                      minDate={filterFromDate}
                      onChange={handleChangeToDate}
                      renderInput={(params) => {
                        return (
                          <TextField
                            {...params}
                            fullWidth
                            className='mt-8 mb-16 mx-4 self-start w-auto'
                          />
                        );
                      }}
                      inputFormat='dd/MM/yyyy'
                    />
                  </LocalizationProvider>
                </div>
                <FormGroup className='flex flex-row mb-10'>
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    value={status}
                    name='status'
                  >
                    <FormControlLabel
                      control={
                        <Radio value={constants.INVOICE_STATUS.DRAFT} onChange={handleCheck} />
                      }
                      label='Draft'
                    />
                    <FormControlLabel
                      control={
                        <Radio value={constants.INVOICE_STATUS.POSTED} onChange={handleCheck} />
                      }
                      label='Posted'
                    />
                  </RadioGroup>
                </FormGroup>
                <div className='flex gap-10'>
                  <Button
                    type='submit'
                    variant='contained'
                    onClick={handleFilterInvoiceList}
                    disabled={filterToDate === null && filterFromDate === null && status === null}
                  >
                    Apply
                  </Button>
                  <Button
                    type='button'
                    variant='contained'
                    onClick={clearFilterValue}
                    disabled={filterToDate === null && filterFromDate === null && status === null}
                  >
                    Clear
                  </Button>
                  <Button
                    type='button'
                    variant='outlined'
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Paper>
            <div
              className={`overlay-filter-box ${!showFilterMenu ? 'hidden' : 'block'}`}
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            />
          </Paper>
        </ThemeProvider>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
      >
        <Button
          component={Link}
          to='/app/invoices/new'
          className='flex place-items-end whitespace-nowrap'
          variant='contained'
          color='secondary'
        >
          <span>Create Invoice</span>
        </Button>
      </motion.div>
    </div>
  );
}

export default InvoicesHeader;
