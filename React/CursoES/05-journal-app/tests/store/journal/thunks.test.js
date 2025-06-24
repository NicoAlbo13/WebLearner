import { startNewNote } from "../../../src/store/journal/thunks";


jest.mock('../../../src/firebase/config.js', () => ({
  FirebaseAuth: {},
  FirebaseDB: {},
  app: {}
}));

jest.mock("../../../src/store/journal/helpers/fileUpload", ()=>({
    fileUpload: {}
}))


describe('test on journal thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(()=> jest.clearAllMocks())

    test('startNewNote should create an empty note', async () => {

        // const uid = 'TEST-UID';
        // getState.mockReturnValue({auth: {uid: uid}})

        // await startNewNote()(dispatch, getState)
        // zzzz
    })

})
