// ============================================
// ArabLearn – Data File (data.js)
// Arab tilini o'qitish platformasi ma'lumotlari
// ============================================

// ─── Arab Alifbosi ───
const ALPHABET = [
  { id: 1, arabic: 'ا', name: 'Alif', transliteration: '/a/', forms: 'ا / ا / ا / ا', type: 'moon', audio: 'alif', sound: 'ah' },
  { id: 2, arabic: 'ب', name: 'Ba', transliteration: '/b/', forms: 'ب / بـ / ـبـ / ـب', type: 'moon', audio: 'ba', sound: 'bah' },
  { id: 3, arabic: 'ت', name: 'Ta', transliteration: '/t/', forms: 'ت / تـ / ـتـ / ـت', type: 'sun', audio: 'ta', sound: 'tah' },
  { id: 4, arabic: 'ث', name: 'Sa', transliteration: '/θ/', forms: 'ث / ثـ / ـثـ / ـث', type: 'sun', audio: 'tha', sound: 'thah' },
  { id: 5, arabic: 'ج', name: 'Jim', transliteration: '/dʒ/', forms: 'ج / جـ / ـجـ / ـج', type: 'moon', audio: 'jim', sound: 'jeem' },
  { id: 6, arabic: 'ح', name: 'Ha', transliteration: '/ħ/', forms: 'ح / حـ / ـحـ / ـح', type: 'moon', audio: 'ha', sound: 'hah' },
  { id: 7, arabic: 'خ', name: 'Xa', transliteration: '/x/', forms: 'خ / خـ / ـخـ / ـخ', type: 'moon', audio: 'xa', sound: 'khah' },
  { id: 8, arabic: 'د', name: 'Dal', transliteration: '/d/', forms: 'د / د / ـد / ـد', type: 'sun', audio: 'dal', sound: 'dal' },
  { id: 9, arabic: 'ذ', name: 'Zal', transliteration: '/ð/', forms: 'ذ / ذ / ـذ / ـذ', type: 'sun', audio: 'zal', sound: 'thal' },
  { id: 10, arabic: 'ر', name: 'Ra', transliteration: '/r/', forms: 'ر / ر / ـر / ـر', type: 'sun', audio: 'ra', sound: 'rah' },
  { id: 11, arabic: 'ز', name: 'Zay', transliteration: '/z/', forms: 'ز / ز / ـز / ـز', type: 'sun', audio: 'zay', sound: 'zayn' },
  { id: 12, arabic: 'س', name: 'Sin', transliteration: '/s/', forms: 'س / سـ / ـسـ / ـس', type: 'sun', audio: 'sin', sound: 'seen' },
  { id: 13, arabic: 'ش', name: 'Shin', transliteration: '/ʃ/', forms: 'ش / شـ / ـشـ / ـش', type: 'sun', audio: 'shin', sound: 'sheen' },
  { id: 14, arabic: 'ص', name: "So'd", transliteration: '/sˁ/', forms: 'ص / صـ / ـصـ / ـص', type: 'sun', audio: 'sad', sound: 'sad' },
  { id: 15, arabic: 'ض', name: "Do'd", transliteration: '/dˁ/', forms: 'ض / ضـ / ـضـ / ـض', type: 'sun', audio: 'dad', sound: 'dad' },
  { id: 16, arabic: 'ط', name: 'To', transliteration: '/tˁ/', forms: 'ط / طـ / ـطـ / ـط', type: 'sun', audio: 'ta2', sound: 'tah-heavy' },
  { id: 17, arabic: 'ظ', name: 'Zo', transliteration: '/ðˁ/', forms: 'ظ / ظـ / ـظـ / ـظ', type: 'sun', audio: 'za', sound: 'thah-heavy' },
  { id: 18, arabic: 'ع', name: "'Ayn", transliteration: '/ʕ/', forms: 'ع / عـ / ـعـ / ـع', type: 'moon', audio: 'ayn', sound: 'ayn' },
  { id: 19, arabic: 'غ', name: 'G\'ayn', transliteration: '/ɣ/', forms: 'غ / غـ / ـغـ / ـغ', type: 'moon', audio: 'gayn', sound: 'gayn' },
  { id: 20, arabic: 'ف', name: 'Fa', transliteration: '/f/', forms: 'ف / فـ / ـفـ / ـف', type: 'moon', audio: 'fa', sound: 'fah' },
  { id: 21, arabic: 'ق', name: 'Qof', transliteration: '/q/', forms: 'ق / قـ / ـقـ / ـق', type: 'moon', audio: 'qof', sound: 'qaf' },
  { id: 22, arabic: 'ك', name: 'Kof', transliteration: '/k/', forms: 'ك / كـ / ـكـ / ـك', type: 'moon', audio: 'kof', sound: 'kaf' },
  { id: 23, arabic: 'ل', name: 'Lam', transliteration: '/l/', forms: 'ل / لـ / ـلـ / ـل', type: 'sun', audio: 'lam', sound: 'lam' },
  { id: 24, arabic: 'م', name: 'Mim', transliteration: '/m/', forms: 'م / مـ / ـمـ / ـم', type: 'moon', audio: 'mim', sound: 'meem' },
  { id: 25, arabic: 'ن', name: 'Nun', transliteration: '/n/', forms: 'ن / نـ / ـنـ / ـن', type: 'sun', audio: 'nun', sound: 'noon' },
  { id: 26, arabic: 'ه', name: 'Ha', transliteration: '/h/', forms: 'ه / هـ / ـهـ / ـه', type: 'moon', audio: 'ha2', sound: 'hah-light' },
  { id: 27, arabic: 'و', name: 'Vov', transliteration: '/w/', forms: 'و / و / ـو / ـو', type: 'moon', audio: 'waw', sound: 'waw' },
  { id: 28, arabic: 'ي', name: 'Ya', transliteration: '/j/', forms: 'ي / يـ / ـيـ / ـي', type: 'sun', audio: 'ya', sound: 'yah' },
  { id: 29, arabic: 'ء', name: 'Hamza', transliteration: '/ʔ/', forms: 'ء', type: 'moon', audio: 'hamza', sound: 'hamzah' },
];



