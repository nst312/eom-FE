import Fab from '@mui/material/Fab';
import { styled, useTheme } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import CalendarHeader from './CalendarHeader';
import EventDialog from './EventDialog';
import reducer from './store';
import {
  getAllLeave,
  openEditEventDialog,
  openNewEventDialog,
  selectLeave,
  updateLeave,
} from './store/eventsSlice';


const Root = styled('div')(({ theme }) => ({
  '& a': {
    color: `${theme.palette.text.primary}!important`,
    textDecoration: 'none!important',
  },
  '&  .fc-media-screen': {
    minHeight: '100%',
  },
  '& .fc-scrollgrid, & .fc-theme-standard td, & .fc-theme-standard th': {
    borderColor: `${theme.palette.divider}!important`,
  },
  '&  .fc-scrollgrid-section > td': {
    border: 0,
  },
  '& .fc-daygrid-day': {
    '&:last-child': {
      borderRight: 0,
    },
  },
  '& .fc-col-header-cell': {
    borderWidth: '0 0 1px 0',
    padding: '16px 0',
    '& .fc-col-header-cell-cushion': {
      color: theme.palette.text.secondary,
      fontWeight: 500,
    },
  },
  '& .fc-view ': {
    borderRadius: 20,
    overflow: 'hidden',
    border: `1px solid ${theme.palette.divider}`,
    '& > .fc-scrollgrid': {
      border: 0,
    },
  },
  '& .fc-daygrid-day-number': {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  '& .fc-event': {
    //   backgroundColor: `${theme.palette.primary.dark}!important`,
    color: `${theme.palette.primary.contrastText}!important`,
    border: 0,
    // padding: '0 6px',
    //   borderRadius: '16px!important',
  },
}));

const StyledAddButton = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: 12,
  top: 172,
  zIndex: 99,
}));

function CalendarApp(props) {
  const [currentDate, setCurrentDate] = useState();
  const dispatch = useDispatch();
  const events = useSelector(selectLeave);
  const calendarRef = useRef();
  const headerEl = useRef(null);
  const [getData, setGetData] = useState(events);

  console.log("events",events);

  const theme = useTheme();
  useEffect(() => {
    dispatch(getAllLeave()).then((res) => {
      setGetData(res.payload);
    });
  }, [dispatch]);

  const handleDateSelect = (selectInfo) => {

    const { start, end } = selectInfo;
    if (new Date(start).getDate() >= new Date().getDate() && new Date(start).getMonth() >= new Date().getMonth()) {
      dispatch(
        openNewEventDialog({
          start,
          end,
        })
      );
    }
  };

  const handleEventDrop = (eventDropInfo) => {
    const { leaveType, start, end, durationCount, description } = eventDropInfo.event;
    dispatch(
      updateLeave({
        leaveType,
        start,
        end,
        durationCount,
        description,
      })
    );
  };


  const handleEventClick = (clickInfo) => {
    const { leaveType, durationCount, description, status } = clickInfo.event.extendedProps;
    const { start, end } = clickInfo.event;
    const { publicId } = clickInfo.event._def;
    dispatch(
      openEditEventDialog({
        publicId,
        leaveType,
        start,
        end,
        status,
        durationCount,
        description,
      })
    );
  };

  const handleDates = (rangeInfo) => {
    setCurrentDate(rangeInfo);
  };

  const handleEventAdd = (addInfo) => {};

  const handleEventChange = (changeInfo) => {};

  const handleEventRemove = (removeInfo) => {};

  function renderEventContent(eventInfo) {
    const { leaveType, status, deletedAt } = eventInfo.event.extendedProps;
    const getBg = () => {
      if(status === 'APPROVED') return 'green';
      if(status === 'REJECT') return 'red';
      if(status === 'CANCELLED') return 'orange';
        return  'darkgray';
    }

    return (
      <Box
        sx={{
          backgroundColor: getBg(),
        }}
        className={clsx('flex items-center w-full rounded-4 px-8 py-2 h-22 text-white')}
      >
        <Typography className="text-12 font-semibold">{eventInfo.timeText}</Typography>
        <Typography className="text-12 px-4 truncate">
          {leaveType === 'SICK_LEAVE' && 'Sick Leave'}
          {leaveType === 'PAID_LEAVE' && 'Paid Leave'}
          {leaveType === 'UN_PAID_LEAVE' && 'UnPaid Leave'}
        </Typography>
      </Box>
    );
  }

  return (
    <Root className="flex flex-col flex-auto relative">
      <CalendarHeader calendarRef={calendarRef} currentDate={currentDate} />

      <div className="flex flex-1 p-24 container">
        <motion.div
          className="w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={false}
            initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            weekends
            datesSet={handleDates}
            select={handleDateSelect}
            events={getData}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventAdd={handleEventAdd}
            eventChange={handleEventChange}
            eventRemove={handleEventRemove}
            eventDrop={handleEventDrop}
            initialDate={new Date()}
            ref={calendarRef}
          />
        </motion.div>

        <StyledAddButton
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.4 } }}
        >
          <Fab
            color="secondary"
            aria-label="add"
            onClick={() =>
              dispatch(
                openNewEventDialog({
                  start: new Date(),
                  end: new Date(),
                })
              )
            }
          >
            <Icon>add</Icon>
          </Fab>
        </StyledAddButton>
        <EventDialog getData={getData} setGetData={setGetData} />
      </div>
    </Root>
  );
}

export default withReducer('empLeaveApp', reducer)(CalendarApp);
