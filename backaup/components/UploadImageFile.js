import React, { useState } from "react";
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
			1080,
			"JPEG",
			80,
			0,
			(uri) => {
				resolve(uri);
			},
			"base64"
		);
	});

function UploadImageFile() {
	const [imageName, setImageName] = useState("");
	const onSetImageFile = async (e) => {
		const Image = e.target.files?.[0];
		if (Image !== undefined) {
			if (/image.*/.exec(Image.type)) {
				const resizeImage = await resizeFile(Image);
				setImageName(e.target.files?.[0].name);
			} else {
				window.alert("画像のみアップロードできます");
			}
		}
	};
	const resetImageFile = () => {
		setImageName("");
	};
	return (
		<React.Fragment>
			{imageName ? (
				<div className="imageName">
					<button onClick={resetImageFile}>
						<AiOutlineCloseCircle />
					</button>
					<div>{imageName}</div>
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
		</React.Fragment>
	);
}

export default UploadImageFile;
