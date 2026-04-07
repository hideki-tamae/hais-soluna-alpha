import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

const seed = async () => {
  const userId = "hideki_tamae_01";
  const data = {
    uid: userId,
    resources: { energy: 8916, food: 5293, materials: 3630, knowledge: 1815 },
    population: { total: 14952, growth_rate: 1.2, happiness: 95 },
    careLogs: [
      { id: "1", timestamp: Date.now(), category: "health", value: 80, description: "System Awakening" }
    ],
    lastUpdate: Date.now()
  };

  try {
    console.log("Attempting to connect to Firestore...");
    await setDoc(doc(db, 'civilizations', userId), data);
    console.log("✅ SUCCESS: Civilization OS Data injected.");
    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR:", error);
    process.exit(1);
  }
};

seed();
