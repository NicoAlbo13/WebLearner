import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal'
import DatePicker from "react-datepicker";

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import "react-datepicker/dist/react-datepicker.css";
import { useUiStore } from '../../../hooks/useUiStore';
import { useCalendarStore } from '../../../hooks/useCalendarStore';


export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore()
    const { activeEvent, startSavingEvent } = useCalendarStore();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const titleClass = useMemo(() =>{
        if(!formSubmitted) return '';

        return (formValues.title.length>0)
        ? '' : 'is-invalid'

    }, [formValues.title, formSubmitted])

    const customStyles = {
        content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement('#root');

    const onCloseModal = () => {
        closeDateModal()
    }

    useEffect(()=>{
        if(activeEvent !== null){
            setFormValues({...activeEvent})
        }
    },[activeEvent])

    const handleInputChange = ({target})=> {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormSubmitted(true);
        const diff = differenceInSeconds(formValues.end, formValues.start);
        if(isNaN(diff) || diff<0){
            Swal.fire('Error on dates', 'Check time on dates', 'error')
            return;
        }
        if(formValues.title.length<=0) return;

        await startSavingEvent(formValues);
        closeDateModal();
        setFormSubmitted(false)
    }

  return (
    <Modal
        isOpen={ isDateModalOpen }
        onRequestClose={ onCloseModal }
        style={customStyles}
        className='modal'
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
    >

        <h1> New Event </h1>
        <hr />
        <form className="container" onSubmit={handleSubmit}>

            <div className="form-group mb-2">
                <label>Start date and time </label>
                <br />
                <DatePicker
                    selected={formValues.start}
                    onChange={(e)=>handleInputChange({target:{name: 'start', value: e}})}
                    className='form-control'
                    dateFormat='Pp'
                    showTimeSelect
                />
            </div>

            <div className="form-group mb-2">
                <label>End date and time</label>
                <br />
                <DatePicker
                    minDate={formValues.start}
                    selected={formValues.end}
                    onChange={(e)=>handleInputChange({target:{name: 'end', value: e}})}
                    className='form-control'
                    dateFormat='Pp'
                    showTimeSelect
                />
            </div>

            <hr />
            <div className="form-group mb-2">
                <label>Title and notes</label>
                <input
                    type="text"
                    className={`form-control ${titleClass}`}
                    placeholder="Title of the event"
                    name="title"
                    autoComplete="off"
                    value={formValues.title}
                    onChange={handleInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">Small description</small>
            </div>

            <div className="form-group mb-2">
                <textarea
                    type="text"
                    className="form-control"
                    placeholder="Notes"
                    rows="5"
                    name="notes"
                    value={formValues.notes}
                    onChange={handleInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Additional Information</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Save</span>
            </button>

        </form>

    </Modal>
  )
}
