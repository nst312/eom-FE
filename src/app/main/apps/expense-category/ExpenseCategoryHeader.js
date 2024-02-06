import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from 'react-redux';
import {selectMainTheme} from '../../../store/fuse/settingsSlice';
import {openExpenseCategoryDialog} from "./store/ExpenseCategorySlice";

function ExpenseCategoryHeader(props) {
    const mainTheme = useSelector(selectMainTheme);
    const dispatch = useDispatch();


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
                    Expense Category
                </Typography>
            </div>

            <div className="flex items-center">
                <DialogActions
                    className="justify-end p-0"
                    onClick={() => {
                        dispatch(openExpenseCategoryDialog());
                    }}
                >
                    <div>
                        <Button type="submit" variant="contained" color="secondary">
                            Add Expense Category
                        </Button>
                    </div>
                </DialogActions>
            </div>
        </div>
    );
}

export default ExpenseCategoryHeader;
