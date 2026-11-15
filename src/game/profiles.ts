const lolaAvatar = "/images/lolaavatarka.jpg";
const viktorAvatar = "/images/viktoravatarka.jpg";
const lolaStudio = "/images/lola-studio.jpg";
const lolaVases = "/images/lola-vases.jpg";
const lolaMugs = "/images/lola-mugs.jpg";
const perfumeImg = "/images/perfume.jpg";
const fishImg = "/images/fish.jpg";

export const LOLA_AVATAR = lolaAvatar;
export const VIKTOR_AVATAR = viktorAvatar;
export const KRISTINA_AVATAR = "/images/kristinaavatarka.jpg";
export const YANA_AVATAR = "/images/ianaavatarka.jpg";
export const LENYA_AVATAR = "/images/leonidavatarka.jpg";
export const LOLA_STUDIO = lolaStudio;

export interface ChatMessage {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
  date?: string;
  image?: string;
}

export interface Dialog {
  id: string;
  name: string;
  initials: string;
  color: string;
  online: boolean;
  lastOnline?: string;
  time: string;
  unread?: number;
  typing?: boolean;
  pinned?: boolean;
  messages: ChatMessage[];
}

export interface WallPost {
  id: string;
  text: string;
  time: string;
  likes: number;
  comments: number;
  reposts: number;
  views: string;
  image?: string;
  pinned?: boolean;
}

export interface Friend {
  name: string;
  desc: string;
  initials: string;
  color: string;
  online: boolean;
}

export interface ProfileData {
  id: "lola" | "viktor" | "kristina" | "yana" | "lenya";
  firstName: string;
  lastName: string;
  status: string;
  onlineText: string;
  city: string;
  birthday: string;
  work: string;
  education: string;
  avatar: string;
  coverFrom: string;
  coverTo: string;
  coverEmoji: string;
  followers: string;
  photosCount: number;
  friendsCount: number;
  about: string[];
  posts: WallPost[];
  dialogs: Dialog[];
  friends: Friend[];
  photos: { src: string }[];
}

