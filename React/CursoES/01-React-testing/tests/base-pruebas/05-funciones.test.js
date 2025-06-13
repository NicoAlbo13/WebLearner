import { getUser, getUsuarioActivo } from "../../src/base-pruebas/05-funciones"


describe('Pruebas en 05-funciones', ()=>{

    test('getUser debe de returnar un objeto', ()=>{
        const testUser={
            uid: 'ABC123',
            username: 'El_Papi1502'
        }
        const user = getUser();

        expect(testUser).toEqual(user);
    })

    test('getUsuario activo returna objeto', ()=>{
        const name = "Albo";
        const testUserActivo={
            uid: 'ABC567',
            username: `${name}`
        }
        const userActivo = getUsuarioActivo(name);

        expect(userActivo).toEqual(testUserActivo);
    })
})