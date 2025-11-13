// src/data/playlistData.ts
export const curatedPlaylists = {
  Energetic: {
    English: ["PL8fVUTBmJhHJ0z0_Xb7sK8L8Rm3knsG1Z", "PLxyz12345"], // real playlist IDs
    Hindi: ["PLhindi1", "PLhindi2"],
    Nepali: ["PLnepal1", "PLnepal2"],
  },
  Chill: {
    English: ["PLchill1", "PLchill2"],
    Hindi: ["PLchillHindi1", "PLchillHindi2"],
    Nepali: ["PLchillNepali1", "PLchillNepali2"],
  },
  Romantic: {
    English: ["PLromantic1", "PLromantic2"],
    Hindi: ["PLromHindi1", "PLromHindi2"],
    Nepali: ["PLromNep1", "PLromNep2"],
  },
  Sad: {
    English: ["PLsad1", "PLsad2"],
    Hindi: ["PLsadHindi1", "PLsadHindi2"],
    Nepali: ["PLsadNep1", "PLsadNep2"],
  },
  Focus: {
    English: ["PLfocus1", "PLfocus2"],
    Hindi: ["PLfocusHindi1", "PLfocusHindi2"],
    Nepali: ["PLfocusNep1", "PLfocusNep2"],
  },
};

// Optional: multiple keywords for fallback if needed
export const moodKeywords = {
  Energetic: ["Energetic", "Workout", "Party", "Upbeat"],
  Chill: ["Chill", "Relax", "Lounge", "Calm"],
  Romantic: ["Romantic", "Love", "Heartfelt"],
  Sad: ["Sad", "Melancholy", "Emotional"],
  Focus: ["Focus", "Study", "Concentration"],
};
