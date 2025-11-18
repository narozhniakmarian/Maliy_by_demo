import { Readable } from 'node:stream';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    secure: true,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
export async function saveFileToCloudinary(buffer, folder = 'gallery') {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: 'image',
                overwrite: true,
                unique_filename: true,
                use_filename: false,
            },
            (err, result) => {
                if (err || !result?.public_id) return reject(err || new Error('Upload failed'));

                const optimizedUrl = cloudinary.url(result.public_id, {
                    transformation: [
                        { width: 1000, crop: 'scale' },
                        { quality: 'auto' },
                        { fetch_format: 'auto' },
                    ],
                    secure: true,
                });

                resolve({ raw: result, optimizedUrl });
            }
        );

        Readable.from(buffer).pipe(uploadStream);
    });
}