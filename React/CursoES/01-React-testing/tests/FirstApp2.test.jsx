import {render, screen} from "@testing-library/react"
import { FirstApp } from "../src/FirstApp"

describe('Test on <FirstApp/>',()=>{
    
    const title = "Hola, soy Goku";

    test('Snapshot test', ()=>{
        const {container} = render(<FirstApp title={title}/>)
        expect(container).toMatchSnapshot();
    })

    test("should show the message 'Hola, soy Goku'", ()=>{
        render(<FirstApp title={title}/>)
        expect(screen.getByText(title)).toBeTruthy();
    })

    test("should show the title in h1", ()=>{
        render(<FirstApp title={title}/>)
        expect(screen.getByRole('heading', {level: 1}).innerHTML).toContain(title);
    })

    test("should show the subtitle on props", ()=>{
        const subtitle="Test subtitle";
        render(
            <FirstApp 
            title={title}
            subTitle={subtitle}
        />
        )

        expect(screen.getAllByText(subtitle).length).toBe(2)
    })

})