export const LOLA_PROFILE: ProfileData = {
  id: "lola",
  firstName: "Лола",
  lastName: "Миронова",
  status: "лепится счастье из глины 🕊️ мастерская керамики",
  onlineText: "online",
  city: "Москва",
  birthday: "14 марта 1999",
  work: "Мастерская керамики «ГЛИНА»",
  education: "МГХПА им. Строганова '21",
  avatar: lolaAvatar,
  coverFrom: "#a855f7",
  coverTo: "#ec4899",
  coverEmoji: "🏺",
  followers: "4 218",
  photosCount: 4,
  friendsCount: 312,
  about: [
    "Керамист. Делаю вазы и посуду вручную.",
    "Мастерская работает каждый день 🤍",
  ],
  posts: [
    {
      id: "l1",
      pinned: true,
      text: "Друзья! Приглашаю в нашу мастерскую «ГЛИНА» 🏺\n\nНовая серия ваз в тёплом беже с крапинками уже после обжига. Приходите обниматься, пить какао из новых кружек и забирать тепло с собой.\n\nПишите в личку, кто хочет зайти в гости 🤍",
      time: "5 мар в 19:42",
      likes: 342,
      comments: 58,
      reposts: 21,
      views: "12К",
      image: lolaStudio,
    },
    {
      id: "l2",
      text: "Новая коллекция «Песок и молоко» уже на полках ✨\n\nМолочный обжиг, крапинки шамота, ничего лишнего. Делаю новую партию ваз — хочется выйти на сотрудничество с магазинами 🙏",
      time: "28 фев в 14:07",
      likes: 218,
      comments: 34,
      reposts: 9,
      views: "8,1К",
      image: lolaVases,
    },
    {
      id: "l3",
      text: "Иногда глина слушается. Иногда — нет.\nСегодня — слушалась.\n\nСвежие кружки только достала из печи 🤍",
      time: "19 фев в 21:15",
      likes: 196,
      comments: 22,
      reposts: 4,
      views: "6,4К",
      image: lolaMugs,
    },
  ],
  dialogs: [
    {
      id: "d-mama",
      name: "Мама",
      initials: "М",
      color: "#ec4899",
      online: true,
      time: "14.03",
      messages: [
        {
          id: "m1",
          date: "04.03.2026",
          fromMe: false,
          text: "Привет, дочь. Как твои дела? Со своей работой совсем забыла про меня",
          time: "11:20",
        },
        {
          id: "m2",
          fromMe: true,
          text: "Все хорошо, заказов мало, но я каждый день в мастерской. Делаю вазы, хочу сотрудничать с магазином",
          time: "11:45",
        },
        {
          id: "m3",
          fromMe: false,
          text: "Когда к нам приедешь?",
          time: "11:48",
        },
        {
          id: "m4",
          fromMe: true,
          text: "Хотела на 8 марта",
          time: "12:02",
        },
        {
          id: "m5",
          date: "12.03.2026",
          fromMe: false,
          text: "Лола, купила Яне вот эти духи. Как думаешь, она оценит?",
          image: perfumeImg,
          time: "16:15",
        },
        {
          id: "m6",
          fromMe: true,
          text: "Да, такие ей нравятся",
          time: "16:32",
        },
        {
          id: "m7",
          date: "14.03.2026",
          fromMe: true,
          text: "Мам, Кристина пропала. Ее нигде нет, вчера с вечеринки ушла и с тех пор никто не может дозвониться до нее.\nДумаю, это я виновата. Она писала мне смс, чтобы я ее встретила. Но я не увидела сообщение. Возможно, сейчас Крис была бы со мной и ничего не произошло бы.",
          time: "11:08",
        },
        {
          id: "m8",
          fromMe: false,
          text: "Котенок, не вини себя, ты ничего не можешь изменить. Очень надеюсь, что с Кристиной все в порядке и скоро найдется",
          time: "11:14",
        },
      ],
    },
    {
      id: "d-papa",
      name: "Папа",
      initials: "П",
      color: "#6d28d9",
      online: false,
      lastOnline: "был вчера",
      time: "05.03",
      messages: [
        {
          id: "p1",
          date: "16.02.2026",
          fromMe: true,
          text: "Привет, пап. Можешь прислать 3000 на карту? В среду верну наличкой",
          time: "14:10",
        },
        {
          id: "p2",
          fromMe: false,
          text: "Без проблем, сейчас скину",
          time: "14:15",
        },
        {
          id: "p3",
          date: "01.03.2026",
          fromMe: false,
          text: "Чего не берешь трубку? Три раза звонил",
          time: "19:40",
        },
        {
          id: "p4",
          date: "05.03.2026",
          fromMe: false,
          text: "Смотри какую рыбу поймал",
          image: fishImg,
          time: "15:22",
        },
        {
          id: "p5",
          fromMe: true,
          text: "Класс!",
          time: "15:40",
        },
      ],
    },
    {
      id: "d-kristina",
      name: "Кристина",
      initials: "К",
      color: "#8b5cf6",
      online: false,
      lastOnline: "была в сети 13 марта",
      time: "14:34",
      messages: [
        {
          id: "k1",
          date: "02.02.2026",
          fromMe: false,
          text: "Приветик! Создала тг канал, подписывайся t.me/kris_blog_life",
          time: "18:05",
        },
        {
          id: "k2",
          fromMe: true,
          text: "ок, че не в тг прислала, мы же давно уже в пульс не общались 😂",
          time: "18:19",
        },
        {
          id: "k3",
          date: "08.03.2026",
          fromMe: true,
          text: "Привет! Ты там не забыла про субботу? Сестра уже список треков на вечеринку собирает 😂",
          time: "14:12",
        },
        {
          id: "k4",
          fromMe: false,
          text: "Привет, конечно помню) Я как раз думаю про подарок. Она же хотела тот набор для ухода или сертификат в косметику?",
          time: "14:14",
        },
        {
          id: "k5",
          fromMe: true,
          text: "Даа, от сертификата она вообще в восторге будет. Я ей от себя беспроводные наушники взяла, а то свои опять потеряла",
          time: "14:15",
        },
        {
          id: "k6",
          fromMe: false,
          text: "О, идеально, тогда возьму сертификат и красивый букет. Кстати, во сколько собираемся?",
          time: "14:16",
        },
        {
          id: "k7",
          fromMe: true,
          text: "К семи вечера у неё на квартире, будет человек десять, чисто свои — музыка и пицца. Ты в чём пойдёшь? Я вообще не могу определиться",
          time: "14:18",
        },
        {
          id: "k8",
          fromMe: false,
          text: "Думала надеть чёрное платье миди и ботильоны, но не знаю, не слишком ли нарядно для дома?",
          time: "14:20",
        },
        {
          id: "k9",
          fromMe: true,
          text: "Не, самое то, она сама просила «красиво, но без официоза». Я тогда тоже в платье пойду, а то вечно в джинсах",
          time: "14:21",
        },
        {
          id: "k10",
          fromMe: false,
          text: "Договорились) Слушай, мне тут надо тебе кое-что рассказать",
          time: "14:24",
        },
        {
          id: "k11",
          fromMe: true,
          text: "Так, интрига 👀 Что случилось?",
          time: "14:24",
        },
        {
          id: "k12",
          fromMe: false,
          text: "Мне снова писал Лёня. Вдруг он хочет возобновить отношения?",
          time: "14:26",
        },
        {
          id: "k13",
          fromMe: true,
          text: "Господи, опять он 😅 Это пройденный этап, забей на него",
          time: "14:27",
        },
        {
          id: "k14",
          fromMe: false,
          text: "Да я понимаю, сама не знаю, зачем он вообще снова пишет. Ладно, отвечу ему сухо и закрою тему",
          time: "14:29",
        },
        {
          id: "k15",
          fromMe: true,
          text: "Лучше скажи — торт заказываем с малиной или шоколадный? Нам с сестрой надо до вечера выбрать",
          time: "14:30",
        },
        {
          id: "k16",
          fromMe: false,
          text: "Однозначно с малиной! Я в прошлый раз пробовала, он бомба",
          time: "14:32",
        },
        {
          id: "k17",
          fromMe: true,
          text: "Записала 🙌 Всё, побежала забирать заказ, вечером спишемся!",
          time: "14:33",
        },
        {
          id: "k18",
          fromMe: false,
          text: "Давай, целую ❤️",
          time: "14:34",
        },
      ],
    },
    {
      id: "d-andrey",
      name: "Заказчик (Андрей)",
      initials: "А",
      color: "#10b981",
      online: false,
      lastOnline: "был 14 марта",
      time: "14:25",
      messages: [
        {
          id: "a1",
          date: "10 марта",
          fromMe: false,
          text: "Здравствуйте, Лола! Очень нравятся ваши работы. Хочу заказать вазу в подарок жене, нужна 14 марта к 9 утра — успеем?",
          time: "12:10",
        },
        {
          id: "a2",
          fromMe: true,
          text: "Здравствуйте, Андрей! Как раз есть подходящая высокая ваза в тёплом беже с крапинками — осталась только глазуровка и финальный обжиг. К 9 утра 14-го точно будет готова 😊 Стоит 4 000 ₽.",
          time: "12:14",
        },
        {
          id: "a3",
          fromMe: false,
          text: "Отлично, берём! Предоплата нужна?",
          time: "12:17",
        },
        {
          id: "a4",
          fromMe: true,
          text: "Да, 2 000 ₽ по номеру телефона, остаток при встрече. Записала вас на 14 марта в 9:00.",
          time: "12:19",
        },
        {
          id: "a5",
          fromMe: false,
          text: "Перевёл. До встречи 14-го!",
          time: "12:22",
        },
        {
          id: "a6",
          date: "14 марта",
          fromMe: true,
          text: "Андрей, доброе утро. Простите пожалуйста, у меня случился непредвиденный форс-мажор — я сейчас никак не успею выдать заказ в 9:00 😔",
          time: "08:38",
        },
        {
          id: "a7",
          fromMe: false,
          text: "Лола, здравствуйте. Эх, а я уже собирался выезжать… Сильно задержитесь? Мне сегодня вечером жене дарить.",
          time: "08:45",
        },
        {
          id: "a8",
          fromMe: true,
          text: "Ещё раз очень извиняюсь, что так подвела. Ваза полностью готова и уже упакована. Смогу отдать чуть позже — давайте в 14:00, или могу сама подвезти к вам по адресу?",
          time: "08:52",
        },
        {
          id: "a9",
          fromMe: false,
          text: "Давайте в 14:00, я после обеда как раз освобожусь и заскочу сам. Всё в порядке у вас?",
          time: "08:56",
        },
        {
          id: "a10",
          fromMe: true,
          text: "Да, спасибо, сейчас разберусь с делами и к двум точно буду. До встречи.",
          time: "09:03",
        },
        {
          id: "a11",
          fromMe: false,
          text: "Лола, спасибо за вазу! Вживую ещё красивее, чем на фото, жена точно будет в восторге. Вторую часть перевёл.",
          time: "14:18",
        },
        {
          id: "a12",
          fromMe: true,
          text: "Спасибо вам, Андрей, и ещё раз извините за утреннюю накладку! Пусть радует вашу жену 🌿",
          time: "14:25",
        },
      ],
    },
    {
      id: "d-leonid",
      name: "Леонид (аренда)",
      initials: "Л",
      color: "#475569",
      online: false,
      lastOnline: "был(а) недавно",
      time: "13:30",
      messages: [
        {
          id: "le1",
          date: "25 января",
          fromMe: true,
          text: "Леонид, добрый день! Показания за январь:\nсвет — 04318\nвода — 00217\nАренду 18 000 ₽ перевела.",
          time: "10:12",
        },
        {
          id: "le2",
          fromMe: false,
          text: "Добрый. Получил, спасибо.",
          time: "10:40",
        },
        {
          id: "le3",
          date: "25 февраля",
          fromMe: true,
          text: "Здравствуйте! За февраль:\nсвет — 04502\nвода — 00226\nАренда переведена.",
          time: "09:55",
        },
        {
          id: "le4",
          fromMe: true,
          text: "И ещё: в подвале опять капает с трубы возле счётчика. Глину туда пока не ставлю.",
          time: "09:56",
        },
        {
          id: "le5",
          fromMe: false,
          text: "Понял. На выходных заеду, посмотрю. Ключ от подвала у меня есть, вас дёргать не буду.",
          time: "11:20",
        },
        {
          id: "le6",
          fromMe: true,
          text: "Хорошо, спасибо.",
          time: "11:22",
        },
        {
          id: "le7",
          date: "1 марта",
          fromMe: false,
          text: "Трубу поменял, можно пользоваться.",
          time: "18:05",
        },
        {
          id: "le8",
          fromMe: true,
          text: "Отлично, спасибо!",
          time: "18:30",
        },
        {
          id: "le9",
          date: "25 марта",
          fromMe: true,
          text: "Леонид, добрый день. Показания за март:\nсвет — 04689\nвода — 00238\nАренду перевела, извините, что чуть позже обычного.",
          time: "12:47",
        },
        {
          id: "le10",
          fromMe: false,
          text: "Всё пришло. Спасибо.",
          time: "13:30",
        },
      ],
    },
    {
      id: "d-yana",
      name: "Яна 🌸",
      initials: "Я",
      color: "#a855f7",
      online: true,
      time: "16:28",
      messages: [
        {
          id: "y1",
          date: "8 марта",
          fromMe: false,
          text: "Лол, ты там не забыла, что в субботу ко мне к 19:00? Я уже список всего на др составляю)",
          time: "16:08",
        },
        {
          id: "y2",
          fromMe: true,
          text: "Конечно нет! Кристина, кстати, тоже точно будет и проголосовала за малиновый торт 🍰",
          time: "16:11",
        },
        {
          id: "y3",
          fromMe: false,
          text: "Отлично, тогда его и заказываю! Слушай, по украшениям: нашла бежевые с золотым шарики и тёплую гирлянду на стену. Норм будет, не слишком скучно?",
          time: "16:12",
        },
        {
          id: "y4",
          fromMe: true,
          text: "Вообще супер, очень уютно будет смотреться. Могу ещё захватить из мастерской пару керамических подсвечников и длинные свечи на стол 🕯️",
          time: "16:14",
        },
        {
          id: "y5",
          fromMe: false,
          text: "Оо, давай, будет красиво для фоток! Только приезжай пораньше, часам к пяти, поможешь всё развесить и нарезать закуски",
          time: "16:15",
        },
        {
          id: "y6",
          fromMe: true,
          text: "Договорились, буду к пяти. По еде что решили — пиццу и роллы заказываем?",
          time: "16:17",
        },
        {
          id: "y7",
          fromMe: false,
          text: "Ага, четыре большие пиццы, сет роллов и сделаю пару лёгких салатов. Напитки ребята сами принесут, я в общий чат уже написала",
          time: "16:19",
        },
        {
          id: "y8",
          fromMe: true,
          text: "Идеально. Кстати, а с музыкой что? Скинуть тебе пару треков в плейлист?",
          time: "16:20",
        },
        {
          id: "y9",
          fromMe: false,
          text: "Да, закидывай, только без грустных песен, у нас всё-таки праздник 😅 И ещё — у меня после переезда почти нет бокалов, привезёшь штук шесть своих?",
          time: "16:22",
        },
        {
          id: "y10",
          fromMe: true,
          text: "Хаха, хорошо, положу в рюкзак и бокалы, и свечи. Сама уже выбрала, в чём будешь?",
          time: "16:24",
        },
        {
          id: "y11",
          fromMe: false,
          text: "Заказала атласный топ и брюки, завтра заберу из пункта выдачи. Главное, чтобы сели нормально",
          time: "16:25",
        },
        {
          id: "y12",
          fromMe: true,
          text: "Если что — забежишь ко мне, подберём что-нибудь. Всё, бегу дальше работать, в субботу зажжём ✨",
          time: "16:27",
        },
        {
          id: "y13",
          fromMe: false,
          text: "До субботы, люблю ❤️",
          time: "16:28",
        },
      ],
    },
  ],
  friends: [
    { name: "Яна Миронова", desc: "Сестра", initials: "ЯМ", color: "#a855f7", online: true },
    { name: "Кристина Белова", desc: "Москва", initials: "КБ", color: "#8b5cf6", online: false },
    { name: "Мама", desc: "Москва", initials: "М", color: "#ec4899", online: true },
    { name: "Папа", desc: "Москва", initials: "П", color: "#6d28d9", online: false },
    { name: "Катя Лебедева", desc: "Мастерская «ГЛИНА»", initials: "КЛ", color: "#f59e0b", online: true },
  ],
  photos: [
    { src: lolaAvatar },
    { src: lolaStudio },
    { src: lolaVases },
    { src: lolaMugs },
  ],
};

