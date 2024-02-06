import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import { getAllDepartments, openDepartmentDialog, setDepartmentSearchText } from './store/DepartmentsSlice';
import { selectMainTheme } from '../../../store/fuse/settingsSlice';

function DepartmentsHeader(props) {
  const dispatch = useDispatch();
  const mainTheme = useSelector(selectMainTheme);
  const searchText = useSelector(({ DepartmentApp }) => DepartmentApp?.department?.searchText);

  const handleSearch = () => {
    props.onSearch(true);
    dispatch(getAllDepartments({ searchKeyword: searchText, page: 1, perPage: 10 })).then((res) => {
      props.onSearch(false);
    });
  };

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Departments
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
                  dispatch(getAllDepartments({ page: 1, perPage: 10 })).then((res) => {
                    props.onSearch(false);
                  });
                }
                dispatch(setDepartmentSearchText(ev));
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
      <div className="flex items-center">
        <DialogActions
          className="justify-end p-0"
          onClick={() => {
            dispatch(openDepartmentDialog());
          }}
        >
          <div>
            <Button type="submit" variant="contained" color="secondary">
              Add Department
            </Button>
          </div>
        </DialogActions>
      </div>
    </div>
  );
}

export default DepartmentsHeader;
