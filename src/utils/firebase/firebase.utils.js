import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from "firebase/firestore";

/**
 * doc คือ data ที่มันโหลดมาเสร็จแล้วแต่ถ้าจะเข้าถึงข้อมูลที่อยู่ใน firestore ต้องใช้ getDoc
 */

const firebaseConfig = {
  apiKey: "AIzaSyCY66n5I9cMUi-fhuMV18B-27HD3pcvr50",
  authDomain: "crwn-clothing-db-32137.firebaseapp.com",
  projectId: "crwn-clothing-db-32137",
  storageBucket: "crwn-clothing-db-32137.appspot.com",
  messagingSenderId: "1024735445288",
  appId: "1:1024735445288:web:848175490b28b3000e901d",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

// Create a new Document
export const createUserDocmentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  /**
   * MARK: userDocRef
   * ตัว doc มันต้องส่ง parameters ทั้งหมด 3 ตัวคือ
   * 1. ฐานข้อมูล
   * 2. ชื่อของ collection
   * 3. ID ของตัว doc ที่ต้องการที่จะเข้าถึง ซึ่งใน firestore มันจะมี uid ของเอกสารที่เราจะเข้าถึงอยู่
   */
  const userDocRef = doc(db, "users", userAuth.uid);

  // console.log(userDocRef);
  /**
   * MARK : userSnapshot
   * @function (exists)
   * userSnapshot จะมีฟังก์ชันไว้ตรวจสอบว่ามันมีข้อมูลที่เราส่งมาแล้วหรือไม่ชื่อว่า exists();
   */

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  // ถ้า ยังไม่มีข้อมูลใน collection ให้ทำการสร้างข้อมูลใหม่ขึ้นมา
  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();
    try {
      /**
       * MARK : setDoc
       * สร้างข้อมูลใหม่เข้าไปเก็บไว้ใน collection
       * @param {DocumentReference}
       * ตัวเอกสารหรือข้อมูลที่เราอ้างอิงถึง
       * @param {WithFieldValue}
       * ค่าของข้อมูลที่เราจะส่งไปให้มันจัดเก็บไว้ในเอกสาร
       */
      await setDoc(userDocRef, {
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.error(
        `something went wrong!! /n error creating the user : ${error.message}`
      );
    }
  }
  // ถ้ามีข้อมูลอยู่ใน Collection อยู่แล้ว
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

/**
 * สร้าง method ขึ้นมาเพื่อทำการอัปโหลดสินค้าของเราจาก shop-data.js ไปเก็บไว้ที่ firebase ทั้งหมด
 *
 * @param {*} collectionKey ชื่อของ collection ที่เราจะใช้
 * @param {*} objectToAdd ตัวข้อมูลที่เราต้องการจะเพิ่มเข้าไปในตัว collection
 */
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

// ดึงข้อมูลของ categories จาก firebase
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db , 'categories');
  const q = query(collectionRef);

  const querySnapshop = await getDocs(q);
  const categoryMap = querySnapshop.docs.reduce((accumulator , docSnapshot) => {
    const { title , items } = docSnapshot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  } , {});

  return categoryMap;
}
