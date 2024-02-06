import React from 'react';
import Alert from '@mui/material/Alert';
import {Icon, Tooltip} from "@mui/material";
import moment from "moment";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";

const HistoryStyled = styled('Alert')(({theme}) => ({
    '& .muiltr-acap47-MuiAlert-message': {
        width: '100%',
    },
    '& .muiltr-5alvnj-MuiTypography-root' : {
        fontSize: "12px"
    }
}),)

function LeaveHistory({historyData}) {

    const returnLeaveHistory = (history) =>

    {
        let data = {};

        switch (history.status) {
            case 'CREATED':
                return data = {
                    message: 'You created your leave on',
                    severity: 'info'
                }
            case 'EDITED':
                return data = {
                    message: 'You edited your leave on',
                    severity: "warning",
                }
            case 'APPROVED':
                return data = {
                    message: `${history.users.firstName} approved your leave on`,
                    severity: "success",
                }

            case 'REJECTED':
                return data = {
                    message: `${history.users.firstName} rejected your leave on`,
                    severity: "error",
            }

            case 'CANCELLED':
                return data ={
                    message: 'You cancelled your leave on',
                    severity: "error"
                }
            default :
                return ""
        }
     }


    return (
        <div>
            <div className="pb-48">
                {historyData.map((history) => {
                    const {message, severity} = returnLeaveHistory(history);
                    return (
                        <div className="justify-between">
                            <HistoryStyled>
                                <Alert className="mb-8" icon={
                                    <Tooltip title={history.reason} placement="top-start">
                                        <Icon>feedback</Icon>
                                    </Tooltip>
                                } severity={severity}>
                                    <div className="flex justify-between">
                                        <Typography>
                                            {message}
                                        </Typography>
                                        <Typography>{moment(history.createdAt).format('DD/MM/YYYY, HH:MM A')}</Typography>
                                    </div>
                                </Alert>
                            </HistoryStyled>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default LeaveHistory;

