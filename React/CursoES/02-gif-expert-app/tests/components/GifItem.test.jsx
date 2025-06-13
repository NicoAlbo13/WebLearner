import { render, screen } from '@testing-library/react';
import GifItem from '../../src/components/GifItem';

describe('test on GifItem', () => {

    const title = 'This is a title'
    const url = 'http://testurl.com/image.jpg'

    test('should GifItem module should match Snapshot', () => { 
        const { container } = render(<GifItem title={title} url={url}/>)
        expect(container).toMatchSnapshot();
    })

    test('should use the given url and alt on image', () => { 
        render(<GifItem title={title} url={url}/>)
        // expect(screen.getByAltText(title)).toBeTruthy();
        // expect(screen.getByRole('img').src).toBe(url);

        const {src, alt} = screen.getByRole('img');

        expect(src).toBe(url);
        expect(alt).toBe(title);

     })

     test('should contain title on the component', () => { 
        render(<GifItem title={title} url={url}/>)
        expect(screen.getByText(title)).toBeTruthy();
      })

})