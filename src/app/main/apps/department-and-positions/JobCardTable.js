import React, { useEffect, useState } from 'react';
import JobPositionDialog from '../job-position/JobPositionDialog';
import withReducer from '../../../store/withReducer';
import reducer from '../job-position/store';
import { useDispatch, useSelector } from 'react-redux';
import { allJobPosition, openJobPositionDialog, selectJobPosition } from '../job-position/store/JobPositionSlice';
import JobPositionTable from '../job-position/JobPositionTable';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function JobCardTable() {

  const [jobPosition, setJobPosition] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdd, setIsAdd] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [positionDetails, setPositionDetails] = useState([]);
  const dispatch = useDispatch();
  const jobDialog = useSelector(
    ({ JobPositionApp }) => JobPositionApp.jobPosition.JobPositionDialog
  );
  const jobPositionData = useSelector(selectJobPosition);
  const totalCount = useSelector(({ JobPositionApp }) => JobPositionApp.jobPosition.totalCount);
  const [page, setPage] = useState(1);
  const [atEnd, setAtEnd] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const onSearch = (value) => {
    setIsSearch(value);
  };




  useEffect(() => {
    if (atEnd && !loadingMore && !isLastPage) {
      setLoadingMore(true);
      setPage(page + 1);
      getAllPositionDetails();
    }
    if (!isLastPage && positionDetails.length >= totalCount) {
      setIsLastPage(true);
    } else {
      setIsLastPage(false);
    }
  }, [dispatch, atEnd, loadingMore]);

  useEffect(() => {
    if (atEnd) {
      setPositionDetails([...positionDetails, ...jobPositionData]);
      setAtEnd(false);
    } else {
      setPositionDetails(jobPositionData);
    }
  }, [jobPositionData]);

  const onLoadingFalse = (value) => {
    setLoading(value);
  };

  const onAddJob = (value) => {
    setIsAdd(value);
  };
  const jobData = (datas) => {
    setJobPosition(datas);
  };

  const onSelectId = (value) => {
    setSelectedJobId(value);
  };

  const getAllPositionDetails = () => {
    dispatch(allJobPosition({ page, perPage: 10 })).then((res) => {
      setPositionDetails(res.payload);
      setLoadingMore(false);
      setLoading(false);
    });
  };

  const user = useSelector(({ auth }) => auth.user);

  return (
    <>
      <div>
        <Typography textAlign='center' variant="subtitle1" color="inherit" className="text-24">
          Job Position
        </Typography>
      </div>
      <JobPositionTable
        positionData={positionDetails}
        setLoading={(e) => onLoadingFalse(e)}
        loading={loading}
        loadingMore={loadingMore}
        setLoadingMore={setLoadingMore}
        setAtEnd={setAtEnd}
        totalCount={totalCount}
        setPositionDetails={setPositionDetails}
        setSelectedId={onSelectId}
        jobData={(e) => jobData(e)}
      />
      <div className="flex items-center justify-center py-12">
        <DialogActions
          className="justify-end p-0"
          onClick={() => {
            dispatch(openJobPositionDialog());
          }}
        >
          <div data-tour="Add Job position">
            <Button type="submit" variant="contained" color="secondary">
             Add New
            </Button>
          </div>
        </DialogActions>
      </div>
      {jobDialog.props.open && (
        <JobPositionDialog
          positionDetails={getAllPositionDetails}
          loadingMore={loadingMore}
          selectedJobId={selectedJobId}
          setSelectedId={onSelectId}
          setLoading={(e) => onLoadingFalse(e)}
          setLoadingMore={setLoadingMore}
          loading={loading}
          setIsAdd={onAddJob}
          data={jobPosition}
        />
      )}
    </>

  )
}

export default withReducer('JobPositionApp', reducer)(JobCardTable);