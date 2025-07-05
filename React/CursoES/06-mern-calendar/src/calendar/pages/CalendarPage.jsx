import { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {format, addHours, parse, startOfWeek, getDay} from 'date-fns'
import enUS from 'date-fns/locale/en-US'

import { Navbar } from "../components/Navbar"
import { CalendarEvent } from '../components/CalendarEvent'
import { CalendarModal } from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { FabAddNew } from '../components/FabAddNew'
import { FabDelete } from '../components/FabDelete'
import { useAuthStore } from '../../hooks/useAuthStore'

export const CalendarPage = () => {

  const {user} = useAuthStore();
  const { openDateModal } = useUiStore();
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

  const locales = {
    'en-US': enUS,
  }

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  useEffect(() => {
    startLoadingEvents()
  }, [])

  const eventStyleGetter = (event, start, end, isSelected)=> {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return{
      style
    }
  }

  const onDoubleClick = (event) => {
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event);
    setLastView(event)
  }

  return (
    <>
      <Navbar/>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '700px' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  )
}
