import { v2 as cloudinary } from "cloudinary"
import { fileUpload } from "../../../../src/store/journal/helpers/fileUpload";

describe('tests on fileUpload function', () => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API,
        api_secret: process.env.CLOUDINARY_APISECRET,
        secure: true
    })

    test('should upload a file correctly to cloudinary', async() => {

        const imageUrl = 'https://cdn11.bigcommerce.com/s-x49po/images/stencil/1500x1500/products/88631/250661/1665576857580_Jungle_House__25247.1687002130.jpg';

        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'test_image.jpg');

        const cloudUrl = await fileUpload(file);

        expect(typeof cloudUrl).toBe('string');

        //delete the test image created from the cloud
        const segments = cloudUrl.split('/');
        const imageId = segments[segments.length -1].replace('.jpg', '');

        await cloudinary.api.delete_resources([imageId]);
    })

    test('should return undefined for no image', async () => {

        const file = new File([], 'photo.jpg');
        const cloudUrl = await fileUpload(file);
        expect(cloudUrl).toBe(undefined);

    })

})
