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
			"JPEG",
			80,
			0,
			(uri) => {
				resolve(uri);
			},
			"blob"
		);
	});

const UploadImageFile = ({ imageData, setImageData }) => {
	const onSetImageFile = async (e) => {
		const file = e.target.files[0];
		if (file !== undefined) {
			if (/image.*/.exec(file.type)) {
				await resizeFile(file).then((resizefiles) => {
					setImageData({ name: file.name, data: resizefiles });
				});
			} else {
				window.alert("画像のみアップロードできます");
			}
			e.target.value = "";
		}
	};
	const resetImageFile = () => {
		setImageData(null);
	};
	return (
		<>
			{imageData ? (
				<div className="imageName">
					<button onClick={resetImageFile}>
						<AiOutlineCloseCircle />
					</button>
					<label className="imageLabel">
						{imageData.name}
						<input type="file" accept="image/*" onChange={onSetImageFile} />
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
