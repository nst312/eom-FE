import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import withReducer from 'app/store/withReducer';
import InvoicesHeader from './InvoicesHeader';
import InvoicesListTable from './InvoicesListTable';
import reducer from '../store';

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

function InvoicesList() {
  const [isSearch, setIsSearch] = useState(false);
  const [filter, setFilter] = useState(null);
  const [page, setPage] = useState(1);

  const onSearch = (value) => {
    setIsSearch(value);
  };

  return (
    <Root
      header={<InvoicesHeader filter={filter} setFilter={setFilter} setPage={setPage} />}
      content={<InvoicesListTable filter={filter} setPage={setPage} page={page} />}
      innerScroll
    />
  );
}

export default withReducer('invoicesApp', reducer)(InvoicesList);
