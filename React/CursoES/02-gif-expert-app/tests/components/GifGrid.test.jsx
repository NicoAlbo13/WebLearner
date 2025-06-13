import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs');

describe('test on GifGrid component', () => {

    const category = 'OnePunch';

    test('should first show Loading first', () => {

        useFetchGifs.mockReturnValue({
            images:[],
            isLoading:true,
        })

        render(<GifGrid category={category}/>)
        // screen.debug();

        expect(screen.getByText('Loading Images...')).toBeTruthy();
        expect(screen.getByText(category));
        expect(screen.getByRole('heading', {level: 3}).innerHTML).toBe(category);

    })

    test('should load items when images return', () => {

        const gifs=[{
            id:'ABCD',
            title: 'Saitama',
            url: 'https://testurl.com/image.jpg'
        },
        {
            id:'CDA',
            title: 'Goku',
            url: 'https://testurl.com/image23.jpg'
        }]

        useFetchGifs.mockReturnValue({
            images:gifs,
            isLoading:false,
        })

        render(<GifGrid category={category}/>)

        // screen.debug()

        expect(screen.getAllByRole('img').length).toBe(2);
        expect(screen.getAllByRole('paragraph').length).toBe(2);

    })

})
