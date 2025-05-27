import toast from "react-hot-toast";

const UploadImages = ({ images, setImages, maxImages = 4 }) => {
  const handleSelectfile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isDuplicate = images.some(
      (img) => img.name === file.name && img.size === file.size
    );
    if (isDuplicate) return toast.error("Duplicate image file");

    setImages((prev) => [...prev, { type: "new", file }]);
  };

  const handleRemoveImg = (index) => {
    setImages((prev) => {
      console.log(prev);
      return prev.filter((_, idx) => index !== idx);
    });
  };
  return (
    <div className="flex gap-2">
      {images.map((img, idx) => {
        return (
          <div
            key={idx}
            className="group/removeImg relative w-14 aspect-square rounded-lg overflow-hidden bg-gray-200"
          >
            <img
              src={img.url || URL.createObjectURL(img.file)}
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
          className="w-14 aspect-square bg-zinc-200 text-zinc-500 rounded-lg grid place-items-center"
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
