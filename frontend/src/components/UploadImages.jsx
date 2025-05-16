const UploadImages = ({ images, setImages, maxImages = 4 }) => {
  const handleSelectfile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => [...prev, file]);
    }
  };

  const handleRemoveImg = (idx) => {
    setImages((prev) => {
      prev.splice(idx, 1);
      return [...prev];
    });
  };
  return (
    <div className="flex gap-2 p-2 rounded-lg">
      {images.map((img, idx) => {
        return (
          <div
            key={idx}
            className="group/removeImg relative w-16 aspect-square rounded-lg overflow-hidden bg-gray-200"
          >
            <img
              src={URL.createObjectURL(img)}
              alt="upload image"
              className="w-full h-full object-contain"
            />
            <button
              type="button"
              onClick={() => handleRemoveImg(idx)}
              className="absolute top-full group-hover/removeImg:top-0 transition-all ease duration-300 block w-full h-full bg-black/50 z-10 text-white cursor-pointer"
            >
              <i className="ri-delete-bin-6-line" />
            </button>
          </div>
        );
      })}
      {images.length < maxImages && (
        <label
          htmlFor="image"
          className="w-16 aspect-square bg-zinc-200 text-zinc-500 rounded-lg grid place-items-center"
        >
          <i className="ri-image-add-fill ri-xl"></i>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleSelectfile}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default UploadImages;
