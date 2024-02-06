import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEmployee, setOrdersSearchText } from '../store/employeeSlice';

function EmployeeListHeader(props) {
  const mainTheme = useSelector(selectMainTheme);
  const dispatch = useDispatch();
  const searchText = useSelector(({ eomApp }) => eomApp?.employees?.searchText);

  const navigate = useNavigate()

  const handleSearch = () => {
    props.onSearch(true);
    dispatch(getEmployee({ searchKeyword: searchText, page: 1, perPage: 10 })).then((res) => {
      props.onSearch(false);
    });
  };

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Typography
          className="flex items-center mr-12"
          role="button"
          color="inherit"
          onClick={() => navigate('/apps/employees')}
        >
          <Icon className="text-20">arrow_back</Icon>
        </Typography>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Employees
        </Typography>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <ThemeProvider theme={mainTheme}>
          <Paper
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
            className="flex items-center w-full h-58 max-w-512 px-8 py-4 rounded-16 shadow"
          >
            <Icon color="action">search</Icon>

            <Input
              placeholder="Search"
              className="px-16"
              disableUnderline
              fullWidth
              // value={searchText}
              inputProps={{
                'aria-label': 'Search',
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13 && searchText !== '') {
                  handleSearch();
                }
              }}
              onChange={(ev) => {
                if (ev.target.value === '') {
                  dispatch(getEmployee({ page: 1, perPage: 10 })).then((res) => {
                    props.onSearch(false);
                  });
                }
                dispatch(setOrdersSearchText(ev));
              }}
            />
            <Button
              onClick={() => {
                handleSearch(searchText);
                props.onSearch(true);
              }}
              variant="contained"
              color="secondary"
              disabled={searchText?.replace(/ /g, '') === ''}
            >
              Submit
            </Button>
          </Paper>
        </ThemeProvider>
      </div>
      {/*<motion.div*/}
      {/*  initial={{ opacity: 0, x: 20 }}*/}
      {/*  animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}*/}
      {/*  data-tour="invitations"*/}
      {/*>*/}
      {/*  <Button*/}
      {/*    component={Link}*/}
      {/*    to="/apps/invitation"*/}
      {/*    className="whitespace-nowrap"*/}
      {/*    variant="contained"*/}
      {/*    color="secondary"*/}
      {/*  >*/}
      {/*    <span className="">Invitations</span>*/}
      {/*  </Button>*/}
      {/*</motion.div>*/}
    </div>
  );
}

export default EmployeeListHeader;
