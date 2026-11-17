// Prefix public assets with Vite's base so they work both locally and on GitHub Pages.
const image = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

const lolaAvatar = image("lolaavatarka.jpg");
const viktorAvatar = image("viktoravatarka.jpg");
const lolaStudio = image("lola-studio.jpg");
const lolaVases = image("lola-vases.jpg");
const lolaMugs = image("lola-mugs.jpg");
const perfumeImg = image("perfume.jpg");
const fishImg = image("fish.jpg");

export const LOLA_AVATAR = lolaAvatar;
export const VIKTOR_AVATAR = viktorAvatar;
export const KRISTINA_AVATAR = image("kristinaavatarka.jpg");
export const YANA_AVATAR = image("ianaavatarka.jpg");
export const LENYA_AVATAR = image("leonidavatarka.jpg");
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
  images?: string[];
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
  photosCount: 3,
  friendsCount: 312,
  about: [
    "Керамист. Делаю вазы и посуду вручную.",
    "Мастерская работает каждый день 🤍",
  ],
  posts: [
    {
      id: "l2",
      text: "Новая глава. С новым годом! ✨\n\nТри года я лепила дома, превращая кухню в мастерскую, а теперь... у меня есть своя студия! 🏺🤍\n\nЭто было маленькое, но очень важное решение — начать новый год с расширения своих возможностей. Теперь у меня есть пространство, где я могу творить, пачкать всё глиной и создавать больше красоты для вас.\n\nХочу сказать огромное спасибо тем, кто помогал мне на этом пути:\n❤️ Моим родителям — за веру в меня.\n❤️ Моей сестре — за поддержку.\n❤️ И, конечно, Кристине — самой лучшей подруге, которая всегда рядом и заряжает меня энергией.\n\nМечты сбываются, если в них верить и много работать. Добро пожаловать в мою новую творческую мастерскую! 🥂",
      time: "2 января 2026 в 12:00",
      likes: 0,
      comments: 0,
      reposts: 0,
      views: "1",
      image: image("lola-upload-2.jpeg"),
    },
    {
      id: "l1",
      pinned: true,
      text: "Каждое изделие - уникально, как и вы. Вазы, кружки, посуда — все создается с любовью и вниманием к деталям. Принимаю заказы на индивидуалные изделия и повторы коллекций.\n\nДля заказа пишите в сообщения или в мой Телеграмм - @LolaMaster",
      time: "5 января 2026 в 10:00",
      likes: 0,
      comments: 0,
      reposts: 0,
      views: "1",
      image: image("lola-order.jpg"),
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
    { src: image("lola-upload-1.jpeg") },
    { src: image("lola-upload-2.jpeg") },
  ],
};

