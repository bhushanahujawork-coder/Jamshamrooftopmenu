window.JSR_TEMPLATES = (function () {

  var T = {
    en: {
      pos: {
        open: [
          'Honestly, I was not expecting much, but {biz} pleasantly surprised me {when}.',
          'We ended up at {biz} {when} and it turned out to be such a lovely evening.',
          '{biz} has quietly become our favourite spot in {loc}.',
          'I have been to a lot of cafes, but {biz} genuinely stands out.',
          'Took my friends to {biz} {when} and everyone was impressed.',
          'Was in the mood for something good {when}, and {biz} absolutely delivered.',
          'Came across {biz} completely by chance {when}, and wow, what a find.',
          'My first visit to {biz} was {when}, and it certainly will not be the last.',
          'If you are looking for a place that actually feels special, {biz} is it.',
          'We had been hearing good things about {biz}, and honestly it lived up to every word.',
          'Spent a relaxed evening at {biz} {when} — exactly what I needed after a long week.',
          'Took my family to {biz} {when}, and even the kids did not want to leave.'
        ],
        tag: {
          'food': ['the food was genuinely delicious, not just presentation', 'every single dish we ordered was fresh and full of flavour', 'the food here easily matches the best cafes in {loc}', 'we kept ordering one more thing because everything tasted so good'],
          'taste': ['the flavours were perfectly balanced, you could tell it was made with care', 'everything tasted fresh and well-seasoned', 'honestly, the taste stayed with me for the rest of the night'],
          'service': ['the service was quick and genuinely friendly, not fake at all', 'they took care of us without hovering, which I really appreciated', 'even during a busy rush, the service stayed smooth', 'our server was attentive and even gave us great suggestions'],
          'staff': ['the staff made us feel so welcome', 'everyone there was warm and smiling, it felt personal', 'they treated us like regulars even though it was our first visit', 'shoutout to the staff for making the evening so pleasant'],
          'ambience': ['the ambience was warm and cosy, perfect for a quiet evening', 'the seating, the lighting, the vibe — everything just worked', 'it is one of those places where you forget the time', 'the whole atmosphere felt inviting from the moment we walked in'],
          'cleanliness': ['the place was spotless, right from the tables to the washrooms', 'hygiene is clearly taken seriously here, which is rare', 'it felt clean and well-kept throughout our visit'],
          'value for money': ['the prices felt very fair for the quality we got', 'we ate well, and the bill still felt reasonable', 'honestly, it was worth every rupee we spent'],
          'drinks': ['their cold coffee is a must-try, it was perfect', 'the shakes were thick, creamy and genuinely refreshing', 'the drinks were a highlight — well made and full of taste'],
          'rooftop': ['the rooftop seating under the open sky was the best part of the evening', 'sitting up there with the breeze and good food — pure bliss', 'the rooftop view at night made the whole experience special'],
          'music': ['the music was just right — present enough to set the mood, not loud enough to bother', 'the playlist was lovely, made the evening so much better', 'good music, good food, good company — everything clicked'],
          'overall experience': ['overall, it was one of those evenings you do not forget', 'the whole experience came together so nicely', 'overall, everything exceeded what I expected']
        },
        item: [
          'The {item} we ordered was honestly the best part of the night',
          'We tried the {item} and it was spot on',
          'Do not leave without trying the {item}',
          'The {item} alone is worth coming back for',
          'Our {item} was fresh, hot and absolutely delicious'
        ],
        close: [
          'Will definitely be coming back, no doubt about it.',
          'Already looking forward to my next visit.',
          'If you are in {loc}, do yourself a favour and try this place.',
          'This place deserves all the good reviews it gets.',
          'Highly recommended — go with family or friends, either works.',
          'Easily one of the better evenings I have had in a while.',
          'Cannot wait to bring more people here.',
          'No complaints at all — it was a genuinely lovely experience.'
        ]
      },
      mid: {
        open: [
          'Visited {biz} {when} — it was okay, though I expected a little more.',
          'Gave {biz} a try {when} and honestly, it was a mixed experience.',
          'Dropped by {biz} {when} since we were nearby, and it was fine overall.',
          'We went to {biz} {when}, and while nothing was terrible, nothing stood out either.',
          'Heard good things about {biz}, so we checked it out {when} — it was decent.',
          'Had a fairly average visit to {biz} {when}.',
          'Ended up at {biz} {when} and left thinking, "it was alright I guess".',
          'My visit to {biz} {when} was fine, though I do not think I will rush back.'
        ],
        tag: {
          'food': ['the food was decent, though it did not really wow me', 'some dishes were nice, others were pretty average', 'the food was okay overall, nothing I would crave again'],
          'taste': ['the taste was fine but nothing memorable', 'flavours were acceptable, just missing that something', 'the dishes were okay in taste, not bad but not great'],
          'service': ['the service was polite but a bit slow at times', 'we had to wait a while, though the staff was courteous', 'service was average — nothing great, nothing bad'],
          'staff': ['the staff was okay, though not very attentive', 'they were polite, just did not go out of their way'],
          'ambience': ['the ambience was decent for a casual visit', 'the place looked fine, though nothing special', 'vibe was okay, neither great nor bad'],
          'cleanliness': ['cleanliness was average', 'the place looked tidy enough'],
          'value for money': ['the prices felt a little high for what we got', 'value for money was okay, not great', 'I have had better value at similar places'],
          'drinks': ['the drinks were average', 'the cold coffee was okay, nothing special'],
          'rooftop': ['the rooftop was fine, though it got a bit crowded', 'rooftop seating was decent but not amazing'],
          'music': ['the music was okay, a little loud at times', 'the playlist was mixed, some good some average'],
          'overall experience': ['overall it was an average visit', 'overall, the experience was neither good nor bad', 'overall it left me feeling neutral']
        },
        item: [
          'The {item} was okay, though I expected a bit more',
          'We tried the {item} and it was decent, nothing special',
          'The {item} was fine but not something I would order again'
        ],
        close: [
          'Might give it another chance sometime.',
          'It is okay if you are nearby, not worth a special trip.',
          'Could improve in a few areas, but it is not bad.',
          'Not sure if I would rush back.',
          'Fine for a casual hangout, nothing more.',
          'Some things worked, some did not.',
          'Worth trying once, though I probably will not repeat it.',
          'Average overall — it did the job.'
        ]
      },
      neg: {
        open: [
          'Had a disappointing experience at {biz} {when}.',
          'Went to {biz} {when} with high expectations and sadly it did not work out.',
          'I really wanted to like {biz}, but {when} it fell short.',
          'Gave {biz} a try {when} and left quite unhappy.',
          'Heard so much about {biz}, but my visit {when} was a letdown.',
          'My evening at {biz} {when} did not go as planned at all.',
          'Honestly, {biz} did not live up to the hype for me.',
          'Dropped by {biz} {when} and unfortunately it was a disappointment.',
          'Expected a lot from {biz} {when}, but came back underwhelmed.',
          'This was my first time at {biz} {when}, and sadly it will be my last.'
        ],
        tag: {
          'food': ['the food was really disappointing, especially given the reputation', 'the dishes we ordered lacked taste and freshness', 'the food quality felt well below average', 'what we got was nowhere close to what we expected'],
          'taste': ['the taste was simply not there', 'everything felt bland and flat', 'the flavours just did not come through'],
          'service': ['the service was extremely slow, we waited a long time', 'nobody checked on us for most of the evening', 'getting any attention from the staff was a struggle'],
          'staff': ['the staff seemed uninterested and unbothered', 'we had to keep calling them just to get basic things'],
          'ambience': ['the place felt chaotic, noisy and uncomfortable', 'the ambience was nowhere close to the photos', 'it was too crowded to even enjoy sitting there'],
          'cleanliness': ['hygiene was clearly not a priority here', 'the tables and washrooms were not properly maintained', 'it did not feel clean at all'],
          'value for money': ['it felt overpriced for the quality we received', 'we paid a lot and got very little in return', 'the bill definitely did not match the experience'],
          'drinks': ['the drinks were a letdown too', 'even the basic beverages were average at best'],
          'rooftop': ['the rooftop was overcrowded and we could not enjoy it', 'the rooftop experience completely fell flat'],
          'music': ['the music was so loud that we could not even talk to each other', 'the music was completely off for the vibe'],
          'overall experience': ['overall, the visit was a big disappointment', 'overall, it really did not meet expectations', 'overall, I left with a bad impression']
        },
        item: [
          'The {item} we ordered was a letdown too',
          'Even the {item} could not save the evening',
          'The {item} was nowhere close to what we expected'
        ],
        close: [
          'I hope the management looks into these issues.',
          'Probably will not be visiting again anytime soon.',
          'A lot of things need improvement.',
          'Definitely not what I expected.',
          'Would only go back if things change completely.',
          'Really disappointing, to be honest.',
          'Felt like the whole trip was a waste.',
          'Left with no reason to come back.'
        ]
      }
    },

    hi: {
      pos: {
        open: [
          '{when} {biz} aaya tha, bahut accha laga.',
          '{when} doston ke saath {biz} gaya, maza aa gaya.',
          '{biz} ab mera favourite spot ban raha hai.',
          'Weekend pe {biz} time spend kiya, really good experience.',
          'Pehli baar {biz} aaya, accha experience raha.',
          '{when} {biz} par dinner kiya, bahut accha tha.',
          '{loc} mein ho toh {biz} zaroor try karna.',
          '{when} doston ko le gaya {biz}, sabko maza aaya.',
          'Raat ko {biz} ghoomne nikle, ekdum sahi jagah mili.',
          '{when} thoda chance deke {biz} aaya, bilkul sahi decision tha.'
        ],
        tag: {
          'food': ['khana bahut accha tha', 'food ka quality mast thi', 'jo order kiya sab tasty tha', 'khane ka swaad hi alag tha'],
          'taste': ['taste ekdum mast tha', 'har dish ka taste accha tha', 'khana fresh aur accha bana hua tha'],
          'service': ['service bahut fast thi', 'staff ne accha treat kiya', 'service bilkul smooth rahi'],
          'staff': ['staff bahut polite tha', 'sab log smile ke saath serve kar rahe the', 'staff ne kaafi help ki'],
          'ambience': ['ambience bahut accha tha', 'andar ka vibe kaafi calm tha', 'seating aur lighting comfortable thi'],
          'cleanliness': ['jagah bilkul saaf suthri thi', 'cleanliness ka dhyan acche se rakha tha'],
          'value for money': ['paisa vasool tha', 'quality ke hisaab se price sahi hai', 'itna accha experience itne price mein'],
          'drinks': ['drinks kaafi refresh karne wale the', 'cold coffee mast thi', 'shakes bhi kaafi acche the'],
          'rooftop': ['rooftop par baith kar maza aa gaya', 'open sky ke neeche ka vibe hi alag tha', 'rooftop seating best thi'],
          'music': ['music bhi accha chal raha tha', 'volume sahi tha, disturb nahi karta tha', 'gaane acche lage'],
          'overall experience': ['overall experience bahut accha raha', 'poora evening mast gaya', 'overall sab kuch accha tha']
        },
        close: [
          'Pakka vapas aaunga.',
          'Agli baar bhi yahin plan hoga.',
          'Doston ko bhi bataunga, sahi jagah hai.',
          'Raat ke liye ekdum perfect jagah hai.',
          'Already next visit soch raha hoon.',
          'Aap bhi try karo, pachtoge nahi.',
          'Bina sooche aao, accha hi lagega.'
        ]
      },
      mid: {
        open: [
          '{when} {biz} gaya tha, theek tha.',
          'Pehli baar {biz} try kiya, average experience.',
          'Doston ke saath {biz} {when} ghumne gaya, kuch accha kuch average.',
          '{biz} ke baare mein suna tha {when}, place theek thak nikli.',
          'Ek casual evening {biz} par bitai {when}, khaas nahi.',
          '{when} {biz} chala gaya, theek thak raha.',
          'Weekend pe {biz} try kiya, theek thak hi tha.',
          '{biz} ka naam suna tha, experiment karne gaya, fine hi raha.',
          'Timepass ke liye {biz} chala gaya, theek hi tha.'
        ],
        tag: {
          'food': ['khana theek tha, kuch zyada nahi', 'kuch dishes acchi thi, kuch average', 'khana thoda kam accha laga', 'khana theek thak tha, zyada kuch nahi'],
          'taste': ['taste theek tha par khaas nahi', 'swaad thoda flat laga', 'taste thoda average laga'],
          'service': ['service theek thak thi', 'thoda wait karwaya par staff polite tha'],
          'staff': ['staff theek tha, thoda dhyan kam tha'],
          'ambience': ['ambience theek tha', 'vibe casual thi'],
          'cleanliness': ['safai theek thak thi'],
          'value for money': ['price thoda zyada laga', 'value itni khaas nahi thi'],
          'drinks': ['drinks average the', 'cold coffee theek thi'],
          'rooftop': ['rooftop theek tha par bheed zyada thi'],
          'music': ['music theek tha, thoda loud tha'],
          'overall experience': ['overall theek tha', 'experience average hi raha']
        },
        close: [
          'Kabhi aur mauka mila toh phir try karunga.',
          'Paas mein ho toh chale jao, waise khaas nahi.',
          'Kuch cheezein sudhar sakti hain.',
          'Wapas jane ka man nahi hai specially.',
          'Casual hangout ke liye chalega.',
          'Umeed hai agli baar behtar ho.',
          'Overall bas timepass ho gaya.'
        ]
      },
      neg: {
        open: [
          '{when} {biz} aaya tha, disappointing experience raha.',
          '{when} {biz} ke baare mein kaafi suna tha par accha nahi laga.',
          'Kuch time pehle {biz} gaya, experience accha nahi raha.',
          'Is baar {biz} ka experience bahut kharab tha.',
          'Try kiya {biz}, par dil nahi laga.',
          '{biz} jaake maza nahi aaya, bilkul accha nahi laga.',
          'Jin baaton ke liye {biz} mashhoor hai, wo mili hi nahi.',
          'Doston ke saath {biz} gaye, sabko kharab laga.',
          '{biz} ka plan banaya tha {when}, par experience bigad gaya.',
          '{when} ummeed ke saath {biz} gaya, nirasha hi mili.',
          '{when} {biz} jaana hua, bilkul accha nahi laga.'
        ],
        tag: {
          'food': ['khana bilkul accha nahi laga', 'dishes expectations se kam nikli', 'food quality average thi', 'jo order kiya wo khaas nahi tha', 'khane ka taste hi kharab tha'],
          'taste': ['taste khaas nahi tha', 'swaad flat laga', 'taste bilkul theek nahi tha'],
          'service': ['service bahut slow thi', 'bahut der wait karwaya', 'koi dhyaan nahi de raha tha', 'order lene mein hi time lag gaya'],
          'staff': ['staff ka dhyan nahi tha', 'staff uninterested laga'],
          'ambience': ['jagah crowded aur noisy thi', 'ambience expectations se kam tha'],
          'cleanliness': ['safai thik nahi thi', 'tables saaf nahi the'],
          'value for money': ['price zyada tha quality ke hisaab se', 'paisa vasool nahi hua'],
          'drinks': ['drinks average the', 'beverages acchi nahi thi'],
          'rooftop': ['rooftop crowded tha, enjoy nahi kar paye', 'rooftop experience kharab raha'],
          'music': ['music itna loud tha ki baat nahi kar paaye', 'music mood ke hisaab se nahi tha'],
          'overall experience': ['overall experience accha nahi raha', 'overall disappointed hoon', 'overall bhi theek nahi laga', 'poora experience hi kharab laga']
        },
        close: [
          'Ummeed hai management is par dhyan dega.',
          'Jaldi hi vapas aane wala nahi.',
          'Kaafi cheezein sudharne ki zaroorat hai.',
          'Ye expect nahi kiya tha.',
          'Tabhi wapas jaunga jab cheezein badlengi.',
          'Aisi jagah dobara jane ka man nahi karta.',
          'Bina sooche hi chale gaye the, galti ho gayi.'
        ]
      }
    },

    gu: {
      pos: {
        open: [
          '{when} {biz} aavya hata, bahu sari experience hati.',
          '{when} mitro sathe {biz} gaye, maja avi gaya.',
          '{biz} have maro favourite spot banava chalu thayu.',
          'Weekend ma {biz} time spend karyo, ekdum sari jagah.',
          'Pahela divas {biz} aavyo, saro lage. Avvu jai shesh na aave.',
          '{when} {biz} dinner karyu, bahu mast hatu.',
          '{loc} ma ho to {biz} jaroor try karo.',
          '{when} mitro ne le jaine {biz} aavyo, badha ne maja aavyo.',
          'Raat ma {biz} ghumava nikla, ekdum sari jagah mali.',
          '{when} thodu chance lai ne {biz} aavyo, ekdum saro decision hatu.'
        ],
        tag: {
          'food': ['khauvan bahu sari hati', 'food quality ekdum mast hati', 'je order karyu badhu tasty hatu', 'khauvan no swaad j alag hatu'],
          'taste': ['taste ekdum mast hatu', 'bandhi dish no taste saro hatu', 'khauvan fresh ane saru banelu hatu'],
          'service': ['service bahu fast hati', 'staff e sari rite serve karyu', 'service ekdum smooth hati'],
          'staff': ['staff bahu polite hatu', 'badha smile sathe serve karta hata', 'staff e bahu madad kari'],
          'ambience': ['ambience bahu saro hatu', 'andar no vibe calm hatu', 'seating ane lighting comfortable hati'],
          'cleanliness': ['jagah bilkul saaf suthri hati', 'cleanliness no dhyan sari rite rakhya'],
          'value for money': ['paisa vasool hatu', 'quality ne saru price che', 'aano saro experience ana price ma'],
          'drinks': ['drinks bahu refresh karavta hata', 'cold coffee mast hati', 'shakes pan kaafi sara hata'],
          'rooftop': ['rooftop par bethine maja aavyo', 'open sky niche no vibe j alag hatu', 'rooftop seating best hati'],
          'music': ['music pan saro chalatu hatu', 'volume saro hatu, disturb nathi karato', 'gana sara lagya'],
          'overall experience': ['overall experience bahu saro rahyo', 'aati rat ekdum mast gai', 'overall badhu saro hatu']
        },
        close: [
          'Pakki vapas aavish.',
          'Aagli var pan ahin j plan hase.',
          'Mitro ne pan kahi devish, sari jagah che.',
          'Raat mate ekdum perfect jagah che.',
          'Already next visit vapar thi rahyo chhu.',
          'Tame pan try karo, pachhtasho nahi.',
          'Vicar na karo, saru j lageshe.'
        ]
      },
      mid: {
        open: [
          'Aaje kal {biz} avyo hato, theek hati.',
          'Pahela var {biz} try karyu, average experience rahyo.',
          'Mitro sathe {biz} {when} gaya, kai sari kai average.',
          '{when} {biz} vishay ma sanu hato, jagah theek thak nikli.',
          'Casual evening {biz} par bitadi {when}, khaas nathi.',
          '{when} {biz} aavyo to hoy pan khaas kai nathi lagyu.',
          'Weekend ma {biz} try karyu, theek thak j rahyu.',
          '{when} {biz} no naam sanu hato, experiment mate gayo, fine j rahyu.'
        ],
        tag: {
          'food': ['khauvan theek hatu, khaas nathi', 'kai dishes sari hati, kai average', 'khauvan thodu kam saro lagyu'],
          'taste': ['taste theek hatu pan khaas nahi', 'swaad thodu flat lagyu'],
          'service': ['service theek thak hati', 'thodu wait karavyu pan staff polite hatu'],
          'staff': ['staff theek hatu, dhyaan thodu kam hatu'],
          'ambience': ['ambience theek hatu', 'vibe casual hati'],
          'cleanliness': ['safai theek thak hati'],
          'value for money': ['price thodu vadhu lagyu', 'value etli khaas nahi hati'],
          'drinks': ['drinks average hata', 'cold coffee theek hati'],
          'rooftop': ['rooftop theek hatu pan bheed vadhu hati'],
          'music': ['music theek hatu, thodu loud hatu'],
          'overall experience': ['overall theek hatu', 'experience average j rahyo']
        },
        close: [
          'Biji var mauka male to pan try karish.',
          'Nadarni hoy to jao, nahi to khaas nathi.',
          'Kai cheezo sudharvi joi e.',
          'Vapas javani khasi ichha nathi.',
          'Casual hangout mate chalase.',
          'Aasha che ke aagli var sari rite thay.'
        ]
      },
      neg: {
        open: [
          '{when} {biz} aavyo, disappointing experience rahyo.',
          '{when} {biz} vishay ma bahu sanu hatu pan sari lagyu nahi.',
          'Thoda time pehla {biz} gayo, experience saro nahi rahyo.',
          'Aa var {biz} no experience bahu kharab hatu.',
          'Try karyu {biz}, pan dil nahi lagyu.',
          '{when} {biz} jaine maja nahi aavyo, bilkul sari lagyu nahi.',
          'Je badi vat {biz} mate sanu hatu, te mali j nahi.',
          'Mitro sathe {biz} gaya, badha ne kharab lagyu.',
          '{when} {biz} no plan banavyo hato, pan experience badavyo j.',
          '{when} aasha sathe {biz} aavyo, nirasha j mali.',
          '{when} {biz} javu thayu, bilkul sari lagyu nahi.'
        ],
        tag: {
          'food': ['khauvan bilkul sari nahi lagyu', 'dishes expectations thi niche nikli', 'food quality average hati', 'je order karyu te khaas nahi hatu'],
          'taste': ['taste khaas nahi hatu', 'swaad flat lagyu'],
          'service': ['service bahu slow hati', 'bahu var wait karavyu', 'koi dhyaan aapatu n hati', 'order levama j der laga di'],
          'staff': ['staff no dhyaan nahi hatu', 'staff uninterested lagyo'],
          'ambience': ['jagah crowded ane noisy hati', 'ambience expectations thi kam hatu'],
          'cleanliness': ['safai thik nahi hati', 'tables saaf n hati'],
          'value for money': ['price vadho hatu quality ne saru', 'paisa vasool nahi thayu'],
          'drinks': ['drinks average hata', 'beverages sari nahi hati'],
          'rooftop': ['rooftop crowded hatu, enjoy nahi karaya', 'rooftop experience kharab rahyo'],
          'music': ['music etlu loud hatu ke vaat pan na thai', 'music mood mujab nahi hatu'],
          'overall experience': ['overall experience saro nahi rahyo', 'overall disappointed chhu', 'overall pan theek nahi lagyu']
        },
        close: [
          'Aasha che ke management aana par dhyaan aapse.',
          'Jaldij vapas aavavani possible nathi.',
          'Bahu cheezo sudharvani jaroor che.',
          'Aa expect nahi karyu hatu.',
          'Tyaare j vapas avish jyare cheezo badla she.',
          'Aevi jagah biji var javani ichha nathi.',
          'Vicar ne j aavya hata, galti thai.'
        ]
      }
    },

    hg: {
      pos: {
        open: [
          'Sach bataun to {when} {biz} jaane ka mann bana aur experience ekdum zabardast raha.',
          '{when} doston ke saath {biz} gaye, sabko itna maza aaya ki wapas jaana zaroori ho gaya.',
          '{biz} ab {loc} me mera sabse favourite spot ban gaya hai.',
          'Pahli baar {biz} aaya {when} aur yaqeen maano, ab ruk nahi sakta.',
          'Random pe {biz} enter hue, lekin jo mila wo expected se kaafi zyada accha tha.',
          'Bahut din se sun rahe the {biz} ke baare me, {when} finally try kiya — shabd nahi hain.',
          'Dinner ka plan bana tha, kisi ne {biz} suggest kiya aur kya plan tha wo.',
          '{when} {biz} pe evening bitai aur honestly, waqt kaise beeta pata hi nahi chala.',
          'Family ke saath {biz} gaya {when}, sab log khush hoke aaye, bas yahi kaafi hai.',
          'Kaam ke baad {biz} aaya, ekdum relaxed feel hua — aisi jagah hi chahiye thi.'
        ],
        tag: {
          'food': ['khana ekdum swadisht tha, ek ek dish ka taste perfect tha', 'jo bhi order kiya sab fresh aur accha bana hua mila', 'food ka quality {loc} ke best cafes jaisa hi tha', 'ek dish khatam hoti thi toh dusri order karne ka mann karta tha'],
          'taste': ['har cheez ka flavour bilkul sahi tha, koi kami nahi', 'taste ekdum on point tha, baad me bhi yaad raha', 'khana aise bana tha jaise ghar me shauk se banate hain'],
          'service': ['service kaafi fast thi aur staff bhi genuinely friendly tha', 'bheed hone ke baad bhi service smooth rahi', 'staff ne apne aap dhyan rakha, bina hum bolne ke'],
          'staff': ['staff ne itna accha treat kiya ki mann kar gaya', 'har koi muskura ke baat kar raha tha, bahut accha laga', 'first time aaye the phir bhi regular jaisa behave kiya'],
          'ambience': ['ambience itna accha tha ki waqt bhool gaye', 'seating, lighting, sab kuch perfect tha', 'andar aate hi ekdum relaxing feel hua'],
          'cleanliness': ['jagah bilkul saaf sutri thi, table se leke washroom tak', 'hygiene ka dhyan kaafi acche se rakha gaya tha', 'poora time clean aur well-kept laga'],
          'value for money': ['price dekh ke laga quality ke hisaab se bilkul fair hai', 'accha khaya aur bill bhi reasonable raha', 'har rupaya vasool tha, bina kisi shak ke'],
          'drinks': ['cold coffee toh try karna hi chahiye, ekdum perfect thi', 'shakes thick aur creamy the, maza aa gaya', 'drinks kaafi acchi bani hui thi'],
          'rooftop': ['rooftop pe baith ke open sky ke neeche evening bitana — kya baat hai', 'rooftop ka view raat ko ekdum alag hi level ka tha', 'rooftop seating hi poori evening ka highlight thi'],
          'music': ['music bilkul sahi volume pe tha, mood set ho gaya', 'playlist ekdum acchi thi, gaane mann ke sahi the', 'music sunte sunte time hi nahi laga'],
          'overall experience': ['overall, aisi evening jo yaad reh jaye', 'poora experience ekdum sahi se combine hua', 'overall, jo socha tha usse kaafi zyada accha mila']
        },
        item: [
          '{item} toh order karna hi chahiye, ekdum zabardast bana ke aaya',
          'Humne {item} try kiya aur wo ekdum perfect nikla',
          '{item} ke bina wapas jaana hi adhura lagega',
          'Agar jao toh {item} miss mat karna',
          '{item} ki quality dekh ke hi pata chal gaya kitna serious hain'
        ],
        close: [
          'Pakka wapas aaunga, isme koi shak nahi.',
          'Agli visit ka plan already bana liya hai.',
          'Agar {loc} me ho toh ye jagah miss mat karna.',
          'Ye jagah har positive review ki haqdar hai.',
          'Family ho ya friends, dono ke saath badhiya lagega.',
          'Itni acchi evening kaafi din baad mili thi.',
          'Ab aur logo ko bhi yahan le kar aana hai.',
          'Koi complaint nahi — ekdum accha experience tha.'
        ]
      },
      mid: {
        open: [
          '{when} {biz} visit kiya — theek tha, lekin thoda aur expect kiya tha.',
          '{biz} try kiya {when}, honestly mixed experience raha.',
          '{when} {biz} chale gaye kyunki paas the, overall theek thak hi tha.',
          '{biz} ke baare me accha suna tha, {when} check kiya — decent hi nikla.',
          '{when} {biz} pe jaana hua, na koi buri baat na koi badi acchi.',
          'Sach bataun toh {biz} {when} itna khaas nahi laga, par bura bhi nahi.',
          '{biz} {when} dekh ke aaya, "theek thak hi hai" wali feeling thi.',
          'Mera {biz} ka visit {when} theek raha, par jaldi wapas jaane ka mann nahi.'
        ],
        tag: {
          'food': ['khana theek tha, par utna khaas nahi tha jitna socha tha', 'kuch dishes acchi thi, kuch bilkul average', 'khana chal gaya, par dobara crave nahi hoga'],
          'taste': ['taste theek tha, lekin yaad rehne wala nahi', 'flavour sahi tha, bas kuch alag nahi laga', 'dishes taste me acceptable thi, na acchi na buri'],
          'service': ['service polite thi par thodi slow', 'thoda wait karna pada, staff courteous zaroor tha', 'service average thi — koi kami nahi, koi khushi nahi'],
          'staff': ['staff theek tha, par utna attentive nahi tha', 'polite the, bas extra kuch nahi kiya'],
          'ambience': ['ambience casual visit ke liye theek tha', 'jagah saaf dikhi, par kuch special nahi', 'vibe theek thak thi'],
          'cleanliness': ['safai average thi', 'jagah saaf sutri hi dikhi'],
          'value for money': ['price thoda zyada laga jo mila uske hisaab se', 'value for money theek thi, par kuch khaas nahi', 'aise hi aur jagah pe better value milti hai'],
          'drinks': ['drinks average the', 'cold coffee theek thi, kuch special nahi'],
          'rooftop': ['rooftop theek tha, lekin thoda crowded ho gaya tha', 'rooftop seating decent thi par khaas nahi'],
          'music': ['music theek tha, kabhi kabhi thoda loud', 'playlist mixed thi, kuch gaane acche kuch average'],
          'overall experience': ['overall experience average hi raha', 'overall, na accha na bura — beech ka hi tha', 'overall kuch khaas feel nahi hua']
        },
        item: [
          '{item} theek tha, par kuch zyada khaas nahi',
          '{item} try kiya, chalta phirta hi tha',
          '{item} aisa hi tha — na accha na bura'
        ],
        close: [
          'Shayad kabhi aur mauka mile toh phir try karunga.',
          'Paas ho toh theek hai, special trip worth nahi hai.',
          'Kuch cheezein improve ho sakti hain, par bura bhi nahi hai.',
          'Wapas jaldi aane ka mann nahi hai.',
          'Casual hangout ke liye theek hai, bas.',
          'Kuch cheezein acchi thi, kuch nahi.',
          'Ek baar try kar sakte ho, par repeat karne ka mann nahi.',
          'Average hi tha — kaam ban gaya.'
        ]
      },
      neg: {
        open: [
          '{when} {biz} ka experience kaafi disappointing raha.',
          'Bahut umeed ke saath {biz} gaya {when}, lekin afsos, wo puri nahi hui.',
          'Mujhe sach me {biz} pasand aana tha, lekin {when} kaafi khaali laga.',
          '{biz} try kiya {when} aur dil dukha ke aaya.',
          'Itna suna tha {biz} ke baare me, par mera visit {when} letdown raha.',
          '{when} {biz} pe shaam bitai, par plan ke hisaab se kuch nahi hua.',
          'Honestly, {biz} ka hype mujhe samajh nahi aaya.',
          '{when} {biz} gaya aur unfortunately bahut nirash hua.',
          '{biz} se kaafi expect kiya tha {when}, lekin underwhelmed aaya.',
          '{biz} pe {when} pehli aur aakhri baar gaya.'
        ],
        tag: {
          'food': ['khana kaafi disappointing tha, reputation ke hisaab se bilkul nahi', 'jo dishes order ki wo taste aur freshness dono me kami thi', 'food quality average se bhi neeche thi', 'jo mila wo expect kiye hue se bilkul alag tha'],
          'taste': ['taste hi nahi tha khane me', 'sab kuch bland aur flat laga', 'flavours sahi se aa hi nahi rahe the'],
          'service': ['service bahut slow thi, kaafi der wait karna pada', 'poori shaam kisi ne dhyaan nahi diya', 'staff ka attention paana hi mushkil tha'],
          'staff': ['staff bilkul uninterested laga', 'basic cheezein bhi maangni padti thi'],
          'ambience': ['jagah kaafi chaotic aur noisy thi', 'ambience photos jaisa bilkul nahi tha', 'itna crowded tha ki baith ke maza hi nahi aaya'],
          'cleanliness': ['hygiene yahan priority nahi lagti thi', 'tables aur washrooms sahi se saaf nahi the', 'jagah saaf bilkul nahi lag rahi thi'],
          'value for money': ['jo quality mili uske hisaab se price kaafi zyada tha', 'itna paisa de ke itna kam mila', 'bill aur experience ka koi rishta nahi tha'],
          'drinks': ['drinks bhi letdown thi', 'basic beverages bhi average se upar nahi thi'],
          'rooftop': ['rooftop itna crowded tha ki enjoy nahi kar paye', 'rooftop experience bilkul flat raha'],
          'music': ['music itna loud tha ki ek dusre se baat nahi ho pa rahi thi', 'music vibe ke bilkul hisaab se nahi tha'],
          'overall experience': ['overall, visit ek badi nirasha thi', 'overall, expectations bilkul poori nahi hui', 'overall, dil me bura impression leke aaya']
        },
        item: [
          '{item} bhi letdown hi raha',
          '{item} se bhi koi ummeed nahi rahi',
          'Order kiya {item}, wo bhi sahi nahi aaya'
        ],
        close: [
          'Umeed hai management in cheezo par dhyan dega.',
          'Jaldi wapas aane ka sawaal hi nahi.',
          'Bahut si cheezein sudharne ki zaroorat hai.',
          'Bilkul waisa nahi tha jaisa expect kiya tha.',
          'Sirf tab wapas aaunga jab sab kuch badal jaye.',
          'Sach bataun toh kaafi nirash kiya.',
          'Poora trip hi waste lag raha tha.',
          'Wapas aane ki koi wajah nahi mili.'
        ]
      }
    }
  };

  var EMOJI = { en: ['😊', '👍', '🔥', '☕', '🌙', '⭐'], hi: ['😊', '👍', '🔥', '☕', '🌙'], gu: ['😊', '👍', '🔥', '☕', '🌙'], hg: ['😊', '👍', '🔥', '☕', '🌙'] };
  var EMOJI_MID = { en: ['🙂', '🤔', '😌', '☕', '⭐'], hi: ['🙂', '🤔', '😌', '☕', '⭐'], gu: ['🙂', '🤔', '😌', '☕', '⭐'], hg: ['🙂', '🤔', '😌', '☕', '⭐'] };
  var EMOJI_NEG = { en: ['🙏', '😕', '💭', '🍽️'], hi: ['🙏', '😕', '💭', '🍽️'], gu: ['🙏', '😕', '💭', '🍽️'], hg: ['🙏', '😕', '💭', '🍽️'] };

  var WHEN = {
    en: ['today', 'last night', 'this weekend', 'yesterday', 'a couple of days back', 'a few days ago'],
    hi: ['aaj', 'kal raat', 'is weekend', 'kuch din pehle', 'aaj raat', 'kal shaam'],
    gu: ['aaje', 'gai rate', 'aa weekend', 'thoda din pehla', 'aaje rat', 'gai kal'],
    hg: ['aaj', 'kal raat', 'this weekend', 'kuch din pehle', 'aaj raat', 'yesterday']
  };

  var STOP = { 'i': 1, 'a': 1, 'an': 1, 'the': 1, 'it': 1, 'was': 1, 'were': 1, 'to': 1, 'of': 1, 'and': 1, 'or': 1, 'but': 1, 'at': 1, 'on': 1, 'in': 1, 'my': 1, 'me': 1, 'we': 1, 'our': 1, 'they': 1, 'that': 1, 'this': 1, 'with': 1, 'for': 1, 'is': 1, 'are': 1, 'be': 1, 'been': 1, 'have': 1, 'has': 1, 'had': 1, 'not': 1, 'no': 1, 'did': 1, 'do': 1, 'does': 1, 'will': 1, 'would': 1, 'can': 1, 'could': 1, 'should': 1, 'just': 1, 'really': 1, 'very': 1, 'quite': 1, 'too': 1, 'so': 1, 'there': 1, 'then': 1, 'than': 1, 'as': 1, 'up': 1, 'down': 1, 'out': 1, 'off': 1, 'over': 1, 'when': 1, 'where': 1, 'what': 1, 'why': 1, 'how': 1, 'by': 1, 'from': 1, 'about': 1, 'into': 1, 'after': 1, 'before': 1, 'during': 1, 'am': 1, 'being': 1, 'you': 1, 'your': 1, 'he': 1, 'she': 1, 'him': 1, 'her': 1, 'his': 1, 'their': 1, 'its': 1, 'get': 1, 'got': 1, 'make': 1, 'made': 1, 'take': 1, 'took': 1, 'come': 1, 'came': 1, 'go': 1, 'went': 1, 'see': 1, 'saw': 1, 'like': 1, 'liked': 1, 'want': 1, 'wanted': 1, 'know': 1, 'think': 1, 'things': 1, 'everything': 1, 'something': 1, 'nothing': 1, 'main': 1, 'tha': 1, 'thi': 1, 'the': 1, 'ho': 1, 'hai': 1, 'hatu': 1, 'hati': 1, 'chhe': 1, 'pan': 1, 'ane': 1, 'ke': 1, 'ki': 1, 'ka': 1, 'mein': 1, 'par': 1, 'se': 1, 'ko': 1, 'nahi': 1, 'nathi': 1, 'j': 1, 'e': 1, 'te': 1, 'to': 1, 'mujab': 1 };

  function shuffle(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function words(s) {
    return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(function (w) { return w && !STOP[w]; });
  }

  function opening(s) {
    var i = s.indexOf('.');
    return i === -1 ? s : s.slice(0, i);
  }

  function baseOpenFp(s, whens) {
    var low = opening(String(s)).toLowerCase();
    for (var i = 0; i < whens.length; i++) {
      low = low.split(whens[i].toLowerCase()).join(' ');
    }
    return words(low).join(' ');
  }

  function normBiz(s, ctx) {
    var out = String(s);
    var parts = [ctx.biz, ctx.loc];
    for (var i = 0; i < parts.length; i++) {
      if (!parts[i]) continue;
      out = out.split(parts[i]).join(' ');
      out = out.split(parts[i].toLowerCase()).join(' ');
    }
    return out.replace(/\s{2,}/g, ' ').trim();
  }

  function overlap(a, b) {
    var wa = words(a), wb = words(b);
    if (!wa.length || !wb.length) return 0;
    var set = {};
    for (var i = 0; i < wa.length; i++) set[wa[i]] = true;
    var hit = 0;
    for (var j = 0; j < wb.length; j++) if (set[wb[j]]) hit++;
    var union = {};
    var n = 0;
    wa.concat(wb).forEach(function (w) { if (!union[w]) { union[w] = 1; n++; } });
    return n ? hit / n : 0;
  }

  function tooSimilar(candidate, used, whens) {
    var thr = used.length >= 21 ? 0.62 : 0.5;
    for (var i = 0; i < used.length; i++) {
      if (candidate === used[i]) return true;
      if (baseOpenFp(candidate, whens) && baseOpenFp(candidate, whens) === baseOpenFp(used[i], whens)) return true;
      if (overlap(candidate, used[i]) > thr) return true;
    }
    return false;
  }
  function pick(rnd, arr) {
    return arr[Math.floor(rnd() * arr.length)];
  }

  function hasEmojiChar(s) {
    return /[\u{1F300}-\u{1FAFF}\u2600-\u27BF\u2B00-\u2BFF\uFE0F]/u.test(s);
  }

  function fill(tpl, ctx) {
    var out = tpl.replace(/\{biz\}/g, ctx.biz).replace(/\{loc\}/g, ctx.loc);
    if (out.indexOf('{item}') !== -1 && ctx.item) out = out.replace(/\{item\}/g, ctx.item);
    return out;
  }

  function expandOpens(raw, lang) {
    var out = [];
    var whens = shuffle(WHEN[lang] || WHEN.en, Math.random).slice(0, 5);
    raw.forEach(function (o) {
      if (o.indexOf('{when}') === -1) {
        out.push(o);
        return;
      }
      for (var i = 0; i < whens.length; i++) {
        out.push(o.replace(/\{when\}/g, whens[i]));
      }
    });
    return out;
  }

  function bucketFor(rating) {
    return rating >= 4 ? 'pos' : (rating === 3 ? 'mid' : 'neg');
  }

  function generate(ctx) {
    var lang = T[ctx.language] || T.en;
    var bkt = lang[bucketFor(ctx.rating)] || lang.pos;
    var rnd = Math.random;
    var count = ctx.count || 5;
    var tags = (ctx.tags && ctx.tags.length) ? ctx.tags.slice() : null;
    if (!tags) {
      var catKeys = Object.keys(bkt.tag || {});
      tags = shuffle(catKeys, rnd).slice(0, 1 + Math.floor(rnd() * 2));
    }
    var used = (ctx.used || []).slice();
    var usedNorm = used.map(function (u) { return normBiz(u, ctx); });
    var whens = WHEN[ctx.language] || WHEN.en;
    var usedOpen = {};
    for (var u = 0; u < usedNorm.length; u++) usedOpen[baseOpenFp(usedNorm[u], whens)] = true;

    var allOpens = shuffle(expandOpens(bkt.open, ctx.language), rnd);
    var uniqueOpens = allOpens.filter(function (o) { return !usedOpen[baseOpenFp(normBiz(fill(o, ctx), ctx), whens)]; });
    var opens = uniqueOpens.slice();
    if (opens.length < count) {
      var seen = {};
      opens.forEach(function (o) { seen[baseOpenFp(normBiz(fill(o, ctx), ctx), whens)] = true; });
      for (var oi = 0; oi < allOpens.length && opens.length < count; oi++) {
        var fp = baseOpenFp(normBiz(fill(allOpens[oi], ctx), ctx), whens);
        if (!seen[fp]) { opens.push(allOpens[oi]); seen[fp] = true; }
      }
      while (opens.length < count) {
        for (var oi2 = 0; oi2 < allOpens.length && opens.length < count; oi2++) {
          opens.push(allOpens[oi2]);
        }
      }
    }

    var closes = shuffle(bkt.close, rnd);
    var tagPool = [];
    for (var t = 0; t < tags.length; t++) {
      var key = tags[t].toLowerCase();
      var phrases = (bkt.tag && bkt.tag[key]) ? bkt.tag[key] : null;
      if (!phrases || !phrases.length) phrases = (bkt.tag['overall experience'] || []);
      if (phrases.length) tagPool.push({ key: key, phrases: shuffle(phrases, rnd) });
    }
    if (bkt.item && bkt.item.length && ctx.items && ctx.items.length) {
      tagPool.push({ key: 'item', phrases: shuffle(bkt.item, rnd) });
    }
    if (!tagPool.length) {
      tagPool.push({ key: 'overall experience', phrases: ['overall it was decent'] });
    }

    var results = [];
    for (var slot = 0; slot < count; slot++) {
      ctx.item = (ctx.items && ctx.items.length) ? pick(rnd, ctx.items) : null;
      var open = opens[slot % opens.length];
      var candidate = null;
      var attempts = [];
      for (var guard = 0; guard < 250 && !candidate; guard++) {
        var close = pick(rnd, closes);
        var nTags = 1 + Math.floor(rnd() * Math.min(2, tagPool.length));
        var picks = [];
        for (var p = 0; p < tagPool.length && picks.length < nTags; p++) {
          picks.push(pick(rnd, tagPool[p].phrases));
        }
        var text = fill(open, ctx);
        if (picks.length) text += ' ' + picks.map(function (p) { return fill(p, ctx); }).join('. ') + '.';
        text += ' ' + fill(close, ctx);
        var emoPool = ctx.rating >= 4 ? EMOJI : (ctx.rating === 3 ? EMOJI_MID : EMOJI_NEG);
        if (!hasEmojiChar(text)) text += ' ' + pick(rnd, emoPool[ctx.language] || emoPool.en);
        text = text.replace(/\s{2,}/g, ' ').trim();
        text = text.charAt(0).toUpperCase() + text.slice(1);
        if (!tooSimilar(normBiz(text, ctx), usedNorm, whens)) {
          candidate = text;
        } else {
          attempts.push(text);
        }
      }
      if (!candidate) {
        var best = null;
        var bestScore = Infinity;
        for (var a = 0; a < attempts.length; a++) {
          var mx = 0;
          for (var u2 = 0; u2 < used.length; u2++) {
            var ov = overlap(attempts[a], used[u2]);
            if (ov > mx) mx = ov;
          }
          if (mx < bestScore) { bestScore = mx; best = attempts[a]; }
        }
        candidate = best || (fill(open, ctx) + ' ' + fill(pick(rnd, tagPool[0].phrases), ctx) + ' ' + fill(pick(rnd, closes), ctx));
        var emoPool2 = ctx.rating >= 4 ? EMOJI : (ctx.rating === 3 ? EMOJI_MID : EMOJI_NEG);
        if (!hasEmojiChar(candidate)) {
          candidate += ' ' + pick(rnd, emoPool2[ctx.language] || emoPool2.en);
        }
        candidate = candidate.replace(/\s{2,}/g, ' ').trim();
        candidate = candidate.charAt(0).toUpperCase() + candidate.slice(1);
      }
      results.push(candidate);
      used.push(candidate);
      usedOpen[baseOpenFp(candidate, whens)] = true;
    }
    return results;
  }

  return {
    generate: generate,
    languageName: {
      en: 'English', hi: 'Hindi', gu: 'Gujarati', hg: 'Hinglish'
    }
  };
})();
