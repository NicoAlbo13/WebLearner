import { retornaArreglo } from "../../src/base-pruebas/07-deses-arr"

describe('Pruebas en 07-deses-arr', ()=>{
    test('retornarArray deberia returnar un arreglo', ()=>{
        const [letters, numbers] = retornaArreglo();

        expect(typeof letters).toBe('string')
        expect(typeof numbers).toBe('number')

        expect(typeof letters).toEqual(expect.any(String))
    })
})
