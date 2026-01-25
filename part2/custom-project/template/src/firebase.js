/**
 * Firebase Helper
 *
 * Connection to Firebase Realtime Database (using local emulator).
 * Provides basic functions for multiplayer state sync.
 */

// Emulator configuration (works locally without production Firebase)
const firebaseConfig = {
  databaseURL: "http://127.0.0.1:9000?ns=workshop-demo"
};

let db = null;

export async function initFirebase() {
  // Import Firebase modules (assumes CDN scripts loaded in HTML)
  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js');
  const { getDatabase } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');

  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);

  return db;
}

export async function writeData(path, data) {
  const { ref, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  const dataRef = ref(db, path);
  await set(dataRef, data);
}

export async function listenToData(path, callback) {
  const { ref, onValue } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  const dataRef = ref(db, path);
  onValue(dataRef, snapshot => {
    callback(snapshot.val());
  });
}

export async function setupPresence(path, onlineData, offlineData) {
  const { ref, onDisconnect, set } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js');
  const presenceRef = ref(db, path);

  // Set online status
  await set(presenceRef, onlineData);

  // Set offline status when disconnected
  onDisconnect(presenceRef).set(offlineData);
}