export const VIKTOR_PROFILE: ProfileData = {
  id: "viktor",
  firstName: "Виктор",
  lastName: "Громов",
  status: "Адвокат. Уголовные и арбитражные дела. Консультации — в личных сообщениях.",
  onlineText: "online",
  city: "Москва",
  birthday: "2 июня 1981",
  work: "Адвокатская контора «Громов и партнёры»",
  education: "МГЮА им. Кутафина '03",
  avatar: viktorAvatar,
  coverFrom: "#2e1065",
  coverTo: "#4c1d95",
  coverEmoji: "⚖️",
  followers: "1 874",
  photosCount: 1,
  friendsCount: 428,
  about: [
    "Практикующий адвокат, 20 лет в профессии.",
    "Не даю комментариев по делам клиентов в переписке.",
  ],
  posts: [
    {
      id: "v1",
      text: "Завершили сложное дело, длившееся почти год. Оправдательный приговор.\n\nДеталей по понятным причинам раскрыть не могу. Скажу одно: никогда не сдавайтесь раньше времени. Право — на стороне тех, кто борется.",
      time: "сегодня в 9:12",
      likes: 187,
      comments: 41,
      reposts: 12,
      views: "9,3К",
    },
    {
      id: "v2",
      text: "12 лет вместе. 240 000 км. Три раза через всю страну.\nМоя старушка снова на ходу — спасибо ребятам из сервиса, что вернули её к жизни. 🚗\n\nЕсть тут ещё ценители, кто не меняет верного коня на новое?",
      time: "10 ноя в 18:03",
      likes: 264,
      comments: 87,
      reposts: 6,
      views: "11К",
    },
    {
      id: "v3",
      text: "Напоминаю клиентам: с 1 ноября изменился порядок подачи апелляций. Если у кого-то сроки горят — пишите секретарю Анне, разберём в приоритетном порядке.",
      time: "3 ноя в 10:25",
      likes: 98,
      comments: 15,
      reposts: 18,
      views: "5,2К",
    },
    {
      id: "v4",
      text: "Выходные на даче. Баня, рыбалка, сын обыграл меня в шахматы. Так и должно быть.\nВ понедельник — снова в бой.",
      time: "27 окт в 20:41",
      likes: 312,
      comments: 29,
      reposts: 2,
      views: "7,8К",
    },
  ],
  dialogs: [
    {
      id: "d-lola",
      name: "Лола Миронова",
      initials: "ЛМ",
      color: "#ec4899",
      online: true,
      time: "19:02",
      unread: 1,
      pinned: true,
      messages: [
        { id: "m1", date: "12 ноября", fromMe: true, text: "Лола, добрый вечер. Договор аренды по студии почти готов.", time: "17:44" },
        { id: "m2", fromMe: true, text: "Арендодатель внёс правки в пункт про субаренду. Ничего критичного, но нужно обсудить.", time: "17:45" },
        { id: "m3", fromMe: false, text: "Добрый вечер, Виктор! Спасибо, что держите в курсе 🙏", time: "18:10" },
        { id: "m4", fromMe: false, text: "В четверг буду вовремя, захвачу все бумаги", time: "18:11" },
        { id: "m5", fromMe: true, text: "Договорились. Не переживайте, всё под контролем.", time: "19:02" },
      ],
    },
    {
      id: "d-anna",
      name: "Анна | секретарь",
      initials: "АС",
      color: "#7c3aed",
      online: true,
      time: "17:30",
      unread: 3,
      messages: [
        { id: "m1", date: "12 ноября", fromMe: false, text: "Виктор Андреевич, договор по Мироновой допечатала, лежит на подпись", time: "16:05" },
        { id: "m2", fromMe: false, text: "Суд по Северову перенесли на 12-е, я внесла в календарь", time: "17:20" },
        { id: "m3", fromMe: false, text: "И звонили из сервиса — машина готова, можно забирать", time: "17:30" },
      ],
    },
    {
      id: "d-igor",
      name: "Игорь Савельев",
      initials: "ИС",
      color: "#6d28d9",
      online: false,
      lastOnline: "был час назад",
      time: "14:12",
      messages: [
        { id: "m1", date: "12 ноября", fromMe: false, text: "Вить, рыбалка в субботу в силе?", time: "12:40" },
        { id: "m2", fromMe: true, text: "В силе. Только если опять проспишь — уеду без тебя 😄", time: "13:02" },
        { id: "m3", fromMe: false, text: "Мазду-то починил наконец?", time: "14:12" },
      ],
    },
    {
      id: "d-sto",
      name: "СТО Автопрофи",
      initials: "СА",
      color: "#f59e0b",
      online: false,
      time: "13:45",
      messages: [
        { id: "m1", date: "12 ноября", fromMe: false, text: "Виктор Андреевич, ваш автомобиль готов. Замена ГРМ + ТО.", time: "13:30" },
        { id: "m2", fromMe: false, text: "Итого 87 654 ₽. Можете забирать до 20:00", time: "13:45" },
      ],
    },
    {
      id: "d-elena",
      name: "Елена Громова",
      initials: "ЕГ",
      color: "#ec4899",
      online: false,
      time: "12:10",
      messages: [
        { id: "m1", date: "12 ноября", fromMe: false, text: "Пап, забери Даню с тренировки в 18:00? У меня совещание", time: "11:50" },
        { id: "m2", fromMe: true, text: "Заберу. Пусть форму не забудет, в прошлый раз искали всей раздевалкой", time: "12:10" },
      ],
    },
    {
      id: "d-partner",
      name: "Дмитрий Власов",
      initials: "ДВ",
      color: "#10b981",
      online: false,
      time: "Вчера",
      messages: [
        { id: "m1", date: "11 ноября", fromMe: false, text: "Виктор, скинь номер эксперта по оценке, который по Северову работал", time: "Вчера" },
        { id: "m2", fromMe: true, text: "Скинул в почту. Только предупреди его, что срочно", time: "Вчера" },
      ],
    },
  ],
  friends: [
    { name: "Игорь Савельев", desc: "Однокурсник", initials: "ИС", color: "#6d28d9", online: false },
    { name: "Анна Соколова", desc: "«Громов и партнёры»", initials: "АС", color: "#7c3aed", online: true },
    { name: "Дмитрий Власов", desc: "Адвокат", initials: "ДВ", color: "#10b981", online: false },
    { name: "Лола Миронова", desc: "Студия «ГЛИНА»", initials: "ЛМ", color: "#ec4899", online: true },
    { name: "Елена Громова", desc: "Дочь", initials: "ЕГ", color: "#ec4899", online: false },
    { name: "Сергей Лавров", desc: "МГЮА '03", initials: "СЛ", color: "#8b5cf6", online: true },
  ],
  photos: [{ src: viktorAvatar }],
};