// ─── Lug'at so'zlari ───
const WORDS = [
  // Tabiat
  { arabic: 'شَمْس', uz: 'Quyosh', trans: 'Shams', category: 'Tabiat', icon: '☀️' },
  { arabic: 'قَمَر', uz: 'Oy', trans: 'Qamar', category: 'Tabiat', icon: '🌙' },
  { arabic: 'نَجْم', uz: 'Yulduz', trans: 'Najm', category: 'Tabiat', icon: '⭐' },
  { arabic: 'سَمَاء', uz: 'Osmon', trans: 'Samāʾ', category: 'Tabiat', icon: '🌤️' },
  { arabic: 'بَحْر', uz: 'Dengiz', trans: 'Baḥr', category: 'Tabiat', icon: '🌊' },
  { arabic: 'جَبَل', uz: 'Tog\'', trans: 'Jabal', category: 'Tabiat', icon: '⛰️' },
  { arabic: 'نَهْر', uz: 'Daryo', trans: 'Nahr', category: 'Tabiat', icon: '🏞️' },
  { arabic: 'مَاء', uz: 'Suv', trans: 'Māʾ', category: 'Tabiat', icon: '💧' },

  // Oila
  { arabic: 'أَب', uz: 'Ota', trans: 'Ab', category: 'Oila', icon: '👨' },
  { arabic: 'أُمّ', uz: 'Ona', trans: 'Umm', category: 'Oila', icon: '👩' },
  { arabic: 'أَخ', uz: 'Aka/uka', trans: 'Aḫ', category: 'Oila', icon: '👦' },
  { arabic: 'أُخْت', uz: 'Opa/singil', trans: 'Uḫt', category: 'Oila', icon: '👧' },
  { arabic: 'وَلَد', uz: 'Bola (o\'g\'il)', trans: 'Walad', category: 'Oila', icon: '👶' },
  { arabic: 'بِنْت', uz: 'Qiz bola', trans: 'Bint', category: 'Oila', icon: '👧' },
  { arabic: 'زَوْج', uz: 'Er', trans: 'Zawj', category: 'Oila', icon: '🤵' },
  { arabic: 'زَوْجَة', uz: 'Xotin', trans: 'Zawja', category: 'Oila', icon: '👰' },

  // Ovqat
  { arabic: 'خُبْز', uz: 'Non', trans: 'Ḫubz', category: 'Ovqat', icon: '🍞' },
  { arabic: 'لَحْم', uz: 'Go\'sht', trans: 'Laḥm', category: 'Ovqat', icon: '🥩' },
  { arabic: 'سَمَك', uz: 'Baliq', trans: 'Samak', category: 'Ovqat', icon: '🐟' },
  { arabic: 'أُرُزّ', uz: 'Guruch', trans: 'Uruzz', category: 'Ovqat', icon: '🍚' },
  { arabic: 'شَاي', uz: 'Choy', trans: 'Shāy', category: 'Ovqat', icon: '🍵' },
  { arabic: 'قَهْوَة', uz: 'Qahva', trans: 'Qahwa', category: 'Ovqat', icon: '☕' },
  { arabic: 'فَاكِهَة', uz: 'Meva', trans: 'Fākiha', category: 'Ovqat', icon: '🍎' },
  { arabic: 'خُضَار', uz: 'Sabzavot', trans: 'Ḫuḍār', category: 'Ovqat', icon: '🥦' },

  // Rang
  { arabic: 'أَحْمَر', uz: 'Qizil', trans: 'Aḥmar', category: 'Ranglar', icon: '🔴' },
  { arabic: 'أَزْرَق', uz: 'Ko\'k', trans: 'Azraq', category: 'Ranglar', icon: '🔵' },
  { arabic: 'أَخْضَر', uz: 'Yashil', trans: 'Aḫḍar', category: 'Ranglar', icon: '🟢' },
  { arabic: 'أَصْفَر', uz: 'Sariq', trans: 'Aṣfar', category: 'Ranglar', icon: '🟡' },
  { arabic: 'أَبْيَض', uz: 'Oq', trans: 'Abyaḍ', category: 'Ranglar', icon: '⚪' },
  { arabic: 'أَسْوَد', uz: 'Qora', trans: 'Aswad', category: 'Ranglar', icon: '⚫' },

  // Hayot
  { arabic: 'بَيْت', uz: 'Uy', trans: 'Bayt', category: 'Uy', icon: '🏠' },
  { arabic: 'بَاب', uz: 'Eshik', trans: 'Bāb', category: 'Uy', icon: '🚪' },
  { arabic: 'نَافِذَة', uz: 'Deraza', trans: 'Nāfiḏa', category: 'Uy', icon: '🪟' },
  { arabic: 'كُرْسِي', uz: 'Stul', trans: 'Kursī', category: 'Uy', icon: '🪑' },
  { arabic: 'طَاوِلَة', uz: 'Stol', trans: 'Ṭāwila', category: 'Uy', icon: '🪞' },
  { arabic: 'سَرِير', uz: 'Karavot', trans: 'Sarīr', category: 'Uy', icon: '🛏️' },

  // Ta'lim
  { arabic: 'مَدْرَسَة', uz: 'Maktab', trans: 'Madrasa', category: 'Ta\'lim', icon: '🏫' },
  { arabic: 'كِتَاب', uz: 'Kitob', trans: 'Kitāb', category: 'Ta\'lim', icon: '📚' },
  { arabic: 'قَلَم', uz: 'Qalam', trans: 'Qalam', category: 'Ta\'lim', icon: '✏️' },
  { arabic: 'مُعَلِّم', uz: 'O\'qituvchi', trans: 'Muʿallim', category: 'Ta\'lim', icon: '👨‍🏫' },
  { arabic: 'طَالِب', uz: 'O\'quvchi', trans: 'Ṭālib', category: 'Ta\'lim', icon: '👨‍🎓' },
  { arabic: 'دَرْس', uz: 'Dars', trans: 'Dars', category: 'Ta\'lim', icon: '📝' },
];

