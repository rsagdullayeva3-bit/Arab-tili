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

// ─── Darslar ───
const LESSONS = [
  {
    id: 1,
    icon: '🔤',
    level: 'beginner',
    levelText: 'Boshlang\'ich',
    title: 'Arab Alifbosi – 1-qism',
    desc: 'Birinchi 10 ta harfni o\'rganing: Alif dan Xo\'gacha.',
    duration: '15 daqiqa',
    section: 'Alifbo',
    content: {
      intro: 'Arab alifbosi 29 ta harfdan iborat. U o\'ngdan chapga yoziladi. Harflarning 4 shakli mavjud: yakka, so\'z boshida, o\'rtada va oxirida.',
      vocabulary: [
        { arabic: 'أَب', uz: 'Ota', trans: 'Ab' },
        { arabic: 'أُمّ', uz: 'Ona', trans: 'Umm' },
        { arabic: 'بَيْت', uz: 'Uy', trans: 'Bayt' },
        { arabic: 'كِتَاب', uz: 'Kitob', trans: 'Kitāb' },
        { arabic: 'بَاب', uz: 'Eshik', trans: 'Bāb' },
        { arabic: 'جَبَل', uz: 'Tog\'', trans: 'Jabal' },
      ],
      examples: [
        { arabic: 'أَنَا أَكْتُبُ', trans: 'Men yozaman' },
        { arabic: 'هَذَا كِتَابٌ', trans: 'Bu kitob' },
      ]
    }
  },
  {
    id: 2,
    icon: '🌙',
    level: 'beginner',
    levelText: 'Boshlang\'ich',
    title: 'Arab Alifbosi – 2-qism',
    desc: 'Keyingi 10 ta harf: Dal dan Shinigacha.',
    duration: '15 daqiqa',
    section: 'Alifbo',
    content: {
      intro: 'Ushbu darsda shamsiy va qamariy harflar haqida bilib olasiz. Shamsiy harflar "al-" qo\'shimchasida harfning o\'zi ikki marta aytiladi.',
      vocabulary: [
        { arabic: 'دَرْس', uz: 'Dars', trans: 'Dars' },
        { arabic: 'شَمْس', uz: 'Quyosh', trans: 'Shams' },
        { arabic: 'رَجُل', uz: 'Erkak', trans: 'Rajul' },
        { arabic: 'زَهْرَة', uz: 'Gul', trans: 'Zahra' },
        { arabic: 'سَمَاء', uz: 'Osmon', trans: 'Samāʾ' },
        { arabic: 'صَدِيق', uz: 'Do\'st', trans: 'Sadīq' },
      ],
      examples: [
        { arabic: 'الشَّمْسُ مُشْرِقَةٌ', trans: 'Quyosh porlab turibdi' },
        { arabic: 'هُوَ صَدِيقِي', trans: 'U mening do\'stim' },
      ]
    }
  },
  {
    id: 3,
    icon: '⭐',
    level: 'beginner',
    levelText: 'Boshlang\'ich',
    title: 'Arab Alifbosi – 3-qism',
    desc: 'Oxirgi harflar: To\'dan Yagacha.',
    duration: '15 daqiqa',
    section: 'Alifbo',
    content: {
      intro: 'Harakat belgilari: Fatha (a), Kasra (i), Damma (u). Bu belgilar harfning qanday o\'qilishini belgilaydi.',
      vocabulary: [
        { arabic: 'عَيْن', uz: 'Ko\'z', trans: 'ʿAyn' },
        { arabic: 'قَمَر', uz: 'Oy (falak)', trans: 'Qamar' },
        { arabic: 'كَلْب', uz: 'It', trans: 'Kalb' },
        { arabic: 'لَيْل', uz: 'Tun', trans: 'Layl' },
        { arabic: 'مَاء', uz: 'Suv', trans: 'Māʾ' },
        { arabic: 'نَهْر', uz: 'Daryo', trans: 'Nahr' },
      ],
      examples: [
        { arabic: 'النَّهْرُ كَبِيرٌ', trans: 'Daryo katta' },
        { arabic: 'الْقَمَرُ جَمِيلٌ', trans: 'Oy chiroyli' },
      ]
    }
  },
  {
    id: 4,
    icon: '👋',
    level: 'beginner',
    levelText: 'Boshlang\'ich',
    title: 'Salom va Tanishish',
    desc: 'Arabchada salomlashish va tantanali iboralarni o\'rganing.',
    duration: '20 daqiqa',
    section: 'Kundalik Hayot',
    content: {
      intro: 'Arab madaniyatida salomlashish juda muhim. Asosiy salom – "As-salāmu ʿalaykum" va uning javobi "Wa ʿalaykum as-salām".',
      vocabulary: [
        { arabic: 'السَّلَامُ عَلَيْكُمْ', uz: 'Assalomu alaykum', trans: 'As-salāmu ʿalaykum' },
        { arabic: 'وَعَلَيْكُمُ السَّلَامُ', uz: 'Va alaykum assalom', trans: 'Wa ʿalaykum as-salām' },
        { arabic: 'كَيْفَ حَالُكَ؟', uz: 'Qandaysiz?', trans: 'Kayfa ḥāluka?' },
        { arabic: 'بِخَيْر، شُكْرًا', uz: 'Yaxshi, rahmat', trans: 'Biḫayr, shukran' },
        { arabic: 'اسْمِي...', uz: 'Mening ismim...', trans: 'Ismī...' },
        { arabic: 'مَا اسْمُكَ؟', uz: 'Ismingiz nima?', trans: 'Mā ismuka?' },
      ],
      examples: [
        { arabic: 'السَّلَامُ عَلَيْكُمْ، كَيْفَ حَالُكَ؟', trans: 'Assalomu alaykum, qandaysiz?' },
        { arabic: 'اسْمِي مُحَمَّد، وَأَنَا مِنْ أُوزبَكِسْتَان', trans: 'Mening ismim Muhammad, men O\'zbekistonlikman' },
      ]
    }
  },
  {
    id: 5,
    icon: '🔢',
    level: 'beginner',
    levelText: 'Boshlang\'ich',
    title: 'Arabcha Raqamlar',
    desc: '1 dan 100 gacha arabcha raqamlarni o\'rganing.',
    duration: '25 daqiqa',
    section: 'Raqamlar',
    content: {
      intro: 'Arab raqamlari aslida biz ishlatiganlar bilan bir xil (1,2,3...). Lekin klassik arabcha raqamlar boshqacha yoziladi.',
      vocabulary: [
        { arabic: 'وَاحِد', uz: 'Bir (1)', trans: 'Wāḥid' },
        { arabic: 'اثْنَان', uz: 'Ikki (2)', trans: 'Ithnān' },
        { arabic: 'ثَلَاثَة', uz: 'Uch (3)', trans: 'Thalātha' },
        { arabic: 'أَرْبَعَة', uz: 'To\'rt (4)', trans: 'Arbaʿa' },
        { arabic: 'خَمْسَة', uz: 'Besh (5)', trans: 'Ḫamsa' },
        { arabic: 'عَشَرَة', uz: 'O\'n (10)', trans: 'ʿAshara' },
      ],
      examples: [
        { arabic: 'عِنْدِي خَمْسَةُ كُتُب', trans: 'Menda beshta kitob bor' },
        { arabic: 'الثَّلَاثَاءُ يَوْمٌ جَمِيلٌ', trans: 'Seshanba chiroyli kun' },
      ]
    }
  },
  {
    id: 6,
    icon: '🏠',
    level: 'beginner',
    levelText: 'Boshlang\'ich',
    title: 'Uy va Oila',
    desc: 'Oila a\'zolari va uy jihozlarini arabcha nomlarini bilib oling.',
    duration: '20 daqiqa',
    section: 'Kundalik Hayot',
    content: {
      intro: 'Arab tilida ot va sifatlar jinsga ko\'ra o\'zgaradi: muzakkar (erkak jins) va mu\'annas (ayol jins).',
      vocabulary: [
        { arabic: 'أَسْرَة', uz: 'Oila', trans: 'Usra' },
        { arabic: 'أَخ', uz: 'Aka/uka', trans: 'Aḫ' },
        { arabic: 'أُخْت', uz: 'Singil/opa', trans: 'Uḫt' },
        { arabic: 'جَدّ', uz: 'Bobo', trans: 'Jadd' },
        { arabic: 'جَدَّة', uz: 'Buvi', trans: 'Jadda' },
        { arabic: 'غُرْفَة', uz: 'Xona', trans: 'Ghurfa' },
      ],
      examples: [
        { arabic: 'أُسْرَتِي صَغِيرَةٌ', trans: 'Mening oilam kichik' },
        { arabic: 'لِي أَخٌ وَأُخْتَان', trans: 'Menda bir aka va ikkita singil bor' },
      ]
    }
  },
  {
    id: 7,
    icon: '🍎',
    level: 'intermediate',
    levelText: 'O\'rta',
    title: 'Ovqat va Taom',
    desc: 'Arabcha ovqat nomlari va restorada muloqot.',
    duration: '25 daqiqa',
    section: 'Kundalik Hayot',
    content: {
      intro: 'Arab oshxonasi boy va xilma-xil. Ovqatlanish arabcha iboralari hayotda juda ko\'p qo\'llaniladi.',
      vocabulary: [
        { arabic: 'طَعَام', uz: 'Taom/Ovqat', trans: 'Taʿām' },
        { arabic: 'خُبْز', uz: 'Non', trans: 'Ḫubz' },
        { arabic: 'أُرُزّ', uz: 'Guruch', trans: 'Uruzz' },
        { arabic: 'لَحْم', uz: 'Go\'sht', trans: 'Laḥm' },
        { arabic: 'مَاء', uz: 'Suv', trans: 'Māʾ' },
        { arabic: 'شَاي', uz: 'Choy', trans: 'Shāy' },
      ],
      examples: [
        { arabic: 'أُرِيدُ كُوبَ مَاءٍ مِنْ فَضْلِكَ', trans: 'Iltimos, bir stakan suv bering' },
        { arabic: 'الطَّعَامُ لَذِيذٌ جِدًّا', trans: 'Taom juda mazali' },
      ]
    }
  },
  {
    id: 8,
    icon: '⏰',
    level: 'intermediate',
    levelText: 'O\'rta',
    title: 'Vaqt va Kun Tartibi',
    desc: 'Soat, kun, oy va fasllarni arabchada ifodalash.',
    duration: '30 daqiqa',
    section: 'Vaqt',
    content: {
      intro: 'Arab tilida vaqtni ifodalash o\'zbekchadan farq qiladi. Kun ertasi bilan boshlanadi.',
      vocabulary: [
        { arabic: 'السَّاعَة', uz: 'Soat', trans: 'As-sāʿa' },
        { arabic: 'صَبَاح', uz: 'Ertalab', trans: 'Sabāḥ' },
        { arabic: 'مَسَاء', uz: 'Kechqurun', trans: 'Masāʾ' },
        { arabic: 'يَوْم', uz: 'Kun', trans: 'Yawm' },
        { arabic: 'أُسْبُوع', uz: 'Hafta', trans: 'Usbūʿ' },
        { arabic: 'شَهْر', uz: 'Oy', trans: 'Shahr' },
      ],
      examples: [
        { arabic: 'السَّاعَةُ الثَّالِثَة الآن', trans: 'Hozir soat uch' },
        { arabic: 'صَبَاحَ الْخَيْرِ', trans: 'Xayrli tong' },
      ]
    }
  },
  {
    id: 9,
    icon: '📖',
    level: 'advanced',
    levelText: 'Yuqori',
    title: 'Qur\'on Tilining Asoslari',
    desc: 'Qur\'on arabchasidagi maxsus grammatik shakllar.',
    duration: '40 daqiqa',
    section: 'Qur\'on',
    content: {
      intro: 'Qur\'on arabchasi klassik fus-ha tildir. Harakat (harakalar) va tajvid qoidalari muhim ahamiyatga ega.',
      vocabulary: [
        { arabic: 'بِسْمِ اللهِ', uz: 'Bismilloh', trans: 'Bismillāh' },
        { arabic: 'الْحَمْدُ لِلّهِ', uz: 'Alhamdulilloh', trans: 'Al-ḥamdu lillāh' },
        { arabic: 'سُبْحَانَ اللهِ', uz: 'Subhonalloh', trans: 'Subḥānallāh' },
        { arabic: 'اَللهُ أَكْبَر', uz: 'Allohu Akbar', trans: 'Allāhu Akbar' },
        { arabic: 'إِنْ شَاءَ اللهُ', uz: 'Inshalloh', trans: 'In shāʾa-llāh' },
        { arabic: 'مَاشَاءَ اللهُ', uz: 'Mashaalloh', trans: 'Mā shāʾa-llāh' },
      ],
      examples: [
        { arabic: 'بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ', trans: 'Mehribon va Rahmdil Alloh nomi bilan' },
        { arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', trans: 'Barcha hamdlar olamlar Rabbisi Allohga' },
      ]
    }
  },
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
  { id: 'first_lesson', icon: '📚', name: 'Birinchi Qadam', desc: 'Birinchi darsni tugating', condition: s => s.completedLessons >= 1 },
  { id: 'alphabet_beginner', icon: '🔤', name: 'Harfchi', desc: '10 ta harf bilan tanishing', condition: s => s.learnedLetters >= 10 },
  { id: 'quiz_master', icon: '🎯', name: 'Test Ustasi', desc: 'Testni 80%+ natija bilan o\'ting', condition: s => s.quizBestScore >= 80 },
  { id: 'word_collector', icon: '📝', name: 'So\'z Yig\'uvchi', desc: '20 ta so\'zni ko\'ring', condition: s => s.wordsViewed >= 20 },
  { id: 'five_lessons', icon: '🏅', name: '5 Dars Hamohang', desc: '5 ta darsni tugating', condition: s => s.completedLessons >= 5 },
  { id: 'all_alphabet', icon: '🔠', name: 'Alifbo Fotihi', desc: 'Barcha harflar bilan tanishing', condition: s => s.learnedLetters >= 29 },
  { id: 'centurion', icon: '💯', name: 'Yuz Ball', desc: '100 ball to\'plang', condition: s => s.totalPoints >= 100 },
  { id: 'all_lessons', icon: '🏆', name: 'To\'liq Kurs', desc: 'Barcha darslarni tugatng', condition: s => s.completedLessons >= LESSONS.length },
];
