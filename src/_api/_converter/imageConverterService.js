const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export const Base64 = {
    encode: (input) => {
        const str = input;
        let output = '';

        for (
            let block = 0, charCode, i = 0, map = chars;
            str.charAt(i | 0) || ((map = '='), i % 1);
            output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
        ) {
            charCode = str.charCodeAt((i += 3 / 4));

            if (charCode > 0xff) {
                throw new Error(
                    "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
                );
            }

            block = (block << 8) | charCode;
        }

        return output;
    },
    decode: (input) => {
        const str = input.replace(/=+$/, '');
        let output = '';

        if (str.length % 4 === 1) {
            throw new Error(
                "'atob' failed: The string to be decoded is not correctly encoded."
            );
        }
        for (
            let bc = 0, bs = 0, buffer, i = 0;
            // eslint-disable-next-line no-cond-assign
            (buffer = str.charAt(i++));
            ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
                ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
                : 0
        ) {
            buffer = chars.indexOf(buffer);
        }

        return output;
    },
};

const shuffle = () => {
    const a = chars.split('');
    const n = a.length;

    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join('');
};

const forReactNativeBase64ToBlob = (
    b64Data,
    contentType,
    sliceSize = 512
) => {
    const byteCharacters = Base64.encode(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    return blob;
};


export const reactNativeBlobConverter = (photo, uri) => {
    const ccc = photo.split(',')[1];

    console.log("photo", photo);
    console.log("ccc", ccc);
    console.log("uri", uri);

    const mimeType = photo.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/);
    const contentType = mimeType ? mimeType[0] : 'image/png';

    const blob = forReactNativeBase64ToBlob(photo, contentType);

    const imageData = {
        name: shuffle(), // for image name only
        type: blob.type,
        uri,
    };

    return uri ? imageData : blob;
};