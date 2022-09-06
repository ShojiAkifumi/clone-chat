import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Resizer from "react-image-file-resizer";
import { updateProfile } from "firebase/auth";

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      100,
      100,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "blob"
    );
  });

const uploadAvaterImage = async (auth, file) => {
  const avatarRef = ref(storage, `avatars/avatar-${auth.currentUser.uid}.png`);
  if (file !== undefined) {
    if (/image.*/.exec(file.type)) {
      await resizeFile(file).then((blob) => {
        uploadBytes(avatarRef, blob).then(() => {
          getDownloadURL(avatarRef).then((url) => {
            updateProfile(auth.currentUser, {
              photoURL: url,
            });
          });
        });
      });
    } else {
      window.alert("画像のみアップロードできます");
    }
  }
};

export default uploadAvaterImage;