const friendProfile = (id: "kristina" | "yana" | "lenya", firstName: string, lastName: string, avatar: string, status: string, city: string, work: string, education: string, about: string[], coverFrom: string, coverTo: string): ProfileData => ({
  ...LOLA_PROFILE,
  id,
  firstName,
  lastName,
  avatar,
  status,
  city,
  work,
  education,
  onlineText: id === "yana" ? "online" : "была недавно",
  coverFrom,
  coverTo,
  coverEmoji: id === "kristina" ? "✨" : id === "yana" ? "🌸" : "🎧",
  followers: id === "kristina" ? "2 846" : id === "yana" ? "3 102" : "846",
  photosCount: 3,
  friendsCount: id === "lenya" ? 128 : 246,
  about,
  posts: [
    { id: `${id}-1`, pinned: true, text: status, time: "сегодня в 12:40", likes: 86, comments: 12, reposts: 4, views: "1,2К" },
    { id: `${id}-2`, text: id === "kristina" ? "Немного красоты в обычном дне ✨ музыка, друзья и спонтанные планы — то, что нужно." : id === "yana" ? "Пусть дома будет тепло, на столе — торт, а рядом — любимые люди 🌸" : "Вечерний город, любимый плейлист и никаких лишних планов." , time: "вчера в 18:20", likes: 54, comments: 8, reposts: 2, views: "740" },
  ],
  dialogs: [],
  friends: [
    { name: "Лола Миронова", desc: "Подруга", initials: "ЛМ", color: "#a855f7", online: true },
    { name: "Яна Миронова", desc: "Сестра", initials: "ЯМ", color: "#ec4899", online: true },
    { name: "Кристина Белова", desc: "Подруга", initials: "КБ", color: "#8b5cf6", online: false },
  ],
  photos: [{ src: avatar }, { src: LOLA_STUDIO }, { src: lolaVases }],
});

export const KRISTINA_PROFILE = friendProfile("kristina", "Кристина", "Белова", KRISTINA_AVATAR, "Люблю моменты, которые хочется запомнить ✨", "Москва", "Бьюти-блог и контент", "РГУ им. Косыгина", ["Делюсь находками, музыкой и кусочками своей жизни.", "Всегда за красивые планы и хорошую компанию ✨"], "#f472b6", "#8b5cf6");
export const YANA_PROFILE = friendProfile("yana", "Яна", "Миронова", YANA_AVATAR, "Собираю близких за одним столом 🌸", "Москва", "Организатор мероприятий", "РАНХиГС", ["Сестра Лолы. Люблю уютные праздники, цветы и долгие разговоры.", "В любой непонятной ситуации — ставлю чайник ☕"], "#f59e0b", "#ec4899");
export const LENYA_PROFILE = friendProfile("lenya", "Леонид", "Орлов", LENYA_AVATAR, "Музыка, город и немного тишины.", "Москва", "Звукорежиссёр", "Московский институт культуры", ["Работаю со звуком и живыми концертами.", "Предпочитаю говорить по делу."], "#3b82f6", "#6d28d9");
