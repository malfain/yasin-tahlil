// Susunan bacaan tahlil lengkap (lazim di kalangan Nahdliyin).
// Ayat Al-Qur'an: teks, latin, dan terjemahan Kemenag dari equran.id (disimpan di sini agar bisa dibaca offline).
// Bacaan selain ayat (tawasul, tahlil, shalawat, tasbih, doa) mengikuti susunan tahlil NU yang umum.
// Tiap langkah: { name, target, note?, key?, parts: [{ label?, arab, latin, arti }] }.
// Target langkah "Tahlil" mengikuti pengaturan 33/100.
export function tahlilSteps(jumlahTahlil = 100) {
  return [
    {
      "name": "Tawasul & hadiah Al-Fatihah",
      "target": 1,
      "parts": [
        {
          "label": "Kepada Nabi Muhammad ﷺ",
          "arab": "اِلٰى حَضْرَةِ النَّبِيِّ الْمُصْطَفٰى مُحَمَّدٍ صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ وَاٰلِهٖ وَاَصْحَابِهٖ وَاَزْوَاجِهٖ وَذُرِّيَّاتِهٖ وَاَهْلِ بَيْتِهٖ اَجْمَعِيْنَ، شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ",
          "latin": "Ilā ḥaḍratin-nabiyyil-muṣṭafā Muḥammadin ṣallallāhu ‘alaihi wa sallama wa ālihī wa aṣḥābihī wa azwājihī wa żurriyyātihī wa ahli baitihī ajma‘īn, syai’un lillāhi lahumul-fātiḥah.",
          "arti": "Kepada yang mulia Nabi pilihan, Muhammad ﷺ, beserta keluarga, para sahabat, istri-istri, keturunan, dan ahli baitnya semua. Semata karena Allah, untuk mereka (kami hadiahkan) Al-Fatihah."
        },
        {
          "label": "Kepada para nabi, wali, dan ulama",
          "arab": "ثُمَّ اِلٰى حَضَرَاتِ اِخْوَانِهٖ مِنَ الْاَنْبِيَاۤءِ وَالْمُرْسَلِيْنَ وَالْاَوْلِيَاۤءِ وَالشُّهَدَاۤءِ وَالصَّالِحِيْنَ وَالصَّحَابَةِ وَالتَّابِعِيْنَ وَالْعُلَمَاۤءِ الْعَامِلِيْنَ وَالْمُصَنِّفِيْنَ الْمُخْلِصِيْنَ وَجَمِيْعِ الْمَلٰۤىِٕكَةِ الْمُقَرَّبِيْنَ، خُصُوْصًا اِلٰى سَيِّدِنَا الشَّيْخِ عَبْدِ الْقَادِرِ الْجِيْلَانِيِّ، شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ",
          "latin": "Ṡumma ilā ḥaḍarāti ikhwānihī minal-anbiyā’i wal-mursalīn, wal-auliyā’i wasy-syuhadā’i waṣ-ṣāliḥīn, waṣ-ṣaḥābati wat-tābi‘īn, wal-‘ulamā’il-‘āmilīn, wal-muṣannifīnal-mukhliṣīn, wa jamī‘il-malā’ikatil-muqarrabīn, khuṣūṣan ilā sayyidinasy-syaikh ‘Abdil-Qādiril-Jīlānī, syai’un lillāhi lahumul-fātiḥah.",
          "arti": "Kemudian kepada saudara-saudara beliau dari kalangan para nabi dan rasul, para wali, syuhada, orang-orang saleh, para sahabat, tabi‘in, para ulama yang mengamalkan ilmunya, para penulis kitab yang ikhlas, dan semua malaikat yang didekatkan (kepada Allah), khususnya kepada Syekh Abdul Qadir Al-Jilani. Semata karena Allah, untuk mereka Al-Fatihah."
        },
        {
          "label": "Kepada ahli kubur",
          "arab": "ثُمَّ اِلٰى جَمِيْعِ اَهْلِ الْقُبُوْرِ مِنَ الْمُسْلِمِيْنَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِيْنَ وَالْمُؤْمِنَاتِ مِنْ مَشَارِقِ الْاَرْضِ اِلٰى مَغَارِبِهَا بَرِّهَا وَبَحْرِهَا، خُصُوْصًا اِلٰى اٰبَاۤئِنَا وَاُمَّهَاتِنَا وَاَجْدَادِنَا وَجَدَّاتِنَا وَمَشَايِخِنَا وَمَشَايِخِ مَشَايِخِنَا وَلِمَنِ اجْتَمَعْنَا هٰهُنَا بِسَبَبِهٖ، شَيْءٌ لِلّٰهِ لَهُمُ الْفَاتِحَةُ",
          "latin": "Ṡumma ilā jamī‘i ahlil-qubūri minal-muslimīna wal-muslimāt, wal-mu’minīna wal-mu’mināt, min masyāriqil-arḍi ilā magāribihā, barrihā wa baḥrihā, khuṣūṣan ilā ābā’inā wa ummahātinā, wa ajdādinā wa jaddātinā, wa masyāyikhinā wa masyāyikhi masyāyikhinā, wa limanijtama‘nā hāhunā bi sababihī, syai’un lillāhi lahumul-fātiḥah.",
          "arti": "Kemudian kepada seluruh ahli kubur dari kaum muslimin dan muslimat, mukminin dan mukminat, dari timur hingga barat bumi, di darat maupun di laut; khususnya kepada bapak-bapak dan ibu-ibu kami, kakek dan nenek kami, guru-guru kami dan guru dari guru-guru kami, serta kepada (almarhum/almarhumah) yang karenanya kami berkumpul di sini. Semata karena Allah, untuk mereka Al-Fatihah."
        },
        {
          "label": "Surah Al-Fatihah",
          "arab": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ﴿١﴾ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ ﴿٢﴾ الرَّحْمٰنِ الرَّحِيْمِۙ ﴿٣﴾ مٰلِكِ يَوْمِ الدِّيْنِۗ ﴿٤﴾ اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ ﴿٥﴾ اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ ﴿٦﴾ صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ﴿٧﴾",
          "latin": "Bismillāhir-raḥmānir-raḥīm(i). Al-ḥamdu lillāhi rabbil-‘ālamīn(a). Ar-raḥmānir-raḥīm(i). Māliki yaumid-dīn(i). Iyyāka na‘budu wa iyyāka nasta‘īn(u), Ihdinaṣ-ṣirāṭal-mustaqīm(a). Ṣirāṭal-lażīna an‘amta ‘alaihim, gairil-magḍūbi ‘alaihim wa laḍ-ḍāllīn(a).",
          "arti": "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam Yang Maha Pengasih lagi Maha Penyayang, Pemilik hari Pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan. Bimbinglah kami ke jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat, bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) orang-orang yang sesat."
        }
      ],
      "note": "Setiap selesai satu hadiah, bacalah Surah Al-Fatihah. Nama almarhum/almarhumah boleh disebut pada hadiah ketiga."
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
          "label": "Setelah surat",
          "arab": "لَا اِلٰهَ اِلَّا اللّٰهُ وَاللّٰهُ اَكْبَرُ",
          "latin": "Lā ilāha illallāhu wallāhu akbar.",
          "arti": "Tiada tuhan selain Allah, dan Allah Maha Besar."
        }
      ],
      "note": "QS. Al-Ikhlas: 1–4 · dibaca 3 kali, masing-masing diakhiri tahlil dan takbir."
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
          "label": "Setelah surat",
          "arab": "لَا اِلٰهَ اِلَّا اللّٰهُ وَاللّٰهُ اَكْبَرُ",
          "latin": "Lā ilāha illallāhu wallāhu akbar.",
          "arti": "Tiada tuhan selain Allah, dan Allah Maha Besar."
        }
      ],
      "note": "QS. Al-Falaq: 1–5"
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
          "label": "Setelah surat",
          "arab": "لَا اِلٰهَ اِلَّا اللّٰهُ وَاللّٰهُ اَكْبَرُ",
          "latin": "Lā ilāha illallāhu wallāhu akbar.",
          "arti": "Tiada tuhan selain Allah, dan Allah Maha Besar."
        }
      ],
      "note": "QS. An-Nas: 1–6"
    },
    {
      "name": "Surah Al-Fatihah",
      "target": 1,
      "parts": [
        {
          "arab": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ﴿١﴾ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ ﴿٢﴾ الرَّحْمٰنِ الرَّحِيْمِۙ ﴿٣﴾ مٰلِكِ يَوْمِ الدِّيْنِۗ ﴿٤﴾ اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ ﴿٥﴾ اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ ﴿٦﴾ صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ﴿٧﴾",
          "latin": "Bismillāhir-raḥmānir-raḥīm(i). Al-ḥamdu lillāhi rabbil-‘ālamīn(a). Ar-raḥmānir-raḥīm(i). Māliki yaumid-dīn(i). Iyyāka na‘budu wa iyyāka nasta‘īn(u), Ihdinaṣ-ṣirāṭal-mustaqīm(a). Ṣirāṭal-lażīna an‘amta ‘alaihim, gairil-magḍūbi ‘alaihim wa laḍ-ḍāllīn(a).",
          "arti": "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam Yang Maha Pengasih lagi Maha Penyayang, Pemilik hari Pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan. Bimbinglah kami ke jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat, bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) orang-orang yang sesat."
        }
      ],
      "note": "QS. Al-Fatihah: 1–7"
    },
    {
      "name": "Al-Baqarah 1–5",
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
      "target": 7,
      "parts": [
        {
          "arab": "اِرْحَمْنَا يَا اَرْحَمَ الرَّاحِمِيْنَ",
          "latin": "Irḥamnā yā arḥamar-rāḥimīn.",
          "arti": "Kasihanilah kami, wahai Dzat Yang Maha Pengasih di antara para pengasih."
        }
      ],
      "note": "Dibaca 7 kali."
    },
    {
      "name": "Hud 73",
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
      "name": "Al-Ahzab 33",
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
      "name": "Al-Ahzab 56 & shalawat",
      "target": 1,
      "parts": [
        {
          "arab": "اِنَّ اللّٰهَ وَمَلٰۤىِٕكَتَهٗ يُصَلُّوْنَ عَلَى النَّبِيِّۗ يٰٓاَيُّهَا الَّذِيْنَ اٰمَنُوْا صَلُّوْا عَلَيْهِ وَسَلِّمُوْا تَسْلِيْمًا ﴿٥٦﴾",
          "latin": "Innallāha wa malā'ikatahū yuṣallūna ‘alan-nabiyy(i), yā ayyuhal-lażīna āmanū ṣallū ‘alaihi wa sallimū taslīmā(n).",
          "arti": "Sesungguhnya Allah dan para malaikat-Nya berselawat untuk Nabi. Wahai orang-orang yang beriman, berselawatlah kamu untuk Nabi dan ucapkanlah salam dengan penuh penghormatan kepadanya."
        },
        {
          "label": "Shalawat",
          "arab": "اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ، اَللّٰهُمَّ صَلِّ عَلَيْهِ وَسَلِّمْ",
          "latin": "Allāhumma ṣalli ‘alā sayyidinā Muḥammadin wa ‘alā āli sayyidinā Muḥammad, Allāhumma ṣalli ‘alaihi wa sallim.",
          "arti": "Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad dan keluarganya. Ya Allah, limpahkanlah rahmat dan keselamatan kepadanya."
        }
      ],
      "note": "QS. Al-Ahzab: 56, lalu shalawat."
    },
    {
      "name": "Ḥasbunallāh",
      "target": 1,
      "parts": [
        {
          "arab": "حَسْبُنَا اللّٰهُ وَنِعْمَ الْوَكِيْلُ نِعْمَ الْمَوْلٰى وَنِعْمَ النَّصِيْرُ",
          "latin": "Ḥasbunallāhu wa ni‘mal-wakīl(u). Ni‘mal-maulā wa ni‘man-naṣīr(u).",
          "arti": "Cukuplah Allah (menjadi penolong) bagi kami dan Dia sebaik-baik pelindung. Dia adalah sebaik-baik pelindung dan sebaik-baik penolong."
        },
        {
          "label": "Hauqalah",
          "arab": "وَلَا حَوْلَ وَلَا قُوَّةَ اِلَّا بِاللّٰهِ الْعَلِيِّ الْعَظِيْمِ",
          "latin": "Wa lā ḥaula wa lā quwwata illā billāhil-‘aliyyil-‘aẓīm.",
          "arti": "Tiada daya dan kekuatan kecuali dengan (pertolongan) Allah Yang Maha Tinggi lagi Maha Agung."
        }
      ],
      "note": "QS. Ali ‘Imran: 173 & QS. Al-Anfal: 40 (bagian akhir ayat), lalu hauqalah."
    },
    {
      "name": "Istighfar",
      "target": 3,
      "parts": [
        {
          "arab": "اَسْتَغْفِرُ اللّٰهَ الْعَظِيْمَ",
          "latin": "Astagfirullāhal-‘aẓīm.",
          "arti": "Aku memohon ampun kepada Allah Yang Maha Agung."
        }
      ],
      "note": "Dibaca 3 kali."
    },
    {
      "name": "Tahlil",
      "target": jumlahTahlil,
      "parts": [
        {
          "label": "Pembuka",
          "arab": "اَفْضَلُ الذِّكْرِ فَاعْلَمْ اَنَّهٗ لَا اِلٰهَ اِلَّا اللّٰهُ، حَيٌّ مَوْجُوْدٌ",
          "latin": "Afḍaluż-żikri fa‘lam annahū lā ilāha illallāh, ḥayyun maujūd.",
          "arti": "Sebaik-baik dzikir, ketahuilah, adalah bahwa tiada tuhan selain Allah, Yang Maha Hidup lagi Maha Ada."
        },
        {
          "label": "Dibaca berulang",
          "arab": "لَا اِلٰهَ اِلَّا اللّٰهُ",
          "latin": "Lā ilāha illallāh.",
          "arti": "Tiada tuhan selain Allah."
        },
        {
          "label": "Penutup",
          "arab": "لَا اِلٰهَ اِلَّا اللّٰهُ مُحَمَّدٌ رَّسُوْلُ اللّٰهِ صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ",
          "latin": "Lā ilāha illallāhu Muḥammadur-rasūlullāhi ṣallallāhu ‘alaihi wa sallam.",
          "arti": "Tiada tuhan selain Allah, Muhammad adalah utusan Allah, semoga Allah melimpahkan rahmat dan keselamatan kepadanya."
        }
      ],
      "note": "Hitungan mengikuti pengaturan 33× atau 100×.",
      "key": "tahlil"
    },
    {
      "name": "Shalawat",
      "target": 2,
      "parts": [
        {
          "arab": "اَللّٰهُمَّ صَلِّ عَلٰى سَيِّدِنَا مُحَمَّدٍ، اَللّٰهُمَّ صَلِّ عَلَيْهِ وَسَلِّمْ",
          "latin": "Allāhumma ṣalli ‘alā sayyidinā Muḥammad, Allāhumma ṣalli ‘alaihi wa sallim.",
          "arti": "Ya Allah, limpahkanlah rahmat kepada junjungan kami Nabi Muhammad. Ya Allah, limpahkanlah rahmat dan keselamatan kepadanya."
        }
      ],
      "note": "Dibaca 2 kali."
    },
    {
      "name": "Tasbih",
      "target": 33,
      "parts": [
        {
          "arab": "سُبْحَانَ اللّٰهِ وَبِحَمْدِهٖ سُبْحَانَ اللّٰهِ الْعَظِيْمِ",
          "latin": "Subḥānallāhi wa biḥamdihī subḥānallāhil-‘aẓīm.",
          "arti": "Maha Suci Allah dengan segala puji bagi-Nya, Maha Suci Allah Yang Maha Agung."
        }
      ],
      "note": "Dibaca 33 kali (HR. Bukhari & Muslim)."
    },
    {
      "name": "Shalawat penutup",
      "target": 3,
      "parts": [
        {
          "arab": "اَللّٰهُمَّ صَلِّ عَلٰى حَبِيْبِكَ سَيِّدِنَا مُحَمَّدٍ وَعَلٰى اٰلِهٖ وَصَحْبِهٖ وَسَلِّمْ",
          "latin": "Allāhumma ṣalli ‘alā ḥabībika sayyidinā Muḥammadin wa ‘alā ālihī wa ṣaḥbihī wa sallim.",
          "arti": "Ya Allah, limpahkanlah rahmat kepada kekasih-Mu, junjungan kami Nabi Muhammad, beserta keluarga dan sahabatnya, serta limpahkanlah keselamatan."
        }
      ],
      "note": "Dibaca 3 kali."
    },
    {
      "name": "Al-Fatihah",
      "target": 1,
      "parts": [
        {
          "arab": "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ ﴿١﴾ اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ ﴿٢﴾ الرَّحْمٰنِ الرَّحِيْمِۙ ﴿٣﴾ مٰلِكِ يَوْمِ الدِّيْنِۗ ﴿٤﴾ اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ ﴿٥﴾ اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ ﴿٦﴾ صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ﴿٧﴾",
          "latin": "Bismillāhir-raḥmānir-raḥīm(i). Al-ḥamdu lillāhi rabbil-‘ālamīn(a). Ar-raḥmānir-raḥīm(i). Māliki yaumid-dīn(i). Iyyāka na‘budu wa iyyāka nasta‘īn(u), Ihdinaṣ-ṣirāṭal-mustaqīm(a). Ṣirāṭal-lażīna an‘amta ‘alaihim, gairil-magḍūbi ‘alaihim wa laḍ-ḍāllīn(a).",
          "arti": "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam Yang Maha Pengasih lagi Maha Penyayang, Pemilik hari Pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami memohon pertolongan. Bimbinglah kami ke jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat, bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) orang-orang yang sesat."
        }
      ],
      "note": "QS. Al-Fatihah: 1–7 · dihadiahkan sebelum doa."
    },
    {
      "name": "Doa Tahlil",
      "target": 1,
      "parts": [
        {
          "label": "Pembuka",
          "arab": "اَعُوْذُ بِاللّٰهِ مِنَ الشَّيْطٰنِ الرَّجِيْمِ، بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ. اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَ، حَمْدًا يُّوَافِيْ نِعَمَهٗ وَيُكَافِئُ مَزِيْدَهٗ، يَا رَبَّنَا لَكَ الْحَمْدُ كَمَا يَنْبَغِيْ لِجَلَالِ وَجْهِكَ وَعَظِيْمِ سُلْطَانِكَ. اَللّٰهُمَّ صَلِّ وَسَلِّمْ عَلٰى سَيِّدِنَا مُحَمَّدٍ وَّعَلٰى اٰلِ سَيِّدِنَا مُحَمَّدٍ.",
          "latin": "A‘ūżu billāhi minasy-syaiṭānir-rajīm, bismillāhir-raḥmānir-raḥīm. Al-ḥamdu lillāhi rabbil-‘ālamīn, ḥamday yuwāfī ni‘amahū wa yukāfi’u mazīdah, yā rabbanā lakal-ḥamdu kamā yambagī lijalāli wajhika wa ‘aẓīmi sulṭānik. Allāhumma ṣalli wa sallim ‘alā sayyidinā Muḥammadiw wa ‘alā āli sayyidinā Muḥammad.",
          "arti": "Aku berlindung kepada Allah dari setan yang terkutuk. Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan semesta alam, pujian yang sebanding dengan nikmat-nikmat-Nya dan menyamai tambahan karunia-Nya. Wahai Tuhan kami, bagi-Mu segala puji sebagaimana layak bagi keagungan wajah-Mu dan kebesaran kekuasaan-Mu. Ya Allah, limpahkanlah rahmat dan keselamatan kepada junjungan kami Nabi Muhammad dan keluarganya."
        },
        {
          "label": "Menghadiahkan pahala",
          "arab": "اَللّٰهُمَّ تَقَبَّلْ وَاَوْصِلْ ثَوَابَ مَا قَرَأْنَاهُ مِنَ الْقُرْاٰنِ الْعَظِيْمِ، وَمَا هَلَّلْنَا وَمَا سَبَّحْنَا وَمَا اسْتَغْفَرْنَا وَمَا صَلَّيْنَا عَلٰى سَيِّدِنَا مُحَمَّدٍ صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ، هَدِيَّةً وَّاصِلَةً وَّرَحْمَةً نَّازِلَةً وَّبَرَكَةً شَامِلَةً، اِلٰى حَضْرَةِ حَبِيْبِنَا وَشَفِيْعِنَا وَقُرَّةِ اَعْيُنِنَا سَيِّدِنَا وَمَوْلَانَا مُحَمَّدٍ صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ، وَاِلٰى جَمِيْعِ اِخْوَانِهٖ مِنَ الْاَنْبِيَاۤءِ وَالْمُرْسَلِيْنَ وَالْاَوْلِيَاۤءِ وَالشُّهَدَاۤءِ وَالصَّالِحِيْنَ وَالصَّحَابَةِ وَالتَّابِعِيْنَ وَالْعُلَمَاۤءِ الْعَامِلِيْنَ وَالْمُصَنِّفِيْنَ الْمُخْلِصِيْنَ وَجَمِيْعِ الْمَلٰۤىِٕكَةِ الْمُقَرَّبِيْنَ، ثُمَّ اِلٰى جَمِيْعِ اَهْلِ الْقُبُوْرِ مِنَ الْمُسْلِمِيْنَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِيْنَ وَالْمُؤْمِنَاتِ مِنْ مَّشَارِقِ الْاَرْضِ اِلٰى مَغَارِبِهَا بَرِّهَا وَبَحْرِهَا، خُصُوْصًا اِلٰى اٰبَاۤئِنَا وَاُمَّهَاتِنَا وَاَجْدَادِنَا وَجَدَّاتِنَا وَمَشَايِخِنَا وَمَشَايِخِ مَشَايِخِنَا وَلِمَنِ اجْتَمَعْنَا هٰهُنَا بِسَبَبِهٖ.",
          "latin": "Allāhumma taqabbal wa auṣil ṡawāba mā qara’nāhu minal-qur’ānil-‘aẓīm, wa mā hallalnā wa mā sabbaḥnā wa mastagfarnā wa mā ṣallainā ‘alā sayyidinā Muḥammadin ṣallallāhu ‘alaihi wa sallam, hadiyyataw wāṣilataw wa raḥmatan nāzilataw wa barakatan syāmilah, ilā ḥaḍrati ḥabībinā wa syafī‘inā wa qurrati a‘yuninā sayyidinā wa maulānā Muḥammadin ṣallallāhu ‘alaihi wa sallam, wa ilā jamī‘i ikhwānihī minal-anbiyā’i wal-mursalīn, wal-auliyā’i wasy-syuhadā’i waṣ-ṣāliḥīn, waṣ-ṣaḥābati wat-tābi‘īn, wal-‘ulamā’il-‘āmilīn, wal-muṣannifīnal-mukhliṣīn, wa jamī‘il-malā’ikatil-muqarrabīn, ṡumma ilā jamī‘i ahlil-qubūri minal-muslimīna wal-muslimāt, wal-mu’minīna wal-mu’mināt, mim masyāriqil-arḍi ilā magāribihā, barrihā wa baḥrihā, khuṣūṣan ilā ābā’inā wa ummahātinā, wa ajdādinā wa jaddātinā, wa masyāyikhinā wa masyāyikhi masyāyikhinā, wa limanijtama‘nā hāhunā bi sababih.",
          "arti": "Ya Allah, terimalah dan sampaikanlah pahala Al-Qur’an yang agung yang telah kami baca, tahlil, tasbih, istighfar, dan shalawat kami kepada junjungan kami Nabi Muhammad ﷺ, sebagai hadiah yang sampai, rahmat yang turun, dan berkah yang meliputi, kepada kekasih kami, pemberi syafaat kami, dan penyejuk mata kami, junjungan kami Nabi Muhammad ﷺ; kepada saudara-saudara beliau dari kalangan para nabi dan rasul, para wali, syuhada, orang-orang saleh, para sahabat, tabi‘in, ulama yang mengamalkan ilmunya, para penulis kitab yang ikhlas, dan semua malaikat yang didekatkan; kemudian kepada seluruh ahli kubur dari kaum muslimin dan muslimat, mukminin dan mukminat, dari timur hingga barat bumi, di darat maupun di laut; khususnya kepada bapak-ibu kami, kakek-nenek kami, guru-guru kami dan guru dari guru-guru kami, serta kepada (almarhum/almarhumah) yang karenanya kami berkumpul di sini."
        },
        {
          "label": "Doa untuk ahli kubur",
          "arab": "اَللّٰهُمَّ اغْفِرْ لَهُمْ وَارْحَمْهُمْ وَعَافِهِمْ وَاعْفُ عَنْهُمْ. اَللّٰهُمَّ اَنْزِلِ الرَّحْمَةَ وَالْمَغْفِرَةَ عَلٰى اَهْلِ الْقُبُوْرِ مِنْ اَهْلِ لَا اِلٰهَ اِلَّا اللّٰهُ مُحَمَّدٌ رَّسُوْلُ اللّٰهِ.",
          "latin": "Allāhummagfir lahum warḥamhum wa ‘āfihim wa‘fu ‘anhum. Allāhumma anzilir-raḥmata wal-magfirata ‘alā ahlil-qubūri min ahli lā ilāha illallāhu Muḥammadur-rasūlullāh.",
          "arti": "Ya Allah, ampunilah mereka, rahmatilah mereka, selamatkanlah mereka, dan maafkanlah mereka. Ya Allah, turunkanlah rahmat dan ampunan kepada ahli kubur dari kalangan ahli “lā ilāha illallāh, Muḥammadur rasūlullāh”."
        },
        {
          "label": "Sapu jagat (QS. Al-Baqarah: 201)",
          "arab": "وَمِنْهُمْ مَّنْ يَّقُوْلُ رَبَّنَآ اٰتِنَا فِى الدُّنْيَا حَسَنَةً وَّفِى الْاٰخِرَةِ حَسَنَةً وَّقِنَا عَذَابَ النَّارِ",
          "latin": "Wa minhum may yaqūlu rabbanā ātinā fid-dun-yā ḥasanataw wa fil-ākhirati ḥasanataw wa qinā ‘ażāban-nār(i).",
          "arti": "Di antara mereka ada juga yang berdoa, “Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat serta lindungilah kami dari azab neraka.”"
        },
        {
          "label": "Penutup (QS. Ash-Shaffat: 180–182)",
          "arab": "سُبْحٰنَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُوْنَۚ وَسَلٰمٌ عَلَى الْمُرْسَلِيْنَۚ وَالْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَ",
          "latin": "Subḥāna rabbika rabbil-‘izzati ‘ammā yaṣifūn(a). Wa salāmun ‘alal-mursalīn(a). Wal-ḥamdu lillāhi rabbil-‘ālamīn(a).",
          "arti": "Maha Suci Tuhanmu, Tuhan pemilik kemuliaan dari apa yang mereka sifatkan. Selamat sejahtera bagi para rasul. Segala puji bagi Allah, Tuhan semesta alam."
        }
      ],
      "note": "Doa tahlil lengkap yang umum dibaca di kalangan Nahdliyin; susunan bisa sedikit berbeda antar daerah."
    }
  ];
}
