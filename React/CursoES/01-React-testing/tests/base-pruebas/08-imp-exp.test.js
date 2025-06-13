import { getHeroeById, getHeroesByOwner } from "../../src/base-pruebas/08-imp-exp";
import heroes from "../../src/data/heroes";

describe('Pruebas en 08-imp-exp', ()=>{
    test('getHeroeById debe retornar valor de un heroe', ()=>{

        const id=1;
        const hero=getHeroeById(id)

        expect(hero).toEqual({
            id: 1,
            name: 'Batman',
            owner: 'DC'
        })
    })

    test('getHeroeById debe retornar undefined de un heroe con id inexistente', ()=>{

        const id=100;
        const hero=getHeroeById(id)

        expect(hero).toBeFalsy()
    })

    test('getHeroesByOwner debe retornar un arreglo de un heroes DC', ()=>{

        const id='DC';
        const hero=getHeroesByOwner(id);

        expect(hero.length).toBe(3)

        expect(hero).toEqual([{
            id: 1,
            name: 'Batman',
            owner: 'DC'
        },{
            id: 3,
            name: 'Superman',
            owner: 'DC'
        },
        {
            id: 4,
            name: 'Flash',
            owner: 'DC'
        }])
    })

    test('getHeroesByOwner debe retornar un arreglo de un heroes Marvel', ()=>{

        const id='Marvel';
        const hero=getHeroesByOwner(id);

        expect(hero.length).toBe(2);

        expect(hero).toEqual(heroes.filter( (h) => h.owner === id ));
    })
})