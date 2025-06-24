export const initialState = {
    status: 'checking', 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123ABC',
    email: 'demo@google.com',
    displayName: 'Demo User',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated', 
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: undefined,
}

export const demoUser = {
    uid: '123XYZ',
    email: 'email@google.com',
    displayName: 'DEMO',
    photoURL: 'https://pic.jpg'
}
