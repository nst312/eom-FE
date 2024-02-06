import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import ResumesHeader from './ResumesHeader';
import ResumesTable from './ResumesTable';
import FuseLoading from '../../../../../@fuse/core/FuseLoading';

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

function Resumes() {
  const pageLayout = useRef(null);
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLoadingFalse = (value) => {
    setLoading(value);
  };

  const onSearch = (value) => {
    setIsSearch(value);
  };

  return (
    <>
      {loading && (
        <div className="flex absolute z-50 bottom-0 left-0 right-0 top-0 bg-[#0000001a]">
          <FuseLoading />
        </div>
      )}
      <Root
        header={
          <ResumesHeader
            setLoading={(e) => onLoadingFalse(e)}
            loading={loading}
            pageLayout={pageLayout}
            onSearch={onSearch}
          />
        }
        content={
          <ResumesTable setLoading={(e) => onLoadingFalse(e)} loading={loading} search={isSearch} />
        }
        innerScroll
      />
    </>
  );
}

export default Resumes;
