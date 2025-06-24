

## Notes on testing

# fileUpload.js testing
You should create a `jest.env.js` with the cloudinary cloud info:
- cloud name `process.env.CLOUDINARY_NAME`
- Api key `process.env.CLOUDINARY_API`
- Api secret `process.env.CLOUDINARY_APISECRET`

Also for testing this function you should paste the real cloud link and not the `import.meta.env.VITE_CLOUDINARY_URL`on the `fileUpload.js`


