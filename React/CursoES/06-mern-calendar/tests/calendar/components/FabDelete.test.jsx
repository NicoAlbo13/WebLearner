import {render, screen, fireEvent} from '@testing-library/react'
import { FabDelete } from '../../../src/calendar/components/FabDelete'
import { useCalendarStore } from '../../../src/hooks/useCalendarStore'

jest.mock('../../../src/hooks/useCalendarStore')

describe('test on the FanDelete component', () => {

    test('should render component correctly', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false,
            startDeletingEvent: jest.fn()
        })

        render(<FabDelete/>)
        const btn = screen.getByLabelText('btn-delete');

        expect(btn.classList).toContain('btn')
        expect(btn.classList).toContain('btn-danger')
        expect(btn.classList).toContain('fab-danger')

        expect(btn.style.display).toBe('none')
    });

    test('should render component visibly if event selected', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: jest.fn()
        })

        render(<FabDelete/>)

        const btn = screen.getByRole('button');

        expect(btn.style.display).toBe('')
    });

    test('should call startDeletingEvent on click', () => {

        const mockedStartDeletingEvent = jest.fn()

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockedStartDeletingEvent
        })

        render(<FabDelete/>)

        const btn = screen.getByRole('button');

        fireEvent.click(btn);

        expect(mockedStartDeletingEvent).toHaveBeenCalled()
    });

})
