// Susunan bacaan tahlil menurut Kitab Majmu' Syarif, sebagaimana dimuat NU Online:
// https://nu.or.id/syariah/susunan-bacaan-tahlil-doa-arwah-lengkap-dan-terjemahannya-drr3t
// - Ayat Al-Qur'an: teks, latin, dan terjemah Kemenag dari equran.id (kata-katanya sama persis dengan teks NU).
// - Bacaan selain ayat: teks Arab & terjemah NU Online (salah ketik ringan diperbaiki); latin ditransliterasikan.
// Tiap langkah: { name, target, note?, key?, parts: [{ label?, arab, latin, arti }] }.
// Target langkah "Tahlil" mengikuti pengaturan jumlah (bawaan 160 sesuai Majmu' Syarif).
export const JUMLAH_TAHLIL = [33, 100, 160];

export function tahlilSteps(jumlahTahlil = 160) {
  return [
    {
      "name": "Pengantar Al-Fatihah",
      "target": 1,
      "parts": [
        {
          "label": "Pengantar",
          "arab": "اِلَى حَضْرَةِ النَّبِيِّ صَلَّى اللهُ عَلَيهِ وَسَلَّمَ وَآلِهِ وَصَحْبِهِ شَيْءٌ لِلهِ لَهُمُ الْفَاتِحَةُ",
          "latin": "Ilā ḥaḍratin-nabiyyi ṣallallāhu ‘alaihi wa sallama wa ālihī wa ṣaḥbihī, syai’ul lillāhi lahumul-fātiḥah.",
          "arti": "Untuk yang terhormat Nabi Muhammad ﷺ, segenap keluarga, dan para sahabatnya. Bacaan Al-Fatihah ini kami tujukan kepada Allah dan pahalanya untuk mereka semua. Al-Fatihah…"
        },
        {
          "label": "Surah Al-Fatihah",
          "arab": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ﴿١﴾ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ ﴿٢﴾ الرَّحْمٰنِ الرَّحِيْمِۙ ﴿٣﴾ مٰلِكِ يَوْمِ الدِّيْنِۗ ﴿٤﴾ اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ ﴿٥﴾ اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ ﴿٦﴾ صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ﴿٧﴾",
          "latin": "Bismillāhir-raḥmānir-raḥīm(i). Al-ḥamdu lillāhi rabbil-‘ālamīn(a). Ar-raḥmānir-raḥīm(i). Māliki yaumid-dīn(i). Iyyāka na‘budu wa iyyāka nasta‘īn(u), Ihdinaṣ-ṣirāṭal-mustaqīm(a). Ṣirāṭal-lażīna an‘amta ‘alaihim, gairil-magḍūbi ‘alaihim wa laḍ-ḍāllīn(a).",
          "arti": "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam Yang Maha Pengasih lagi Maha Penyayang, Pemilik hari Pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan. Bimbinglah kami ke jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat, bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) orang-orang yang sesat."
        }
      ],
      "note": "Ditutup dengan “āmīn” setelah Al-Fatihah."
    },
    {
      "name": "Surah Al-Ikhlas",
      "target": 3,
      "parts": [
        {
          "arab": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
          "latin": "Bismillāhir-raḥmānir-raḥīm(i).",
          "arti": "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang."
        },
        {
          "arab": "قُلْ هُوَ اللّٰهُ اَحَدٌۚ ﴿١﴾ اَللّٰهُ الصَّمَدُۚ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُوْلَدْۙ ﴿٣﴾ وَلَمْ يَكُنْ لَّهٗ كُفُوًا اَحَدٌ ﴿٤﴾",
          "latin": "Qul huwallāhu aḥad(un). Allāhuṣ-ṣamad(u). Lam yalid wa lam yūlad. Wa lam yakul lahū kufuwan aḥad(un).",
          "arti": "Katakanlah (Nabi Muhammad), “Dialah Allah Yang Maha Esa. Allah tempat meminta segala sesuatu. Dia tidak beranak dan tidak pula diperanakkan serta tidak ada sesuatu pun yang setara dengan-Nya.”"
        },
        {
          "label": "Tahlil & takbir",
          "arab": "لاَ اِلَهَ اِلاَّ اللهُ وَاللهُ اَكْبَرُ",
          "latin": "Lā ilāha illallāhu wallāhu akbar.",
          "arti": "Tiada tuhan selain Allah, dan Allah Maha Besar."
        }
      ],
      "note": "QS. Al-Ikhlas: 1–4 · dibaca 3 kali, lalu tahlil dan takbir."
    },
    {
      "name": "Surah Al-Falaq",
      "target": 1,
      "parts": [
        {
          "arab": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
          "latin": "Bismillāhir-raḥmānir-raḥīm(i).",
          "arti": "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang."
        },
        {
          "arab": "قُلْ اَعُوْذُ بِرَبِّ الْفَلَقِۙ ﴿١﴾ مِنْ شَرِّ مَا خَلَقَۙ ﴿٢﴾ وَمِنْ شَرِّ غَاسِقٍ اِذَا وَقَبَۙ ﴿٣﴾ وَمِنْ شَرِّ النَّفّٰثٰتِ فِى الْعُقَدِۙ ﴿٤﴾ وَمِنْ شَرِّ حَاسِدٍ اِذَا حَسَدَ ﴿٥﴾",
          "latin": "Qul a‘ūżu birabbil-falaq(i). Min syarri mā khalaq(a). Wa min syarri gāsiqin iżā waqab(a). Wa min syarrin-naffāṡāti fil-‘uqad(i). Wa min syarri ḥāsidin iżā ḥasad(a).",
          "arti": "Katakanlah (Nabi Muhammad), “Aku berlindung kepada Tuhan yang (menjaga) fajar (subuh) dari kejahatan (makhluk yang) Dia ciptakan, dari kejahatan malam apabila telah gelap gulita, dari kejahatan perempuan-perempuan (penyihir) yang meniup pada buhul-buhul (talinya), dan dari kejahatan orang yang dengki apabila dia dengki.”"
        },
        {
          "label": "Tahlil & takbir",
          "arab": "لاَ اِلَهَ اِلاَّ اللهُ وَاللهُ اَكْبَرُ",
          "latin": "Lā ilāha illallāhu wallāhu akbar.",
          "arti": "Tiada tuhan selain Allah, dan Allah Maha Besar."
        }
      ],
      "note": "QS. Al-Falaq: 1–5, lalu tahlil dan takbir."
    },
    {
      "name": "Surah An-Nas",
      "target": 1,
      "parts": [
        {
          "arab": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
          "latin": "Bismillāhir-raḥmānir-raḥīm(i).",
          "arti": "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang."
        },
        {
          "arab": "قُلْ اَعُوْذُ بِرَبِّ النَّاسِۙ ﴿١﴾ مَلِكِ النَّاسِۙ ﴿٢﴾ اِلٰهِ النَّاسِۙ ﴿٣﴾ مِنْ شَرِّ الْوَسْوَاسِ ەۙ الْخَنَّاسِۖ ﴿٤﴾ الَّذِيْ يُوَسْوِسُ فِيْ صُدُوْرِ النَّاسِۙ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾",
          "latin": "Qul a‘ūżu birabbin-nās(i). Malikin-nās(i). Ilāhin-nās(i). Min syarril-waswāsil-khannās(i). Allażī yuwaswisu fī ṣudūrin-nās(i). Minal jinnati wan-nās(i).",
          "arti": "Katakanlah (Nabi Muhammad), “Aku berlindung kepada Tuhan manusia, raja manusia, sembahan manusia dari kejahatan (setan) pembisik yang bersembunyi yang membisikkan (kejahatan) ke dalam dada manusia, dari (golongan) jin dan manusia.”"
        },
        {
          "label": "Tahlil & takbir",
          "arab": "لاَ اِلَهَ اِلاَّ اللهُ وَاللهُ اَكْبَرُ",
          "latin": "Lā ilāha illallāhu wallāhu akbar.",
          "arti": "Tiada tuhan selain Allah, dan Allah Maha Besar."
        }
      ],
      "note": "QS. An-Nas: 1–6, lalu tahlil dan takbir."
    },
    {
      "name": "Surah Al-Fatihah",
      "target": 1,
      "parts": [
        {
          "label": "Ta‘awudz",
          "arab": "اَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطٰنِ الرَّجِيْمِ",
          "latin": "A‘ūżu billāhi minasy-syaiṭānir-rajīm.",
          "arti": "Aku berlindung kepada Allah dari setan yang terkutuk."
        },
        {
          "arab": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ﴿١﴾ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ ﴿٢﴾ الرَّحْمٰنِ الرَّحِيْمِۙ ﴿٣﴾ مٰلِكِ يَوْمِ الدِّيْنِۗ ﴿٤﴾ اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ ﴿٥﴾ اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ ﴿٦﴾ صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ﴿٧﴾",
          "latin": "Bismillāhir-raḥmānir-raḥīm(i). Al-ḥamdu lillāhi rabbil-‘ālamīn(a). Ar-raḥmānir-raḥīm(i). Māliki yaumid-dīn(i). Iyyāka na‘budu wa iyyāka nasta‘īn(u), Ihdinaṣ-ṣirāṭal-mustaqīm(a). Ṣirāṭal-lażīna an‘amta ‘alaihim, gairil-magḍūbi ‘alaihim wa laḍ-ḍāllīn(a).",
          "arti": "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam Yang Maha Pengasih lagi Maha Penyayang, Pemilik hari Pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan. Bimbinglah kami ke jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat, bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) orang-orang yang sesat."
        }
      ],
      "note": "QS. Al-Fatihah: 1–7 · ditutup dengan “āmīn”."
    },
    {
      "name": "Awal Surah Al-Baqarah",
      "target": 1,
      "parts": [
        {
          "arab": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ",
          "latin": "Bismillāhir-raḥmānir-raḥīm(i).",
          "arti": "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang."
        },
        {
          "arab": "الۤمّۤ ۚ ﴿١﴾ ذٰلِكَ الْكِتٰبُ لَا رَيْبَ ۛ فِيْهِ ۛ هُدًى لِّلْمُتَّقِيْنَۙ ﴿٢﴾ الَّذِيْنَ يُؤْمِنُوْنَ بِالْغَيْبِ وَيُقِيْمُوْنَ الصَّلٰوةَ وَمِمَّا رَزَقْنٰهُمْ يُنْفِقُوْنَ ۙ ﴿٣﴾ وَالَّذِيْنَ يُؤْمِنُوْنَ بِمَآ اُنْزِلَ اِلَيْكَ وَمَآ اُنْزِلَ مِنْ قَبْلِكَ ۚ وَبِالْاٰخِرَةِ هُمْ يُوْقِنُوْنَۗ ﴿٤﴾ اُولٰۤىِٕكَ عَلٰى هُدًى مِّنْ رَّبِّهِمْ ۙ وَاُولٰۤىِٕكَ هُمُ الْمُفْلِحُوْنَ ﴿٥﴾",
          "latin": "Alif lām mīm. Żālikal-kitābu lā raiba fīh(i), hudal lil-muttaqīn(a). Al-lażīna yu'minūna bil-gaibi wa yuqīmūnaṣ-ṣalāta wa mimmā razaqnāhum yunfiqūn(a). Wal-lażīna yu'minūna bimā unzila ilaika wa mā unzila min qablik(a), wabil-ākhirati hum yūqinūn(a). Ulā'ika ‘alā hudam mir rabbihim wa ulā'ika humul-mufliḥūn(a).",
          "arti": "Alif Lām Mīm. Kitab (Al-Qur’an) ini tidak ada keraguan di dalamnya; (ia merupakan) petunjuk bagi orang-orang yang bertakwa, (yaitu) orang-orang yang beriman pada yang gaib, menegakkan salat, dan menginfakkan sebagian rezeki yang Kami anugerahkan kepada mereka, dan mereka yang beriman pada (Al-Qur’an) yang diturunkan kepadamu (Nabi Muhammad) dan (kitab-kitab suci) yang telah diturunkan sebelum engkau dan mereka yakin akan adanya akhirat. Merekalah yang mendapat petunjuk dari Tuhannya dan mereka itulah orang-orang yang beruntung."
        }
      ],
      "note": "QS. Al-Baqarah: 1–5"
    },
    {
      "name": "Al-Baqarah 163",
      "target": 1,
      "parts": [
        {
          "arab": "وَاِلٰهُكُمْ اِلٰهٌ وَّاحِدٌۚ لَآاِلٰهَ اِلَّا هُوَ الرَّحْمٰنُ الرَّحِيْمُ ﴿١٦٣﴾",
          "latin": "Wa ilāhukum ilāhuw wāḥid(un), lā ilāha illā huwar-raḥmānur-raḥīm(u).",
          "arti": "Tuhan kamu adalah Tuhan Yang Maha Esa. Tidak ada tuhan selain Dia Yang Maha Pengasih lagi Maha Penyayang."
        }
      ],
      "note": "QS. Al-Baqarah: 163"
    },
    {
      "name": "Ayat Kursi",
      "target": 1,
      "parts": [
        {
          "arab": "اَللّٰهُ لَآ اِلٰهَ اِلَّا هُوَۚ اَلْحَيُّ الْقَيُّوْمُ ەۚ لَا تَأْخُذُهٗ سِنَةٌ وَّلَا نَوْمٌۗ لَهٗ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِۗ مَنْ ذَا الَّذِيْ يَشْفَعُ عِنْدَهٗٓ اِلَّا بِاِذْنِهٖۗ يَعْلَمُ مَا بَيْنَ اَيْدِيْهِمْ وَمَا خَلْفَهُمْۚ وَلَا يُحِيْطُوْنَ بِشَيْءٍ مِّنْ عِلْمِهٖٓ اِلَّا بِمَا شَاۤءَۚ وَسِعَ كُرْسِيُّهُ السَّمٰوٰتِ وَالْاَرْضَۚ وَلَا يَـُٔوْدُهٗ حِفْظُهُمَاۚ وَهُوَ الْعَلِيُّ الْعَظِيْمُ ﴿٢٥٥﴾",
          "latin": "Allāhu lā ilāha illā huw(a), al-ḥayyul-qayyūm(u), lā ta'khużuhū sinatuw wa lā naum(un), lahū mā fis-samāwāti wa mā fil-arḍ(i), man żal-lażī yasyfa‘u ‘indahū illā bi'iżnih(ī), ya‘lamu mā baina aidīhim wa mā khalfahum, wa lā yuḥīṭūna bisyai'im min ‘ilmihī illā bimā syā'(a), wasi‘a kursiyyuhus-samāwāti wal-arḍ(a), wa lā ya'ūduhū ḥifẓuhumā, wa huwal-‘aliyyul-‘aẓīm(u).",
          "arti": "Allah, tidak ada tuhan selain Dia, Yang Maha Hidup lagi terus-menerus mengurus (makhluk-Nya). Dia tidak dilanda oleh kantuk dan tidak (pula) oleh tidur. Milik-Nyalah apa yang ada di langit dan apa yang ada di bumi. Tidak ada yang dapat memberi syafaat di sisi-Nya tanpa izin-Nya. Dia mengetahui apa yang ada di hadapan mereka dan apa yang ada di belakang mereka. Mereka tidak mengetahui sesuatu apa pun dari ilmu-Nya, kecuali apa yang Dia kehendaki. Kursi-Nya (ilmu dan kekuasaan-Nya) meliputi langit dan bumi. Dia tidak merasa berat memelihara keduanya. Dialah yang Maha Tinggi lagi Maha Agung."
        }
      ],
      "note": "QS. Al-Baqarah: 255"
    },
    {
      "name": "Al-Baqarah 284–286",
      "target": 1,
      "parts": [
        {
          "arab": "لِلّٰهِ مَا فِى السَّمٰوٰتِ وَمَا فِى الْاَرْضِ ۗ وَاِنْ تُبْدُوْا مَا فِيْٓ اَنْفُسِكُمْ اَوْ تُخْفُوْهُ يُحَاسِبْكُمْ بِهِ اللّٰهُ ۗ فَيَغْفِرُ لِمَنْ يَّشَاۤءُ وَيُعَذِّبُ مَنْ يَّشَاۤءُ ۗ وَاللّٰهُ عَلٰى كُلِّ شَيْءٍ قَدِيْرٌ ﴿٢٨٤﴾ اٰمَنَ الرَّسُوْلُ بِمَآ اُنْزِلَ اِلَيْهِ مِنْ رَّبِّهٖ وَالْمُؤْمِنُوْنَۗ كُلٌّ اٰمَنَ بِاللّٰهِ وَمَلٰۤىِٕكَتِهٖ وَكُتُبِهٖ وَرُسُلِهٖۗ لَا نُفَرِّقُ بَيْنَ اَحَدٍ مِّنْ رُّسُلِهٖ ۗ وَقَالُوْا سَمِعْنَا وَاَطَعْنَا غُفْرَانَكَ رَبَّنَا وَاِلَيْكَ الْمَصِيْرُ ﴿٢٨٥﴾ لَا يُكَلِّفُ اللّٰهُ نَفْسًا اِلَّا وُسْعَهَا ۗ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ اِنْ نَّسِيْنَآ اَوْ اَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ اِصْرًا كَمَا حَمَلْتَهٗ عَلَى الَّذِيْنَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهٖۚ وَاعْفُ عَنَّاۗ وَاغْفِرْ لَنَاۗ وَارْحَمْنَا ۗ اَنْتَ مَوْلٰىنَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكٰفِرِيْنَ ﴿٢٨٦﴾",
          "latin": "Lillāhi mā fis-samāwāti wa mā fil-arḍ(i), wa in tubdū mā fī anfusikum au tukhfūhu yuḥāsibkum bihillāh(u), fayagfiru limay yasyā'u wa yu‘ażżibu may yasyā'(u), wallāhu ‘alā kulli syai'in qadīr(un). Āmanar-rasūlu bimā unzila ilaihi mir rabbihī wal-mu'minūn(a), kullun āmana billāhi wa malā'ikatihī wa kutubihī wa rusulih(ī), lā nufarriqu baina aḥadim mir rusulih(ī), wa qālū sami‘nā wa aṭa‘nā, gufrānaka rabbanā wa ilaikal-maṣīr(u). Lā yukallifullāhu nafsan illā wus‘ahā, lahā mā kasabat wa ‘alaihā maktasabat, rabbanā lā tu'ākhiżnā in nasīnā au akhṭa'nā, rabbanā wa lā taḥmil ‘alainā iṣran kamā ḥamaltahū ‘alal-lażīna min qablinā, rabbanā wa lā tuḥammilnā mā lā ṭāqata lanā bih(ī), wa‘fu ‘annā, wagfir lanā, warḥamnā, anta maulānā fanṣurnā ‘alal qaumil-kāfirīn(a).",
          "arti": "Milik Allahlah apa yang ada di langit dan apa yang ada di bumi. Jika kamu menyatakan apa yang ada di dalam hatimu atau kamu menyembunyikannya, niscaya Allah memperhitungkannya bagimu. Dia mengampuni siapa saja yang Dia kehendaki dan mengazab siapa pun yang Dia kehendaki. Allah Maha Kuasa atas segala sesuatu. Rasul (Muhammad) beriman pada apa (Al-Qur’an) yang diturunkan kepadanya dari Tuhannya, demikian pula orang-orang mukmin. Masing-masing beriman kepada Allah, malaikat-malaikat-Nya, kitab kitab-Nya, dan rasul-rasul-Nya. (Mereka berkata,) “Kami tidak membeda-bedakan seorang pun dari rasul-rasul-Nya.” Mereka juga berkata, “Kami dengar dan kami taat. Ampunilah kami, wahai Tuhan kami. Hanya kepada-Mu tempat (kami) kembali.” Allah tidak membebani seseorang, kecuali menurut kesanggupannya. Baginya ada sesuatu (pahala) dari (kebajikan) yang diusahakannya dan terhadapnya ada (pula) sesuatu (siksa) atas (kejahatan) yang diperbuatnya. (Mereka berdoa,) “Wahai Tuhan kami, janganlah Engkau hukum kami jika kami lupa atau kami salah. Wahai Tuhan kami, janganlah Engkau bebani kami dengan beban yang berat sebagaimana Engkau bebankan kepada orang-orang sebelum kami. Wahai Tuhan kami, janganlah Engkau pikulkan kepada kami apa yang tidak sanggup kami memikulnya. Maafkanlah kami, ampunilah kami, dan rahmatilah kami. Engkaulah pelindung kami. Maka, tolonglah kami dalam menghadapi kaum kafir.”"
        }
      ],
      "note": "QS. Al-Baqarah: 284–286"
    },
    {
      "name": "Irḥamnā yā arḥamar-rāḥimīn",
      "target": 3,
      "parts": [
        {
          "arab": "اِرْحَمْنَا يَا اَرْحَمَ الرَّاحِمِيْنَ",
          "latin": "Irḥamnā yā arḥamar-rāḥimīn.",
          "arti": "Kasihanilah kami, wahai Dzat Yang Maha Pengasih di antara para pengasih."
        }
      ],
      "note": "Dibaca 3 kali, sebelum Hud 73."
    },
    {
      "name": "Surah Hud 73",
      "target": 1,
      "parts": [
        {
          "arab": "رَحْمَتُ اللّٰهِ وَبَرَكٰتُهٗ عَلَيْكُمْ اَهْلَ الْبَيْتِۗ اِنَّهٗ حَمِيْدٌ مَّجِيْدٌ",
          "latin": "Raḥmatullāhi wa barakātuh(ū), ‘alaikum ahlal-bait(i), innahū ḥamīdum majīd(un).",
          "arti": "(Itu adalah) rahmat dan berkah Allah (yang) dicurahkan kepada kamu, wahai ahlulbait! Sesungguhnya Dia Maha Terpuji lagi Maha Mulia."
        }
      ],
      "note": "QS. Hud: 73 (bagian akhir ayat)."
    },
    {
      "name": "Surah Al-Ahzab 33",
      "target": 1,
      "parts": [
        {
          "arab": "اِنَّمَا يُرِيْدُ اللّٰهُ لِيُذْهِبَ عَنْكُمُ الرِّجْسَ اَهْلَ الْبَيْتِ وَيُطَهِّرَكُمْ تَطْهِيْرًاۚ",
          "latin": "Innamā yurīdullāhu liyużhiba ‘ankumur-rijsa ahlal-baiti wa yuṭahhirakum taṭhīrā(n).",
          "arti": "Sesungguhnya Allah hanya hendak menghilangkan dosa darimu, wahai ahlulbait dan membersihkan kamu sebersih-bersihnya."
        }
      ],
      "note": "QS. Al-Ahzab: 33 (bagian akhir ayat)."
    },
    {
      "name": "Surah Al-Ahzab 56",
      "target": 1,
      "parts": [
        {
          "arab": "اِنَّ اللّٰهَ وَمَلٰۤىِٕكَتَهٗ يُصَلُّوْنَ عَلَى النَّبِيِّۗ يٰٓاَيُّهَا الَّذِيْنَ اٰمَنُوْا صَلُّوْا عَلَيْهِ وَسَلِّمُوْا تَسْلِيْمًا ﴿٥٦﴾",
          "latin": "Innallāha wa malā'ikatahū yuṣallūna ‘alan-nabiyy(i), yā ayyuhal-lażīna āmanū ṣallū ‘alaihi wa sallimū taslīmā(n).",
          "arti": "Sesungguhnya Allah dan para malaikat-Nya berselawat untuk Nabi. Wahai orang-orang yang beriman, berselawatlah kamu untuk Nabi dan ucapkanlah salam dengan penuh penghormatan kepadanya."
        }
      ],
      "note": "QS. Al-Ahzab: 56"
    },
    {
      "name": "Shalawat Nabi",
      "target": 3,
      "parts": [
        {
          "arab": "اَللّٰهُمَّ صَلِّ أَفْضَلَ صَلَاةٍ عَلَى أَسْعَدِ مَخْلُوْقَاتِكَ سَيِّدِنَا مُحَمَّدٍ وَعَلَى اَلِهِ وَصَحْبِهِ وَسَلِّمْ، عَدَدَ مَعْلُوْمَاتِكَ وَمِدَادَ كَلِمَاتِكَ كُلَّمَا ذَكَرَكَ الذَّاكِرُوْنَ وَغَفَلَ عَنْ ذِكْرِكَ الْغَافِلُوْنَ",
          "latin": "Allāhumma ṣalli afḍala ṣalātin ‘alā as‘adi makhlūqātika sayyidinā Muḥammadin wa ‘alā ālihī wa ṣaḥbihī wa sallim, ‘adada ma‘lūmātika wa midāda kalimātika kullamā żakarakaż-żākirūna wa gafala ‘an żikrikal-gāfilūn.",
          "arti": "Ya Allah, tambahkanlah rahmat dan kesejahteraan untuk pemimpin dan tuan kami Nabi Muhammad SAW, serta keluarganya, sebanyak pengetahuan-Mu dan sebanyak tinta kalimat-kalimat-Mu pada saat zikir orang-orang yang ingat dan pada saat lengah orang-orang yang lalai berzikir kepada-Mu."
        }
      ],
      "note": "Dibaca 3 kali."
    },
    {
      "name": "Salam Nabi",
      "target": 1,
      "parts": [
        {
          "arab": "وَسَلِّمْ وَرَضِيَ اللهُ تَعَالَى عَنْ اَصْحَابِ سَيِّدِنَا رَسُوْلِ اللهِ اَجْمَعِيْنَ",
          "latin": "Wa sallim wa raḍiyallāhu ta‘ālā ‘an aṣḥābi sayyidinā rasūlillāhi ajma‘īn.",
          "arti": "Semoga Allah yang maha suci dan tinggi meridhai para sahabat dari pemimpin kami (Rasulullah)."
        }
      ]
    },
    {
      "name": "Ḥasbunallāh",
      "target": 1,
      "parts": [
        {
          "arab": "حَسْبُنَا اللّٰهُ وَنِعْمَ الْوَكِيْلُ نِعْمَ الْمَوْلٰى وَنِعْمَ النَّصِيْرُ",
          "latin": "Ḥasbunallāhu wa ni‘mal-wakīl(u). Ni‘mal-maulā wa ni‘man-naṣīr(u).",
          "arti": "Cukuplah Allah (menjadi penolong) bagi kami dan Dia sebaik-baik pelindung. Dia adalah sebaik-baik pelindung dan sebaik-baik penolong."
        }
      ],
      "note": "QS. Ali ‘Imran: 173 & QS. Al-Anfal: 40 (bagian akhir ayat)."
    },
    {
      "name": "Hauqalah",
      "target": 1,
      "parts": [
        {
          "arab": "وَلَا حَوْلَ وَلَا قُوَّةَ اِلَّا بِاللهِ العَلِيِّ الْعَظِيْمِ",
          "latin": "Wa lā ḥaula wa lā quwwata illā billāhil-‘aliyyil-‘aẓīm.",
          "arti": "Tidak ada daya dan kekuatan kecuali dengan pertolongan Allah yang maha tinggi dan agung."
        }
      ]
    },
    {
      "name": "Istighfar",
      "target": 3,
      "parts": [
        {
          "arab": "اَسْتَغْفِرُ اللهَ الْعَظِيْمَ",
          "latin": "Astagfirullāhal-‘aẓīm.",
          "arti": "Aku mohon ampun kepada Allah Yang Maha Agung."
        },
        {
          "label": "Setelah bacaan ketiga",
          "arab": "الَّذِيْ لَا اِلَهَ اِلَّا هُوَ الحَيُّ القَيُّوْمُ وَأَتُوْبُ إِلَيْهِ",
          "latin": "Allażī lā ilāha illā huwal-ḥayyul-qayyūmu wa atūbu ilaih.",
          "arti": "(Allah) yang tiada tuhan selain Dia, Yang Maha Hidup lagi terus-menerus mengurus (makhluk-Nya). Aku bertobat kepada-Nya."
        }
      ],
      "note": "Dibaca 3 kali."
    },
    {
      "name": "Keutamaan tahlil",
      "target": 1,
      "parts": [
        {
          "arab": "اَفْضَلُ الذِّكْرِ فَاعْلَمْ اَنَّهُ لَا اِلَهَ اِلَّا اللهُ، حَيٌّ مَوْجُوْدٌ",
          "latin": "Afḍaluż-żikri fa‘lam annahū lā ilāha illallāh, ḥayyun maujūd.",
          "arti": "Sebaik-baik zikir–ketahuilah–adalah lafal ‘La ilāha illallāh’, tiada tuhan selain Allah, zat yang hidup dan ujud."
        },
        {
          "arab": "لَا اِلَهَ اِلَّا اللهُ، حَيٌّ مَعْبُوْدٌ",
          "latin": "Lā ilāha illallāh, ḥayyun ma‘būd.",
          "arti": "Tiada tuhan selain Allah, zat yang hidup dan disembah."
        },
        {
          "arab": "لَا اِلَهَ اِلَّا اللهُ، حَىٌّ بَاقٍ الَّذِيْ لَا يَمُوْتُ",
          "latin": "Lā ilāha illallāh, ḥayyun bāqil-lażī lā yamūt.",
          "arti": "Tiada tuhan selain Allah, zat kekal yang takkan mati."
        }
      ]
    },
    {
      "name": "Tahlil",
      "target": jumlahTahlil,
      "parts": [
        {
          "arab": "لَا اِلَهَ اِلَّا اللهُ",
          "latin": "Lā ilāha illallāh.",
          "arti": "Tiada tuhan selain Allah."
        }
      ],
      "note": "Menurut Majmu‘ Syarif dibaca 160 kali; jumlah bisa diatur di bawah.",
      "key": "tahlil"
    },
    {
      "name": "Dua kalimat syahadat",
      "target": 1,
      "parts": [
        {
          "arab": "لَا اِلَهَ اِلَّا اللهُ مُحَمَّدٌ رَّسُوْلُ اللهِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ",
          "latin": "Lā ilāha illallāhu Muḥammadur-rasūlullāhi ṣallallāhu ‘alaihi wa sallam.",
          "arti": "Tiada tuhan selain Allah. Nabi Muhammad SAW utusan-Nya."
        },
        {
          "arab": "عَلَيْهَا نَحْيَا وَعَلَيْهَا نَمُوْتُ وَعَلَيْهَا نُبْعَثُ إِنْ شَاءَ اللهُ تَعَالَى مِنَ الآمِنِيْنَ",
          "latin": "‘Alaihā naḥyā wa ‘alaihā namūtu wa ‘alaihā nub‘aṡu in syā’allāhu ta‘ālā minal-āminīn.",
          "arti": "Dengan kalimat itu, kami hidup. Dengannya, kami wafat. Dengannya pula insya Allah kelak kami dibangkitkan termasuk orang yang aman."
        }
      ]
    },
    {
      "name": "Doa Tahlil",
      "target": 1,
      "parts": [
        {
          "label": "Pujian kepada Allah",
          "arab": "اَعُوْذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيْمِ. بِسْمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ. الْحَمْدُ لِلهِ رَبِّ الْعَالَمِيْنَ، حَمْدَ الشَّاكِرِيْنَ، حَمْدَ النَّاعِمِيْنَ، حَمْدًا يُّوَافِى نِعَمَهُ وَيُكَافِىءُ مَزِيْدَهُ، يَا رَبَّنَا لَكَ الْحَمْدُ كَمَا يَنْبَغِيْ لِجَلَالِ وَجْهِكَ وَعَظِيْمِ سُلْطَانِكَ، سُبْحَانَكَ لَا نُحْصِى ثَنَاءً عَلَيْكَ أَنْتَ كَمَا أَثْنَيْتَ عَلَى نَفْسِكَ، فَلَكَ الحَمْدُ قَبْلَ الرِّضَى وَلَكَ الحَمْدُ بَعْدَ الرِّضَى وَلَكَ الحَمْدُ إِذَا رَضِيْتَ عَنَّا دَائِمًا أَبَدًا",
          "latin": "A‘ūżu billāhi minasy-syaiṭānir-rajīm. Bismillāhir-raḥmānir-raḥīm. Al-ḥamdu lillāhi rabbil-‘ālamīn, ḥamdasy-syākirīn, ḥamdan-nā‘imīn, ḥamday yuwāfī ni‘amahū wa yukāfi’u mazīdah, yā rabbanā lakal-ḥamdu kamā yambagī lijalāli wajhika wa ‘aẓīmi sulṭānik, subḥānaka lā nuḥṣī ṡanā’an ‘alaika anta kamā aṡnaita ‘alā nafsik, fa lakal-ḥamdu qablar-riḍā wa lakal-ḥamdu ba‘dar-riḍā wa lakal-ḥamdu iżā raḍīta ‘annā dā’iman abadā.",
          "arti": "Aku berlindung kepada Allah dari setan yang dilontar. Dengan nama Allah yang maha pengasih, lagi maha penyayang. Segala puji bagi Allah, Tuhan seru sekalian alam sebagai pujian orang yang bersyukur, pujian orang yang memperoleh nikmat sama memuji, pujian yang memadai nikmat-Nya, dan pujian yang memungkinkan tambahannya. Tuhan kami, hanya bagi-Mu segala puji sebagaimana pujian yang layak bagi kemuliaan dan keagungan kekuasaan-Mu. Maha suci Engkau, kami tidak (dapat) menghitung pujian atas diri-Mu sebagaimana Kaupuji diri sendiri. Hanya bagi-Mu pujian sebelum ridha. Hanya bagi-Mu pujian setelah ridha. Hanya bagi-Mu pujian ketika Kau meridhai kami selamanya."
        },
        {
          "label": "Shalawat Dzātil Mukammalah",
          "arab": "اللَّهُمَّ صَلِّ عَلَى الذَّاتِ المُكَمَّلَةِ وَالرَّحْمَةِ المُنَزَّلَةِ سَيِّدِنَا مُحَمَّدٍ وَعَلَى اَلِهِ وَصَحْبِهِ وَسَلِّمْ",
          "latin": "Allāhumma ṣalli ‘alaż-żātil-mukammalah, war-raḥmatil-munazzalah, sayyidinā Muḥammadin wa ‘alā ālihī wa ṣaḥbihī wa sallim.",
          "arti": "Ya Allah, limpahkan shalawat dan salam untuk zat yang disempurnakan dan rahmat yang diturunkan, yaitu Nabi Muhammad SAW, keluarga, dan sahabatnya."
        },
        {
          "arab": "وَصَلِّ اللَّهُمَّ عَلَيْهِ يَا ذَا البَهَاءِ وَالجَلَالِ بُكْرَةً وَأَصِيْلًا",
          "latin": "Wa ṣallillāhumma ‘alaihi yā żal-bahā’i wal-jalāli bukrataw wa aṣīlā.",
          "arti": "Ya Allah, wahai zat yang indah dan agung, limpahkanlah shalawat kepada Nabi Muhammad SAW pada pagi dan sore hari."
        },
        {
          "label": "Kebaikan lahir dan batin",
          "arab": "اللَّهُمَّ كَمَا خَصَّصْتَنَا بِكِتَابِكَ الكَرِيْمِ وَهَدَيْتَنَا إِلَى صِرَاطِكَ المُسْتَقِيْمِ، وَأَصْلِحْ بِهِ مِنَّا جَمِيْعَ مَا فَسَدَ، وَطَهِّرْ بِهِ مِنَّا مَا ظَهَرَ وَمَا بَطَنَ",
          "latin": "Allāhumma kamā khaṣṣaṣtanā bikitābikal-karīm, wa hadaitanā ilā ṣirāṭikal-mustaqīm, wa aṣliḥ bihī minnā jamī‘a mā fasad, wa ṭahhir bihī minnā mā ẓahara wa mā baṭan.",
          "arti": "Ya Allah, sebagaimana Kaumuliakan kami dengan Kitab suci-Mu yang mulia dan Kautunjuki kami ke jalan yang lurus, maka berikanlah kemaslahatan untuk kami sebagai pengganti mafsadat dan sucikan kami dari kotoran yang tampak dan tersembunyi."
        },
        {
          "label": "Keberkahan Al-Qur’an",
          "arab": "اللَّهُمَّ اشْرَحْ بِالقُرْآنِ صُدُوْرَنَا وَيَسِّرْ بِهِ أُمُوْرَنَا وَعَظِّمْ بِهِ أُجُوْرَنَا وَحَسِّنْ بِهِ أَخْلَاقَنَا وَوَسِّعْ بِهِ أَرْزَاقَنَا وَنَوِّرْ بِهِ قُبُوْرَنَا",
          "latin": "Allāhummasyraḥ bil-qur’āni ṣudūranā, wa yassir bihī umūranā, wa ‘aẓẓim bihī ujūranā, wa ḥassin bihī akhlāqanā, wa wassi‘ bihī arzāqanā, wa nawwir bihī qubūranā.",
          "arti": "Ya Allah, dengan Al-Qur’an lapangkanlah hati kami, mudahkan urusan kami, lipatgandakanlah pahala kami, perbaiki akhlak kami, luaskan rezeki kami, dan terangilah kubur kami."
        },
        {
          "label": "Hadiah pahala untuk Nabi, sahabat, dan wali",
          "arab": "اللَّهُمَّ اجْعَلْ ثَوَابَ مَا قَرَأْنَاهُ وَبَرَكَةَ مَا تَلَوْنَاهُ وَصَلَّيْنَاهُ عَلَى نَبِيِّكَ مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَمَا هَلَّلْنَا هَدِيَّةً بَالِغَةً وَرَحْمَةً مِنْكَ نَازِلَةً نُقَدِّمُهَا وَنُهْدِيْهَا اِلَى حَضَرَاتِ النَّبِيِّ الأَكْرَمِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، ثُمَّ اِلَى أَرْوَاحِ آبَائِهِ وَإِخْوَانِهِ مِنَ النَّبِيِّيْنَ وَالمُرْسَلِيْنَ وَإِلَى مَلَائِكَةِ اللهِ الْمُقَرَّبِيْنَ وَالكَرُّوْبِيِّيْنَ، وَاِلَى أَرْوَاحِ سَادَاتِنَا أَبِي بَكْرٍ وَعُمَرَ وَعُثْمَانَ وَعَلِيٍّ، وَإِلَى البَقِيَّةِ العَشْرَةِ المُبَشَّرَةِ بِالجَنَّةِ وَسَائِرِ الصَّحَابَةِ وَالقَرَابَةِ وَالتَّابِعِيْنَ وَإِلَى أَرْوَاحِ الحَسَنِ وَالحُسَيْنِ وَأُمِّهِمَا سَيِّدَتِنَا فَاطِمَةَ الزَّهْرَاءِ وَسَيِّدَتِنَا خَدِيْجَةَ الكُبْرَى وَسَيِّدِنَا حَمْزَةَ وَالعَبَّاسِ وَالشُّهَدَاءِ البَدْرِيِّيْنَ وَالأُحُدِيِّيْنَ وَإِلَى أَرْوَاحِ الخِضْرِ وَإِلْيَاسَ وَسَيِّدِنَا عَبْدِ اللهِ ابْنِ عَبَّاسٍ وَإِلَى أَرْوَاحِ الأَرْبَعَةِ الأَئِمَّةِ المُجْتَهِدِيْنَ وَمُقَلِّدِيْهِمْ فِي الدِّيْنِ وَإِلَى أَرْوَاحِ العُلَمَاءِ العَامِلِيْنَ وَالقُرَّاءِ وَأَئِمَّةِ الحَدِيْثِ وَالمُفَسِّرِيْنَ وَسَادَاتِنَا الصُّوْفِيَّةِ المُحَقِّقِيْنَ وَإِلَى رُوْحِ القُطْبِ الرَّبَّانِيِّ وَالعَارِفِ الصَّمَدَانِيِّ سَيِّدِيْ عَبْدِ القَادِرِ الجَيْلَانِيّ وَسَيِّدِيْ أَحْمَدَ البَدَوِيِّ وَسَيِّدِيْ أَحْمَدَ الرِّفَاعِيِّ وَسَيِّدِيْ إِبْرَاهِيْمَ الدَّسُوْقِيِّ وَسَيِّدِيْ أَبِي القَاسِمِ الجُنَيْدِ البَغْدَادِيِّ وَسَيِّدِيْ أَحْمَدَ ابْنِ عَلْوَانَ وَسَيِّدِيْ أَبِي طَالِبٍ المَكِّيِّ وَإِلَى أَرْوَاحِ كُلِّ وَلِيٍّ وَوَلِيَّةٍ لِلهِ مِنْ مَشَارِقِ الأَرْضِ وَمَغَارِبِهَا بَرِّهَا وَبَحْرِهَا أَيْنَمَا كَانُوْا وَكَانَ الكَائِنُ فِي عِلْمِكَ وَحَلَّتْ أَرْوَاحُهُمْ يَا رَبَّ العَالَمِيْنَ",
          "latin": "Allāhummaj‘al ṡawāba mā qara’nāhu wa barakata mā talaunāhu wa ṣallaināhu ‘alā nabiyyika Muḥammadin ṣallallāhu ‘alaihi wa sallama wa mā hallalnā hadiyyatan bāligah, wa raḥmatan minka nāzilah, nuqaddimuhā wa nuhdīhā ilā ḥaḍaratin-nabiyyil-akrami ṣallallāhu ‘alaihi wa sallam, ṡumma ilā arwāḥi ābā’ihī wa ikhwānihī minan-nabiyyīna wal-mursalīn, wa ilā malā’ikatillāhil-muqarrabīna wal-karrūbiyyīn, wa ilā arwāḥi sādātinā Abī Bakrin wa ‘Umara wa ‘Uṡmāna wa ‘Aliyy, wa ilal-baqiyyatil-‘asyaratil-mubasysyarati bil-jannah, wa sā’iriṣ-ṣaḥābati wal-qarābati wat-tābi‘īn, wa ilā arwāḥil-Ḥasani wal-Ḥusaini wa ummihimā sayyidatinā Fāṭimataz-Zahrā’, wa sayyidatinā Khadījatal-Kubrā, wa sayyidinā Ḥamzata wal-‘Abbās, wasy-syuhadā’il-badriyyīna wal-uḥudiyyīn, wa ilā arwāḥil-Khiḍri wa Ilyās, wa sayyidinā ‘Abdillāhibni ‘Abbās, wa ilā arwāḥil-arba‘atil-a’immatil-mujtahidīna wa muqallidīhim fid-dīn, wa ilā arwāḥil-‘ulamā’il-‘āmilīna wal-qurrā’i wa a’immatil-ḥadīṡi wal-mufassirīn, wa sādātinaṣ-ṣūfiyyatil-muḥaqqiqīn, wa ilā rūḥil-quṭbir-rabbāniyyi wal-‘ārifiṣ-ṣamadāniyyi sayyidī ‘Abdil-Qādiril-Jailāniyy, wa sayyidī Aḥmadal-Badawiyy, wa sayyidī Aḥmadar-Rifā‘iyy, wa sayyidī Ibrāhīmad-Dasūqiyy, wa sayyidī Abil-Qāsimil-Junaidil-Bagdādiyy, wa sayyidī Aḥmadabni ‘Alwān, wa sayyidī Abī Ṭālibil-Makkiyy, wa ilā arwāḥi kulli waliyyiw wa waliyyatil lillāhi min masyāriqil-arḍi wa magāribihā, barrihā wa baḥrihā, ainamā kānū wa kānal-kā’inu fī ‘ilmika wa ḥallat arwāḥuhum, yā rabbal-‘ālamīn.",
          "arti": "Ya Allah, jadikanlah pahala dan keberkahan bacaan kami, shalawat kami, dan tahlil kami sebagai hadiah yang sampai dan rahmat-Mu yang turun, yang kami persembahkan dan hadiahkan untuk Nabi Muhammad SAW termulia, arwah bapak moyangnya, saudaranya dari kalangan para nabi dan rasul, malaikat muqarrabin dan karubiyyin, pemimpin kami Abu Bakar RA, Umar RA, Ustman RA, Ali RA, sepuluh sahabat yang dijanjikan masuk surge, seluruh sahabat, kerabat, tabi‘in, arwah Hasan, Husein, Ibu keduanya yaitu Sayyidah Fathimah Az-Zahra, Sayyidah Khadijah Al-Kubra, Sayyidina Hamzah, Abbas RA, syuhada Badar dan Uhud, arwah Khidhir, Ilyas, Sayyidina Abdullah bin Abbas RA, arwah empat imam mujtahid dan pengikut mereka perihal agama, arwah ulama, ahli qira‘ah, imam hadits, mufasir, pemuka sufi ahli hakikat, roh quthub rabbani dan arif as-shamadani Syekh Abdul Qadir Al-Jailani, Sayyid Ahmad Badawi, Sayyid Ahmad Ar-Rifa‘i, Sayyid Ibrahim Ad-Dasuqi, Sayyid Abul Qasim Al-Junaid Al-Baghdadi, Sayyid Ahmad bin Alwan, Sayyid Abu Thalib Al-Makki, seluruh wali Allah baik laki-laki dan perempuan dari Timur ke Barat baik di daratan maupun di lautan; di mana saja mereka dan roh mereka berada. Sementara semua yang ada berada dalam pengetahuan-Mu, waha Tuhan sekalian alam."
        },
        {
          "label": "Ahli kubur Mu‘alla, Syubaikah, Baqi‘, dan yang tak diziarahi",
          "arab": "وَإِلَى أَرْوَاحِ سَادَاتِنَا أَهْلِ المُعَلَّا وَالشُّبَيْكَةِ وَالبَقِيْعِ وَأَمْوَاتِ المُسْلِمِيْنَ كَافَّةً عَامَّةً وَفِي صَحَائِفِ مَنْ لَا زَائِرَ لَهُ وَلَا ذَاكِرَ لَهُ عُمَّ الجَمِيْعَ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِيْنَ",
          "latin": "Wa ilā arwāḥi sādātinā ahlil-Mu‘allā wasy-Syubaikati wal-Baqī‘, wa amwātil-muslimīna kāffatan ‘āmmah, wa fī ṣaḥā’ifi mal lā zā’ira lahū wa lā żākira lah, ‘ummil-jamī‘a biraḥmatika yā arḥamar-rāḥimīn.",
          "arti": "Dan kepada arwah pemimpin kami, yaitu ahli kubur Mualla, Syubaikah, Baqi‘, semua arwah umat Islam, dan pada lembaran ahli kubur yang tidak diziarahi dan tidak diingat, ratakanlah semuanya dengan rahmat-Mu, wahai zat yang maha penyayang."
        },
        {
          "label": "Rahmat berkah Al-Qur’an",
          "arab": "اللَّهُمَّ ارْحَمْهُ بِالقُرْآنِ العَظِيْمِ رَحْمَةً وَاسِعَةً، وَاغْفِرْ لَهُ مَغْفِرَةً جَامِعَةً يَا مَالِكَ الدُّنْيَا وَالآخِرَةِ يَا رَبَّ العَالَمِيْنَ",
          "latin": "Allāhummarḥamhu bil-qur’ānil-‘aẓīmi raḥmatan wāsi‘ah, wagfir lahū magfiratan jāmi‘ah, yā mālikad-dunyā wal-ākhirah, yā rabbal-‘ālamīn.",
          "arti": "Ya Allah, turunkanlah rahmat yang luas kepadanya (arwah ahli kubur) dengan berkat Al-Qur’an yang agung, ampunilah ia dengan ampunan yang luas, wahai Penguasa dunia dan akhirat, Tuhan sekalian alam."
        },
        {
          "label": "Ketenteraman ahli kubur",
          "arab": "اللَّهُمَّ أَنْزِلْ فِيْ قَبْرِهِ الرَّحْمَةَ وَالضِّيَاءَ وَالنُّوْرَ، وَالبَهْجَةَ وَالرَوْحَ وَالرَيْحَانَ وَالسُّرُوْرَ، مِنْ يَوْمِنَا هَذَا إِلَى يَوْمِ البَعْثِ وَالنُّشُوْرِ، إِنَّكَ مَلِكٌ رَبٌّ غَفُوْرٌ",
          "latin": "Allāhumma anzil fī qabrihir-raḥmata waḍ-ḍiyā’a wan-nūr, wal-bahjata war-rauḥa war-raiḥāna was-surūr, min yauminā hāżā ilā yaumil-ba‘ṡi wan-nusyūr, innaka malikun rabbun gafūr.",
          "arti": "Ya Allah, turunkanlah di kuburnya (almarhum fulan) rahmat, sinar, cahaya, kegembiraan, kesenangan, keharuman, dan kebahagiaan sejak hari ini hingga hari kebangunan dan kebangkitan. Sungguh, Kau penguasa, tuhan yang maha pengampun."
        },
        {
          "label": "Syafaat Al-Qur’an",
          "arab": "اللَّهُمَّ اجْعَلِ القُرْآنَ العَظِيْمَ فِي قَبْرِهِ مُؤْنِسًا، وَفِي القِيَامَةِ شَافِعًا، وَفِي الحَشْرِ ضِيَاءً وَظِلًّا وَدَلِيْلًا، وَفِي المِيْزَانِ رَاجِحًا، وَعَلَى الصِّرَاطِ نُوْرًا وَقَائِدًا، وَعَنِ النَّارِ سِتْرًا وَحِجَابًا، وَفِي الجَنَّةِ رَفِيْقًا.",
          "latin": "Allāhummaj‘alil-qur’ānal-‘aẓīma fī qabrihī mu’nisā, wa fil-qiyāmati syāfi‘ā, wa fil-ḥasyri ḍiyā’aw wa ẓillaw wa dalīlā, wa fil-mīzāni rājiḥā, wa ‘alaṣ-ṣirāṭi nūraw wa qā’idā, wa ‘anin-nāri sitraw wa ḥijābā, wa fil-jannati rafīqā.",
          "arti": "Ya Allah, jadikanlah Al-Qur’an di kuburnya sebagai teman, di Hari Kiamat sebagai pemberi syafaat, di tempat berkumpul (mahsyar) kelak sebagai sinar, naungan, dan petunjuk, di mizan sebagai pemberat timbangan amal baik, di sirath sebagai cahaya dan penuntun, dari api neraka sebagai tabir dan hijab, dan di surga sebagai kawan."
        },
        {
          "label": "Pengantar penghuni baru kubur",
          "arab": "اللَّهُمَّ عَبْدُكَ وَابْنَ عَبْدَيْكَ خَرَجَ مِنْ رَّوْحِ الدُّنْيَا وَسَعَتِهَا وَمَحْبُوْبِهِ وَاَحِبَّائِهِ فِيْهَا اِلَى ظُلْمَةِ الْقَبْرِ وَمَا هُوَ لَاقِيْهِ كَانَ يَشْهَدُ اَنْ لَا اِلَهَ اِلَّا اَنْتَ وَاَنَّ مُحَمَّدًا عَبْدُكَ وَرَسُوْلُكَ وَاَنْتَ اَعْلَمُ بِهِ",
          "latin": "Allāhumma ‘abduka wabna ‘abdaika kharaja mir rauḥid-dunyā wa sa‘atihā wa maḥbūbihī wa aḥibbā’ihī fīhā ilā ẓulmatil-qabri wa mā huwa lāqīh, kāna yasyhadu al lā ilāha illā anta wa anna Muḥammadan ‘abduka wa rasūluk, wa anta a‘lamu bih.",
          "arti": "Ya Allah, ini hamba-Mu dan anak dari kedua hamba-Mu. Ia keluar dari kebahagiaan dan keluasan dunia, orang yang dicintai, dan para kekasihnya di dunia menuju kegelapan kubur dan apa yang akan ia jumpai di dalamnya. Ia dulu pernah bersaksi bahwa tiada tuhan selain Engkau dan Nabi Muhammad SAW adalah hamba dan utusan-Mu. Kau pun lebih tahu akan hal ini."
        },
        {
          "label": "Kelapangan kubur",
          "arab": "اللَّهُمَّ اِنَّهُ نَزَلَ بِكَ وَاَنْتَ خَيْرُ مَنْزُوْلٍ بِهِ وَاَصْبَحَ فَقِيْرًا اِلَى رَحْمَتِكَ، وَاَنْتَ غَنِيٌّ عَنْ عَذَابِهِ وَقَدْ جِئْنَاكَ رَاغِبِيْنَ اِلَيْكَ شُفَعَاءَ لَهُ، اللّٰهُمَّ اِنْ كَانَ مُحْسِنًا فَزِدْ فِيْ اِحْسَانِهِ وَاِنْ كَانَ مُسِيْئًا فَتَجَاوَزْ عَنْهُ وَلَقِّهِ بِرَحْمَتِكَ رِضَاكَ وَقِهِ فِتْنَةَ الْقَبْرِ وَعَذَابَهُ وَافْسَحْ لَهُ فِيْ قَبْرِهِ وَجَافِ الْاَرْضَ عَنْ جَنْبَيْهِ وَلَقِّهِ بِرَحْمَتِكَ الْاَمْنَ مِنْ عَذَابِكَ حَتَّى تَبْعَثَهُ آمِنًا اِلَى جَنَّتِكَ بِرَحْمَتِكَ يَا اَرْحَمَ الرَّاحِمِيْنَ",
          "latin": "Allāhumma innahū nazala bika wa anta khairu manzūlim bih, wa aṣbaḥa faqīran ilā raḥmatik, wa anta ganiyyun ‘an ‘ażābih, wa qad ji’nāka rāgibīna ilaika syufa‘ā’a lah. Allāhumma in kāna muḥsinan fazid fī iḥsānih, wa in kāna musī’an fatajāwaz ‘anh, wa laqqihī biraḥmatika riḍāk, wa qihī fitnatal-qabri wa ‘ażābah, wafsaḥ lahū fī qabrih, wa jāfil-arḍa ‘an janbaih, wa laqqihī biraḥmatikal-amna min ‘ażābika ḥattā tab‘aṡahū āminan ilā jannatik, biraḥmatika yā arḥamar-rāḥimīn.",
          "arti": "Ya  Allah, dia kembali kepada-Mu. Engkau adalah sebaik-baik tempat kembali. Ia membutuhkan rahmat-Mu. Sementara Engkau tidak perlu menyiksanya. Kami mendatangi-Mu seraya mengharap kepada-Mu agar dapat memberikan syafa’at baginya. Ya Allah, jika ia orang baik, maka tambahkanlah kebaikannya. Jika ia orang jahat, maka maafkanlah keburukannya. Pertemukan ia dan ridha-Mu berkat rahmat-Mu. Peliharalah ia dari fitnah dan azab kubur. Lapangkanlah kuburnya. Jauhkanlah dinding bumi dari kedua sisi badannya. Pertemukanlah ia dan keamanan berkat rahmat-Mu dari azab-Mu hingga Engkau membangkitkannya dalam keadaan aman menuju surga-Mu berkat rahmat-Mu, wahai Zat Yang Maha Pengasih."
        },
        {
          "label": "Doa untuk ahli kubur (laki-laki)",
          "arab": "اللهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ",
          "latin": "Allāhummagfir lahū warḥamhu wa ‘āfihī wa‘fu ‘anh.",
          "arti": "Ya Allah, ampunilah dirinya, kasihanilah dirinya, afiatkan dirinya, dan maafkanlah dirinya."
        },
        {
          "label": "Untuk ahli kubur perempuan",
          "arab": "اللهُمَّ اغْفِرْ لَها وَارْحَمْها وَعَافِها وَاعْفُ عَنْها يَا رَبَّ العَالَمِيْنَ",
          "latin": "Allāhummagfir lahā warḥamhā wa ‘āfihā wa‘fu ‘anhā yā rabbal-‘ālamīn.",
          "arti": "Ya Allah, ampunilah dirinya (perempuan), kasihanilah dirinya, afiatkan dirinya, dan maafkanlah dirinya, wahai Tuhan sekalian alam."
        },
        {
          "label": "Pahala untuk yang hadir dan keluarganya",
          "arab": "وَاجْعَلِ اللهُمَّ ثَوَابًا مِثْلَ ثَوَابِ ذَالِكَ فِي صَحَائِفِنَا وَفِي صَحَائِفِ وَالِدِيْنَا وَمَشَائِخِنَا وَالسَّادَاتِ الحَاضِرِيْنَ وَوَالِدِيْهِمْ وَمَشَائِخِهِمْ خَاصَّةً وَإِلَى أَمْوَاتِ المُسْلِمِيْنَ عَامَّةً",
          "latin": "Waj‘alillāhumma ṡawāban miṡla ṡawābi żālika fī ṣaḥā’ifinā wa fī ṣaḥā’ifi wālidīnā wa masyā’ikhinā was-sādātil-ḥāḍirīna wa wālidīhim wa masyā’ikhihim khāṣṣah, wa ilā amwātil-muslimīna ‘āmmah.",
          "arti": "Ya Allah, jadikanlah pahala ini sebagaimana pahala demikian yang tercatat pada lembaran kami, lembaran orang tua kami, guru kami, para pemuka yang hadir, orang tua mereka, dan guru mereka khususnya, dan arwah umat Islam secara umum."
        },
        {
          "label": "Ingat dan paham Al-Qur’an",
          "arab": "اللهُمَّ ذَكِّرْنَا مِنْهُ مَا نَسِيْنَا وَعَلِّمْنَاهُ مَا جَهِلْنَا وَارْزُقْنَا تِلَاوَتَهُ آنَاءَ اللَّيْلِ وَأَطْرَافَ النَّهَارِ، وَاجْعَلْهُ حُجَّةً لَّنَا وَلَا تَجْعَلْهُ حُجَّةً عَلَيْنَا",
          "latin": "Allāhumma żakkirnā minhu mā nasīnā wa ‘allimnāhu mā jahilnā, warzuqnā tilāwatahū ānā’al-laili wa aṭrāfan-nahār, waj‘alhu ḥujjatal lanā wa lā taj‘alhu ḥujjatan ‘alainā.",
          "arti": "Ya Allah, ingatkan kami ayat-ayat Al-Qur‘an yang kami terlupa. Beritahukan kami sesuatu yang kami tidak ketahui. Anugerahkan kami kesempatan untuk membacanya sepanjang malam dan di tepi-tepi siang. Jadikanlah Al-Qur‘an sebagai pembela kami. Jangan jadikan Al-Qur‘an sebagai penghujat kami kelak."
        },
        {
          "label": "Kemurahan dan keridaan Allah",
          "arab": "اللهُمَّ بِفَضْلِكَ عُمَّنَا، وَبِلُطْفِكَ حُفَّنَا، وَعَلَى الإِسْلَامِ وَالإِيْمَانِ جَمْعًا تَوَفَّنَا وَأَنْتَ رَاضٍ عَنَّا، وَاخْتِمْ بِالصَّالِحَاتِ أَعْمَالَنَا. رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ، بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِيْنَ، وَالحَمْدُ لِلهِ رَبِّ العَالَمِيْنَ",
          "latin": "Allāhumma bifaḍlika ‘ummanā, wa biluṭfika ḥuffanā, wa ‘alal-islāmi wal-īmāni jam‘an tawaffanā wa anta rāḍin ‘annā, wakhtim biṣ-ṣāliḥāti a‘mālanā. Rabbanā ātinā fid-dunyā ḥasanataw wa fil-ākhirati ḥasanataw wa qinā ‘ażāban-nār, biraḥmatika yā arḥamar-rāḥimīn, wal-ḥamdu lillāhi rabbil-‘ālamīn.",
          "arti": "Ya Allah, ratakanlah keutamaan-Mu. Selimuti kami dengan kelembutan-Mu. Atas Islam dan iman sekaligus, matikanlah kami sementara Kaumeridhai kami. Akhiri amal kami dengan kesalehan. Tuhan kami, berikanlah kami kebaikan di dunia, dan kebaikan di akhirat. Lindungilah kami dari siksa neraka, dengan rahmat-Mu wahai Tuhan maha penyayang. Segala puji bagi Allah, Tuhan sekalian alam."
        }
      ],
      "note": "Doa arwah lengkap menurut Kitab Majmu‘ Syarif. Untuk almarhumah, kata ganti “-hu” diganti “-hā”."
    }
  ];
}
