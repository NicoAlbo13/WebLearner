import {render} from "@testing-library/react"
import { FirstApp } from "../src/FirstApp"

describe('Test on FirstApp component',()=>{
    //Take snapshot (better use when element already in production)
    // test('should match with the snapshot',()=>{

    //     const title="Hola, soy Goku";
    //     const {container} = render(<FirstApp title={title}/>)
    //     // console.log(container)
    //     expect(container).toMatchSnapshot()
    // });

    test('Show title inside h1',()=>{
        const title="Hola, soy Goku";
        const {container, getByText, getByTestId} = render(<FirstApp title={title}/>)
        expect(getByText(title)).toBeTruthy();

        // const h1 = container.querySelector('h1');
        // expect(h1.innerHTML).toContain(title);

        expect(getByTestId("test-title").innerHTML).toContain(title)
    });

    test('Show subtitle send by props', ()=>{
        const title="Hola, soy Goku";
        const subtitle="Test Subtitle";
        const {getAllByText} = render(
        <FirstApp 
        title={title}
        subTitle={subtitle}
        />
        )

        expect(getAllByText(subtitle).length).toBe(2)
    });

})
