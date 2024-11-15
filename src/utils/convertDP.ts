const convertDP = (dp: number[] | Uint8Array) => {
    const fileBlob = new Blob([new Uint8Array(dp)], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(fileBlob);

    return imageUrl;
}

export default convertDP;