export const VIKTOR_PROFILE: ProfileData = {
  id: "viktor",
  firstName: "Виктор",
  lastName: "Громов",
  status: "Telegram: @VictorAdvokat",
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
  photosCount: 4,
  friendsCount: 428,
  about: [
    "Практикующий адвокат, 20 лет в профессии.",
    "Не даю комментариев по делам клиентов в переписке.",
  ],
  posts: [
    {
      id: "v4",
      text: "За юридическими услугами — напрямую в Telegram: @VictorAdvokat. Лично. Без посредников. ⚖️",
      time: "19 февраля 2025",
      likes: 595,
      comments: 0,
      reposts: 0,
      views: "1",
      pinned: true,
    },
    {
      id: "v3",
      text: "Новая машина. Новые планы. Погнали 🚙✨",
      time: "3 марта в 19:30",
      likes: 384,
      comments: 5,
      reposts: 0,
      views: "1",
      image: image("виктор в машине.jfif"),
    },
    {
      id: "v2",
      text: "Спасибо Владиславу за его дачу: сосны, тишина и воздух, от которого кружится голова. Идеальные выходные.",
      time: "1 марта в 18:01",
      likes: 327,
      comments: 3,
      reposts: 0,
      views: "1",
      image: image("Виктор в лесу у дачи.jpeg"),
    },
    {
      id: "v1",
      text: "С Днем Рождения, любимый сын!",
      time: "17 января в 13:01",
      likes: 356,
      comments: 6,
      reposts: 0,
      views: "1",
      image: image("виктор леня др.jpeg"),
    },
  ],
  dialogs: [
    {
      id: "d-leonid",
      name: "Леонид Громов",
      initials: "ЛГ",
      color: "#64748b",
      online: false,
      lastOnline: "был недавно",
      time: "09:42",
      messages: [
        { id: "le1", date: "12 марта", fromMe: true, text: "Лёнь, ты во сколько домой? Я ужин приготовил, если задержишься — напиши, уберу в холодильник.", time: "17:40" },
        { id: "le2", fromMe: false, text: "Буду около восьми, пап. Надо ещё на мойку заехать, всю машину в слякоти забрызгало.", time: "17:52" },
        { id: "le3", fromMe: true, text: "Заодно проверь, чтобы страховка в бардачке лежала — я вчера на ней документы перекладывал. И ещё: у нас на тумбочке в прихожей лежит квитанция на налог за здание мастерской. Я тебе его подарил, чтобы с умом им занимался, не затягивай с оплатой.", time: "17:55" },
        { id: "le4", fromMe: false, text: "Помню, вечером оплачу. Как раз арендаторша скоро за март переведёт, всё сразу закрою.", time: "18:03" },
        { id: "le5", fromMe: true, text: "Добро. Захвати тогда хлеба по дороге, дома совсем закончился.", time: "18:06" },
        { id: "le6", date: "15 марта", fromMe: true, text: "Доброе утро. Я проснулся — тебя уже нет, а машина под окном стоит. Ты пешком куда-то ушёл?", time: "09:15" },
        { id: "le7", fromMe: false, text: "Да, проветриться вышел, голова тяжёлая после вчерашнего. Скоро вернусь.", time: "09:38" },
        { id: "le8", fromMe: true, text: "Понятно. Я после обеда в гараж собираюсь, оставь ключи от машины на крючке в коридоре.", time: "09:42" },
      ],
    },
    {
      id: "d-kristina",
      name: "Кристина Белова",
      initials: "КБ",
      color: "#8b5cf6",
      online: false,
      lastOnline: "была в сети 13 марта",
      time: "18:54",
      messages: [
        { id: "kr1", date: "1 марта", fromMe: false, text: "Так устала постоянно оглядываться и от Паши, и ото всех скрываться. Иногда кажется, что нас кто-нибудь заметит.", time: "14:10" },
        { id: "kr2", fromMe: true, text: "Никто не узнает, если будем осторожны. Пока нам лучше не светиться на людях, потерпи немного.", time: "14:16" },
        { id: "kr3", date: "8 марта", fromMe: false, text: "Люцифер 😈 Вить, спасибо огромное за колье и серёжки! Они безумно красивые, я не могу налюбоваться.", time: "22:15" },
        { id: "kr4", fromMe: true, text: "Рад, что тебе понравилось, Крис. Только убери их подальше — Паша не должен увидеть такой подарок.", time: "22:19" },
        { id: "kr5", date: "9 марта", fromMe: true, text: "Запиши мой второй номер: +7 (999) 555-01-48. Купил отдельную симку только для нашего с тобой общения, чтобы скрываться и не оставлять следов на основном телефоне.", time: "19:05" },
        { id: "kr6", fromMe: false, text: "Сохранила, мой Люцифер. Записала под рабочим именем, чтобы Паша случайно не увидел, если возьмёт мой телефон.", time: "19:09" },
        { id: "kr7", date: "10 марта", fromMe: false, text: "Завтра вечером Паша уезжает по делам, я буду свободна после семи.", time: "20:40" },
        { id: "kr8", fromMe: true, text: "Отлично. Тогда в 19:15 заберу тебя у выезда с твоей улицы и подвезу на своей машине, во двор заезжать не буду.", time: "20:45" },
        { id: "kr9", date: "11 марта", fromMe: true, text: "Я выехал, скоро буду на месте. Как выйдешь из подъезда — пиши уже на мой второй номер.", time: "18:50" },
        { id: "kr10", fromMe: false, text: "Уже собираюсь, Люцифер 😘 Буду через двадцать минут.", time: "18:54" },
      ],
    },
    {
      id: "d-irina",
      name: "Ирина Громова",
      initials: "ИГ",
      color: "#d977a8",
      online: false,
      lastOnline: "была недавно",
      time: "18:23",
      messages: [
        { id: "ir1", date: "17 января", fromMe: false, text: "Витя, привет. Послезавтра у Лёни день рождения, 19 января — мы как в итоге отмечаем? Он ничего не говорил?", time: "19:14" },
        { id: "ir2", fromMe: true, text: "Привет. Сказал, шумную компанию не хочет, просто посидим вечером у нас дома за ужином. Часов на семь нормально будет?", time: "19:21" },
        { id: "ir3", fromMe: false, text: "Да, идеально, я после работы как раз к семи успею. Давай я приготовлю его любимое мясо и куплю торт, а ты сделаешь салаты и нарезку?", time: "19:24" },
        { id: "ir4", fromMe: true, text: "Договорились, я ещё картошку запеку. И давай сразу по подаркам сверимся, чтобы не подарить одно и то же. Я ему хочу взять хороший набор инструментов в багажник и тёплый свитер.", time: "19:28" },
        { id: "ir5", fromMe: false, text: "А я как раз про свитер думала, хорошо, что сказал 😅 Тогда подарю ему качественные кожаные перчатки, а то на днях жаловался, что свои потерял.", time: "19:33" },
        { id: "ir6", fromMe: true, text: "Перчатки — самое то, по утрам в машине руль ледяной, точно пригодятся.", time: "19:36" },
        { id: "ir7", fromMe: false, text: "Отлично, завтра после работы заскочу в торговый центр. Лёня 19-го днём будет дома или уедет?", time: "19:39" },
        { id: "ir8", fromMe: true, text: "Сказал, днём проедет по своим делам, а к шести уже вернётся.", time: "19:43" },
        { id: "ir9", date: "19 января", fromMe: false, text: "Вить, я уже подъезжаю, торт и подарок с собой. Лёня дома?", time: "18:20" },
        { id: "ir10", fromMe: true, text: "Да, только зашёл. Поднимайся, дверь не закрыта.", time: "18:23" },
      ],
    },
    {
      id: "d-vlad",
      name: "Владосик",
      initials: "В",
      color: "#15803d",
      online: false,
      lastOnline: "был недавно",
      time: "20:01",
      messages: [
        { id: "vl1", date: "7 февраля", fromMe: false, text: "Вить, ты на эти выходные свободен? Думаю рвануть к себе на дачу — надо отдохнуть от города и баню как следует затопить.", time: "15:20" },
        { id: "vl2", fromMe: true, text: "Я только за, как раз хотел развеяться. На твоей даче вообще лучше всего отдыхается — тишина, сосны кругом, никакой суеты.", time: "15:28" },
        { id: "vl3", fromMe: false, text: "Это точно. Берёзовые веники у меня отличные припасены, парная будет огонь. С тебя тогда пиво, а я мяса замариную.", time: "15:32" },
        { id: "vl4", fromMe: true, text: "Договорились! Заеду по дороге, возьму ящик хорошего светлого и рыбы к пиву — посидим после бани как в старые добрые.", time: "15:36" },
        { id: "vl5", date: "11 февраля", fromMe: false, text: "Фотки с выходных посмотрел — знатно мы в субботу попарились, я в понедельник еле на работу встал 😅", time: "19:45" },
        { id: "vl6", fromMe: true, text: "Да уж, отдохнули душевно! До сих пор вспоминаю, как после парной на веранде с холодным пивом сидели — кайф.", time: "19:52" },
        { id: "vl7", fromMe: false, text: "Надо в конце месяца повторить, как ещё чуть потеплеет. Дача всегда в деле, в любой момент можно собраться.", time: "19:56" },
        { id: "vl8", fromMe: true, text: "Обязательно выберемся, Влад. Спасибо, что вытащил!", time: "20:01" },
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
  ].filter((dialog) => dialog.id !== "d-anna" && dialog.id !== "d-igor"),
  friends: [
    { name: "Игорь Савельев", desc: "Однокурсник", initials: "ИС", color: "#6d28d9", online: false },
    { name: "Анна Соколова", desc: "«Громов и партнёры»", initials: "АС", color: "#7c3aed", online: true },
    { name: "Дмитрий Власов", desc: "Адвокат", initials: "ДВ", color: "#10b981", online: false },
    { name: "Лола Миронова", desc: "Студия «ГЛИНА»", initials: "ЛМ", color: "#ec4899", online: true },
    { name: "Елена Громова", desc: "Дочь", initials: "ЕГ", color: "#ec4899", online: false },
    { name: "Сергей Лавров", desc: "МГЮА '03", initials: "СЛ", color: "#8b5cf6", online: true },
  ],
  photos: [
    { src: viktorAvatar },
    { src: image("виктор леня др.jpeg") },
    { src: image("Виктор в лесу у дачи.jpeg") },
    { src: image("виктор в машине.jfif") },
  ],
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
  onlineText: id === "kristina" ? "была в сети 13 марта" : id === "yana" ? "online" : "была недавно",
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

const kristinaBase = friendProfile("kristina", "Кристина", "Белова", KRISTINA_AVATAR, "Люблю моменты, которые хочется запомнить ✨", "Москва", "Бьюти-блог и контент", "РГУ им. Косыгина", ["Делюсь находками, музыкой и кусочками своей жизни.", "Всегда за красивые планы и хорошую компанию ✨"], "#f472b6", "#8b5cf6");

export const KRISTINA_PROFILE: ProfileData = {
  ...kristinaBase,
  photos: [...kristinaBase.photos, { src: image("pasha-kristina.jpeg") }],
  posts: [
    {
      id: "k-new-2",
      text: "Молодые и счастливые",
      time: "3 марта 2016 в 16:30",
      likes: 894,
      comments: 10,
      reposts: 22,
      views: "5К",
      image: image("pasha-kristina.jpeg"),
    },
    {
      id: "k-new-1",
      text: "🦋🦋🦋",
      time: "9 апреля 2025",
      likes: 1320,
      comments: 12,
      reposts: 25,
      views: "5К",
      images: [image("kristina-post-1.jpeg"), image("kristina-post-2.jpeg")],
    },
  ],
};
export const YANA_PROFILE = friendProfile("yana", "Яна", "Миронова", YANA_AVATAR, "Собираю близких за одним столом 🌸", "Москва", "Организатор мероприятий", "РАНХиГС", ["Сестра Лолы. Люблю уютные праздники, цветы и долгие разговоры.", "В любой непонятной ситуации — ставлю чайник ☕"], "#f59e0b", "#ec4899");
export const LENYA_PROFILE = friendProfile("lenya", "Леонид", "Орлов", LENYA_AVATAR, "Музыка, город и немного тишины.", "Москва", "Звукорежиссёр", "Московский институт культуры", ["Работаю со звуком и живыми концертами.", "Предпочитаю говорить по делу."], "#3b82f6", "#6d28d9");
