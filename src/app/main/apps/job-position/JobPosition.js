import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import JobPositionHeader from './JobPositionHeader';
import JobPositionTable from './JobPositionTable';
import JobPositionDialog from './JobPositionDialog';
import { allJobPosition, selectJobPosition } from './store/JobPositionSlice';
import Tour from 'reactour';

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

function JobPosition() {
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

  const [stepsEnabled, setStepsEnabled] = useState(true);

  const steps = [
    {
      selector: '[data-tour="Departments"]',
      content: "To Add Job Position, First you have to add Department"
    },
    {
      selector: '[data-tour="Add Job position"]',
      content: "You can add Job Position by clicking here!"
    },
  ];

  const user = useSelector(({ auth }) => auth.user);

  const walkthroughJobPosition = localStorage.getItem("walkthroughJobPosition");

  return (
    <>
      <Root
        header={<JobPositionHeader setLoading={(e) => onLoadingFalse(e)} loading={loading} onSearch={onSearch}/>}
        content={
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
        }
        innerScroll
      />

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

      {
        walkthroughJobPosition == "1" ? null :  (
          user.role === "CEO" && (
            <Tour
              steps={steps}
              isOpen={stepsEnabled}
              onRequestClose={() => {
                console.log("closed");
                localStorage.setItem("walkthroughJobPosition","1");
                setStepsEnabled(false);
              }}
            />
          )
        )
      }


    </>
  );
}

export default withReducer('JobPositionApp', reducer)(JobPosition);
