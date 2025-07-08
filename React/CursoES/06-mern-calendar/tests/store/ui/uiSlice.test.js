import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"

describe('test on the uiSlice', () => {

    test('should return the default state', () => {
        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy()
        expect(uiSlice.getInitialState()).toEqual({isDateModalOpen: false})
    });

    test('should change state correctly', () => {
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy();

        state = uiSlice.reducer(state, onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy()

    })

})


