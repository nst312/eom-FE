import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
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
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
        >
          Employees
        </Typography>
      </div>
    </div>
  );
}

export default EmployeeListHeader;
