import { db } from "../../../firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const useMessages = () => {
  const q = query(
    collection(db, "messages"),
    orderBy("createdAt", "asc"),
    limit(100)
  );
  return useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
};

export default useMessages;
