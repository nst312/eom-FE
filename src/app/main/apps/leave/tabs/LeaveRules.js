import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from '@mui/material';
import {deleteLeaveRules, openEditLeaveDialog} from '../store/leaveRulesSlice';
import withReducer from "../../../../store/withReducer";
import reducer from "../store";

function LeaveRules(props) {
  const dispatch = useDispatch();
    const leavesDialog = useSelector(({leavesApp}) => leavesApp.leaveRules?.LeavesRulesDialog);
  const getLeaveData = useSelector(
      ({ leavesApp }) => leavesApp.leaveRules.leaveData
  );

    const onDeleteLeaveRules = (id) => {
        dispatch(deleteLeaveRules({ id })).then((res) => {});
    };


  return (
    <>
      <div className="grid grid-cols-3 gap-10">
        {getLeaveData.map((column,index) => {
          return (
        <Card className="rounded-none cursor-pointer" key={index}>
          <CardContent
            className="flex justify-between"
            onClick={() => {
              dispatch(openEditLeaveDialog(column));
            }}
          >
                  <Typography sx={{ fontSize: 18 }} className="gap-10" variant="h5" gutterBottom>
                    {column.name}
                  </Typography>
              <Icon onClick={(e) => e.stopPropagation(onDeleteLeaveRules(column.id))}>delete</Icon>

          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
            );
            })}
      </div>
    </>
  );
}

export default withReducer('leavesApp', reducer)(LeaveRules);
