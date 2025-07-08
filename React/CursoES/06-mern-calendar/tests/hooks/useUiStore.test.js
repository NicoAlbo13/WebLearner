import {act, renderHook} from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { useUiStore } from '../../src/hooks/useUiStore'
import { Provider } from 'react-redux'
import { uiSlice } from '../../src/store/ui/uiSlice'

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: {...initialState}
        }
    })
}

describe('test on the useUiStore hook', () => {

    test('should return the default values', () => {

        const mockedStore = getMockStore({isDateModalOpen: false})

        const {result} = renderHook( ()=> useUiStore(), {
            wrapper: ({children}) => <Provider store={mockedStore}>{children}</Provider>
        } )

        expect(result.current).toEqual({
            closeDateModal: expect.any(Function),
            isDateModalOpen: false,
            openDateModal: expect.any(Function),
        });
    })

    test('should change the value to true with openDateModal', () => {

        const mockedStore = getMockStore({isDateModalOpen: false})

        const {result} = renderHook( ()=> useUiStore(), {
            wrapper: ({children}) => <Provider store={mockedStore}>{children}</Provider>
        } );

        const { openDateModal } = result.current;

        act(()=>{
            openDateModal()
        });

        expect(result.current.isDateModalOpen).toBeTruthy()
    })

    test('should change the value to false with closeDateModal', () => {

        const mockedStore = getMockStore({isDateModalOpen: true})

        const {result} = renderHook( ()=> useUiStore(), {
            wrapper: ({children}) => <Provider store={mockedStore}>{children}</Provider>
        } );

        act(()=>{
            result.current.closeDateModal()
        });

        expect(result.current.isDateModalOpen).toBeFalsy()
    })

})
