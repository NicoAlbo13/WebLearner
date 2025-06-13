import {fireEvent, render, screen} from "@testing-library/react"
import { CounterApp } from "../src/CounterApp"

describe("Test on CounterApp component", ()=>{

    const value = 100;

    test("component should match the snapshot",()=>{
        const {container} = render(<CounterApp value={value}/>)
        expect(container).toMatchSnapshot();
    })

    test("check if component shows prop send value", ()=>{
        render(<CounterApp value={value}/>)
        expect(screen.getByText(value)).toBeTruthy();
    })

    test("should increment if +1 clicked", ()=>{
        render(<CounterApp value={value}/>)
        fireEvent.click(screen.getByText('+1'))
        expect(screen.getByText(value+1)).toBeTruthy()
    })

    test("should decrement if -1 clicked", ()=>{
        render(<CounterApp value={value}/>)
        fireEvent.click(screen.getByText('-1'))
        expect(screen.getByText(value-1)).toBeTruthy()
    })

    test("should reset if reset clicked", ()=>{
        render(<CounterApp value={value}/>)
        fireEvent.click(screen.getByText('+1'))
        fireEvent.click(screen.getByText('+1'))
        fireEvent.click(screen.getByText('-1'))

        fireEvent.click(screen.getByRole('button', {name:'btn-reset'}));

        // fireEvent.click(screen.getByText('Reset'))
        expect(screen.getByText(value)).toBeTruthy()



    })

})
