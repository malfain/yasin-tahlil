// 14 langkah bacaan tahlil (teks dari desain). Target "Tahlil" mengikuti pengaturan 33/100.
export function tahlilSteps(jumlahTahlil = 100) {
  return [
    { name: 'Hadiah Al-Fatihah', target: 1, arab: 'اِلٰى حَضْرَةِ النَّبِيِّ الْمُصْطَفٰى مُحَمَّدٍ ﷺ', latin: 'Ilā ḥaḍratin-nabiyyil-muṣṭafā Muḥammadin ṣallallāhu ‘alaihi wa sallam' },
    { name: 'Surah Al-Ikhlas', target: 3, arab: 'قُلْ هُوَ اللّٰهُ اَحَدٌ', latin: 'Qul huwallāhu aḥad' },
    { name: 'Surah Al-Falaq', target: 1, arab: 'قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِ', latin: 'Qul a‘ūżu birabbil-falaq' },
    { name: 'Surah An-Nas', target: 1, arab: 'قُلْ اَعُوْذُ بِرَبِّ النَّاسِ', latin: 'Qul a‘ūżu birabbin-nās' },
    { name: 'Surah Al-Fatihah', target: 1, arab: 'اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَ', latin: 'Al-ḥamdu lillāhi rabbil-‘ālamīn' },
    { name: 'Al-Baqarah 1–5', target: 1, arab: 'الۤمّۤ ۚ ذٰلِكَ الْكِتٰبُ لَا رَيْبَ ۛ فِيْهِ', latin: 'Alif lām mīm. Żālikal-kitābu lā raiba fīh' },
    { name: 'Al-Baqarah 163', target: 1, arab: 'وَاِلٰهُكُمْ اِلٰهٌ وَّاحِدٌ ۚ لَآ اِلٰهَ اِلَّا هُوَ', latin: 'Wa ilāhukum ilāhuw wāḥid, lā ilāha illā huw' },
    { name: 'Ayat Kursi (Al-Baqarah 255)', target: 1, arab: 'اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْقَيُّوْمُ', latin: 'Allāhu lā ilāha illā huw, al-ḥayyul-qayyūm' },
    { name: 'Al-Baqarah 284–286', target: 1, arab: 'لِلّٰهِ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِ', latin: 'Lillāhi mā fis-samāwāti wa mā fil-arḍ' },
    { name: 'Istighfar', target: 3, arab: 'اَسْتَغْفِرُ اللّٰهَ الْعَظِيْمَ', latin: 'Astagfirullāhal-‘aẓīm' },
    { name: 'Tahlil', target: jumlahTahlil, arab: 'لَا اِلٰهَ اِلَّا اللّٰهُ', latin: 'Lā ilāha illallāh' },
    { name: 'Shalawat Nabi', target: 3, arab: 'اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ', latin: 'Allāhumma ṣalli ‘alā sayyidinā Muḥammad' },
    { name: 'Tasbih', target: 33, arab: 'سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ', latin: 'Subḥānallāhi wa biḥamdih' },
    { name: 'Doa Tahlil', target: 1, arab: 'اَللّٰهُمَّ تَقَبَّلْ وَاَوْصِلْ ثَوَابَ مَا قَرَأْنَاهُ', latin: 'Allāhumma taqabbal wa auṣil ṡawāba mā qara’nāh' }
  ];
}