// ─── Test savollari ───
const QUIZ_QUESTIONS = [
  { q: 'Qaysi harf "Ba" deb o\'qiladi?', qArabic: null, options: ['ب', 'ت', 'ث', 'ج'], answer: 0, category: 'Harflar' },
  { q: 'Qaysi harf "Sin" deb o\'qiladi?', qArabic: null, options: ['ص', 'ش', 'س', 'ز'], answer: 2, category: 'Harflar' },
  { q: 'Bu arabcha so\'z nimani anglatadi?', qArabic: 'كِتَاب', options: ['Uy', 'Kitob', 'Kalamush', 'Eshik'], answer: 1, category: 'Lug\'at' },
  { q: 'Bu nima?', qArabic: 'أَب', options: ['Ona', 'Bola', 'Ota', 'Bobo'], answer: 2, category: 'Lug\'ат' },
  { q: '"Quyosh" arabchada qanday aytiladi?', qArabic: null, options: ['قَمَر', 'نَجْم', 'شَمْس', 'سَمَاء'], answer: 2, category: 'Tabiat' },
  { q: '"Assalomu alaykum" arabchada qanday yoziladi?', qArabic: null, options: ['كَيْفَ حَالُكَ؟', 'مَا اسْمُكَ؟', 'شُكْرًا جَزِيلًا', 'السَّلَامُ عَلَيْكُمْ'], answer: 3, category: 'Salomlashish' },
  { q: 'Bu so\'z nima?', qArabic: 'مَاء', options: ['Non', 'Suv', 'Guruch', 'Go\'sht'], answer: 1, category: 'Lug\'at' },
  { q: '"Yashil" arabchada qanday aytiladi?', qArabic: null, options: ['أَحْمَر', 'أَزْرَق', 'أَصْفَر', 'أَخْضَر'], answer: 3, category: 'Ranglar' },
  { q: 'Bu harf qanday o\'qiladi?', qArabic: 'م', options: ['Nun', 'Mim', 'Lam', 'Kof'], answer: 1, category: 'Harflar' },
  { q: '"Qahva" arabchada qanday aytiladi?', qArabic: null, options: ['شَاي', 'قَهْوَة', 'مَاء', 'عَصِير'], answer: 1, category: 'Ovqat' },
  { q: 'Bu so\'z nima?', qArabic: 'بَيْت', options: ['Uy', 'Eshik', 'Deraza', 'Stol'], answer: 0, category: 'Uy' },
  { q: '"Kitob" arabchada?', qArabic: null, options: ['قَلَم', 'مَدْرَسَة', 'كِتَاب', 'دَرْس'], answer: 2, category: 'Ta\'lim' },
  { q: 'Bu harf?', qArabic: 'ع', options: ['Gayn', 'Fa', '\'Ayn', 'Qof'], answer: 2, category: 'Harflar' },
  { q: '"Yulduz" arabchada?', qArabic: null, options: ['شَمْس', 'قَمَر', 'سَمَاء', 'نَجْم'], answer: 3, category: 'Tabiat' },
  { q: 'Bu so\'z?', qArabic: 'مَدْرَسَة', options: ['O\'qituvchi', 'Maktab', 'Kitob', 'O\'quvchi'], answer: 1, category: 'Ta\'lim' },
];

// ─── Yutuqlar ───
const ACHIEVEMENTS = [
  { id: 'alphabet_beginner', icon: '🔤', name: 'Harfchi', desc: '10 ta harf bilan tanishing', condition: s => s.learnedLetters >= 10 },
  { id: 'quiz_master', icon: '🎯', name: 'Test Ustasi', desc: 'Testni 80%+ natija bilan o\'ting', condition: s => s.quizBestScore >= 80 },
  { id: 'word_collector', icon: '📝', name: 'So\'z Yig\'uvchi', desc: '20 ta so\'zni ko\'ring', condition: s => s.wordsViewed >= 20 },
  { id: 'all_alphabet', icon: '🔠', name: 'Alifbo Fotihi', desc: 'Barcha harflar bilan tanishing', condition: s => s.learnedLetters >= 29 },
  { id: 'centurion', icon: '💯', name: 'Yuz Ball', desc: '100 ball to\'plang', condition: s => s.totalPoints >= 100 },
];
