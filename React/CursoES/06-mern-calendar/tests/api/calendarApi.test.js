import calendarApi from "../../src/api/calendarApi"

describe('test on calendarApi', () => {

    test('should have the right APIURL', () => {
        expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_APIURL)
    });

    // test('should have "x-token" header on the api calls', async() => {
    //     localStorage.setItem('token', 'ABC-123')
    //     const res = await calendarApi.get('/auth')
    //     console.log(res);
        
    // })

})

