import { getImagen } from "../../src/base-pruebas/11-async-await"

describe('Pruebas en 11-async-await', ()=>{
    test('getImage debe de retornar una URL', async()=>{
        const url= await getImagen();
        console.log(url);
        expect(typeof url).toBe('string')
    })
})
