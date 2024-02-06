import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import {motion} from 'framer-motion';
import {useDispatch} from 'react-redux';
import DialogActions from "@mui/material/DialogActions";
import {openLeaveDialog} from "./store/leaveRulesSlice";

function LeaveHeader(props) {
    const dispatch = useDispatch();
    const { tabValue } = props;

    return (
        <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex items-center">
                <Icon
                    component={motion.span}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, transition: { delay: 0.2 } }}
                    className="text-24 md:text-32"
                >
                    event_busy
                </Icon>
                <Typography
                    component={motion.span}
                    initial={{ x: -20 }}
                    animate={{ x: 0, transition: { delay: 0.2 } }}
                    delay={300}
                    className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
                >
                    Leave Rules
                </Typography>
            </div>

                <div className="flex items-center">
                    <DialogActions
                        className="justify-end px-8 py-16"
                        onClick={() => {
                            dispatch(openLeaveDialog());
                        }}
                    >
                        {tabValue === 0 && (
                        <div className="px-16">
                            <Button type="submit" variant="contained" color="secondary">
                                Add Leave Rules
                            </Button>
                        </div>
                        )}
                    </DialogActions>
                </div>

        </div>
    );
}

export default LeaveHeader;
