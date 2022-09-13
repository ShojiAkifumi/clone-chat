import Resizer from "react-image-file-resizer";
import {
  AiOutlinePlus,
  AiOutlineCamera,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1920,
      1280,
      "WEBP",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });

const UploadImageFile = ({ imageData, setImageData, setOpenMedia }) => {
  const onSetImageFile = async (e) => {
    const file = e.target.files[0];
    if (file !== undefined) {
      if (/image.*/.exec(file.type)) {
        await resizeFile(file).then((resizefiles) => {
          const imgName =
            file.name.substring(0, file.name.lastIndexOf(".")) + ".webp";
          const image = new Image(),
            blobURL = URL.createObjectURL(resizefiles);
          image.src = blobURL;
          image.onload = function () {
            setImageData({
              name: imgName,
              data: resizefiles,
              ratio: image.width / image.height,
              localUrl: blobURL,
            });
          };
        });
      } else {
        window.alert("画像のみアップロードできます");
      }
      e.target.value = "";
    }
  };
  const resetImageFile = () => {
    setImageData(null);
    setOpenMedia(false);
  };
  return (
    <>
      {imageData ? (
        <div className="image-view">
          <label className="imageLabel">
            <img src={imageData.localUrl} alt={imageData.name} height="30" />
            <input type="file" accept="image/*" onChange={onSetImageFile} />
            <button onClick={resetImageFile}>
              <AiOutlineCloseCircle />
            </button>
          </label>
        </div>
      ) : (
        <>
          <label className="imageLabel">
            <input type="file" accept="image/*" onChange={onSetImageFile} />
            <AiOutlinePlus />
          </label>
          <label className="imageLabel">
            <input
              type="file"
              accept="image/*"
              capture="camera"
              onChange={onSetImageFile}
            />
            <AiOutlineCamera />
          </label>
        </>
      )}
    </>
  );
};

export default UploadImageFile;
