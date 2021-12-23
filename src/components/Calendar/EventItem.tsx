import React, {useEffect, useRef, useState} from 'react';
import {UserEvent, deleteUserEvent, updateUserEvent} from '../../redux/user-events';
import { useDispatch } from 'react-redux';

interface Props {
  event: UserEvent;
}

const EventItem: React.FC<Props> = ({ event }) => {
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState(event.title);
  const dispatch = useDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };

  const handleTitleClick = () => {
      setEditable(true);
      setTitle("");
  };
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
      if (editable) {
          inputRef.current?.focus();
      }
  }, [editable])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value)
  }
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (title !== event.title) {
          dispatch(updateUserEvent({
              ...event, title
          }));
      }
      setEditable(false);
  }
  return (
    <div className="calendar-event">
      <div className="calendar-event-info">
        <div className="calendar-event-time">{event.dateStart} - {event.dateEnd}</div>
          <div className="calendar-event-title">
              {editable ? (
                  <input onChange={handleChange} onBlur={handleBlur} ref={inputRef} type="text" value={title} />
              ) : (
                  <span onClick={handleTitleClick}>{event.title}</span>
              )}
          </div>
      </div>
      <button
        className="calendar-event-delete-button"
        onClick={handleDeleteClick}
      >
        &times;
      </button>
    </div>
  );
};

export default EventItem;
