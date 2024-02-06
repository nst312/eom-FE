import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';
import withReducer from '../../../../store/withReducer';
import reducer from '../store';
import ClientListHeader from "./ClientListHeader";
import ClientListTable from "./ClientListTable";

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

function ClientList() {
    const pageLayout = useRef(null);
    const [isSearch, setIsSearch] = useState(false);

    const onSearch = value => {
        setIsSearch(value);
    };
    return <Root
        header={<ClientListHeader pageLayout={pageLayout} onSearch={onSearch}  />}
        content={<ClientListTable search={isSearch} />}
        innerScroll
    />;
}

export default withReducer('clientsApp', reducer)(ClientList);
