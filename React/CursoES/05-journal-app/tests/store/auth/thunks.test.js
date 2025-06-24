import { logInWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/provider";
import { credentialCheck, login, logout } from "../../../src/store/auth/authSlice"
import { authCheck, startGoogleSignIn, startLogInWithEmail, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/config.js', () => ({
  FirebaseAuth: {},
  FirebaseDB: {},
  app: {}
}));

jest.mock('../../../src/firebase/provider')

describe('tests on the auth thunks', () => {

    const dispatch = jest.fn();
    beforeEach(()=> jest.clearAllMocks())

    test('should invoke authCheck', async () => {

        await authCheck()(dispatch);
        
        expect(dispatch).toHaveBeenCalledWith(credentialCheck())
    })

    test('startGoogleSignIn should called credentialCheck and login - Success ', async() => {
        const loginData = {ok: true, ...demoUser}
        //mock
        await signInWithGoogle.mockResolvedValue(loginData);

        //thunk call
        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(credentialCheck())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startGoogleSignIn should call credentialCheck and logout - Fail ', async() => {
        const loginData = {ok: false, errorMessage: 'Error on Google'}
        //mock
        await signInWithGoogle.mockResolvedValue(loginData);

        //thunk call
        await startGoogleSignIn({})(dispatch)

        expect(dispatch).toHaveBeenCalledWith(credentialCheck())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData))
    })

    test('startLogInWithEmail should call credentialCheck and login - Success', async () => {
        const loginData = {ok: true,  ...demoUser}

        await logInWithEmailPassword.mockResolvedValue(loginData);

        await startLogInWithEmail(demoUser)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(credentialCheck())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))

    })

    test('startLogInWithEmail should call credentialCheck and logout - Fail', async () => {
        const loginData = {ok: false, errorMessage: 'Error Login'}

        await logInWithEmailPassword.mockResolvedValue(loginData);

        await startLogInWithEmail(demoUser)(dispatch)

        expect(dispatch).toHaveBeenCalledWith(credentialCheck())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData))

    })

    test('startLogout should call clearNotesLogout and logout', async () => {
        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout())
        expect(dispatch).toHaveBeenCalledTimes(2)        

    })

})
