import {response} from 'express'
import Event from '../models/Event.js'

export const getEvents = async(req, res = response) => {

    const events = await Event.find().populate('user', 'name')

    res.json({
        ok: true,
        events
    })

}

export const newEvent = async(req, res = response) => {

    const event = new Event(req.body)

    try {

        event.user = req.uid;

        const savedEvent = await event.save()

        res.json({
            ok: true,
            event: savedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error while saving event'
        })
    }


}

export const updateEvent = async(req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {
        const event = await Event.findById( eventId )

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'Cannot find an event with that id'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'Not authorized to make that change'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true})

        res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Could not update event'
        })
    }


}

export const deleteEvent = async(req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {
        const event = await Event.findById( eventId )

        if(!event){
            return res.status(404).json({
                ok: false,
                msg: 'Cannot find an event with that id'
            })
        }

        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'Not authorized to make that change'
            })
        }

        await Event.findByIdAndDelete(eventId)

        res.json({
            ok: true,
            msg: 'deleted'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Could not update event'
        })
    }
}
