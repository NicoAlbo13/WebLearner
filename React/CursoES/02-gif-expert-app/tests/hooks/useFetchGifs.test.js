import { renderHook, waitFor } from '@testing-library/react';
import { useFetchGifs } from "../../src/hooks/useFetchGifs";

describe('test on useFetchGifs hook', () => {

    test('should return an initial state', () => {

        const { result } = renderHook(()=> useFetchGifs('One Punch'))
        // console.log(result);
        const { images, isLoading } = result.current;

        expect(images.length).toBe(0);
        expect(isLoading).toBeTruthy();

    })

    test('should return complete values after call ', async () => {
        const { result } = renderHook(()=> useFetchGifs('One Punch'))
        await waitFor(
            ()=>expect(result.current.images.length).toBeGreaterThan(0),
            {   
                timeout: 2000,
            }
            )
        
        const { images, isLoading } = result.current;
        expect(images.length).toBeGreaterThan(0)
        expect(isLoading).toBeFalsy();
    })

})
