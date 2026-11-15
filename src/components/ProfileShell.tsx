import { useMemo, useRef, useState } from "react";
import {
  Activity,
  Search,
  Bell,
  Music4,
  Home,
  Newspaper,
  MessageCircle,
  Users,
  UsersRound,
  Image as ImageIcon,
  Music,
  Clapperboard,
  Gamepad2,
  Store,
  Settings,
  BadgeCheck,
  MapPin,
  Cake,
  Briefcase,
  GraduationCap,
  Eye,
  Heart,
  MessageSquare,
  Repeat2,
  Send,
  Paperclip,
  Smile,
  Mic,
  ChevronDown,
  LogOut,
  Pin,
  MoreHorizontal,
  CheckCheck,
  ArrowLeft,
  ShieldCheck,
  KeyRound,
  Camera,
  Pencil,
  PhoneCall,
  Video,
  Info,
  X,
} from "lucide-react";
import { KRISTINA_PROFILE, LENYA_PROFILE, LOLA_AVATAR, VIKTOR_AVATAR, YANA_PROFILE, YANA_AVATAR, KRISTINA_AVATAR, LENYA_AVATAR } from "../game/profiles";
import type { ProfileData } from "../game/profiles";

type Tab = "profile" | "messages" | "photos";

export function ProfileShell({
  profile,
  welcome,
  onLogout,
  onCloseWelcome,
}: {
  profile: ProfileData;
  welcome: "lola" | "viktor" | null;
  onLogout: () => void;
  onCloseWelcome: () => void;
}) {
  const [tab, setTab] = useState<Tab>("profile");
  const [dialogs, setDialogs] = useState(profile.dialogs);
  const [activeId, setActiveId] = useState<string>(profile.dialogs[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [likeBump, setLikeBump] = useState<string | null>(null);
  const [msgSearch, setMsgSearch] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [extraPosts, setExtraPosts] = useState<{ id: string; text: string; time: string }[]>([]);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [viewedProfile, setViewedProfile] = useState<ProfileData | null>(null);
  const pageProfile = viewedProfile ?? profile;

  const openFriendPage = (name: string) => {
    const normalized = name.toLowerCase();
    const friend = normalized.includes("кристин") ? KRISTINA_PROFILE : normalized.includes("ян") ? YANA_PROFILE : normalized.includes("лён") || normalized.includes("леон") || normalized.includes("лен") ? LENYA_PROFILE : null;
    if (!friend) return;
    setViewedProfile(friend);
    setTab("profile");
  };
  const goToMyPage = () => { setViewedProfile(null); setTab("profile"); };
  const chatEndRef = useRef<HTMLDivElement>(null);

  const active = dialogs.find((d) => d.id === activeId) ?? dialogs[0];
  const totalUnread = dialogs.reduce((s, d) => s + (d.unread ?? 0), 0);

  const filteredDialogs = useMemo(
    () =>
      dialogs.filter((d) =>
        d.name.toLowerCase().includes(msgSearch.toLowerCase())
      ),
    [dialogs, msgSearch]
  );

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
    setLikeBump(id);
    setTimeout(() => setLikeBump(null), 350);
  };

  const sendMessage = () => {
    const text = draft.trim();
    if (!text || !active) return;
    setDialogs((prev) =>
      prev.map((d) =>
        d.id === active.id
          ? {
              ...d,
              time: "сейчас",
              messages: [
                ...d.messages,
                { id: `m-${Date.now()}`, fromMe: true, text, time: "сейчас" },
              ],
            }
          : d
      )
    );
    setDraft("");
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const publishPost = () => {
    const t = newPost.trim();
    if (!t) return;
    setExtraPosts((p) => [{ id: `x-${Date.now()}`, text: t, time: "только что" }, ...p]);
    setNewPost("");
  };

  const avatarFor = (dialogId: string, initials: string, color: string) => {
    if (profile.id === "lola" && dialogId === "d-viktor")
      return (
        <img src={VIKTOR_AVATAR} alt="" className="w-full h-full object-cover" />
      );
    if (profile.id === "viktor" && dialogId === "d-lola")
      return <img src={LOLA_AVATAR} alt="" className="w-full h-full object-cover" />;
    if (dialogId === "d-kristina") return <img src={KRISTINA_AVATAR} alt="" className="w-full h-full object-cover" />;
    if (dialogId === "d-yana") return <img src={YANA_AVATAR} alt="" className="w-full h-full object-cover" />;
    if (dialogId === "d-leonid") return <img src={LENYA_AVATAR} alt="" className="w-full h-full object-cover" />;
    return (
      <div
        className="w-full h-full flex items-center justify-center text-white font-extrabold"
        style={{ background: color, fontSize: 15 }}
      >
        {initials}
      </div>
    );
  };

  const sidebarItems: {
    label: string;
    icon: any;
    target?: Tab;
    badge?: number;
  }[] = [
    { label: "Моя страница", icon: Home, target: "profile" },
    { label: "Новости", icon: Newspaper },
    { label: "Сообщения", icon: MessageCircle, target: "messages", badge: totalUnread },
    { label: "Друзья", icon: Users },
    { label: "Фотографии", icon: ImageIcon, target: "photos" },
    { label: "Сообщества", icon: UsersRound },
    { label: "Музыка", icon: Music },
    { label: "Видео", icon: Clapperboard },
    { label: "Клипы", icon: PlayIcon },
    { label: "Игры", icon: Gamepad2 },
    { label: "Маркет", icon: Store },
  ];

  return (
    <div className="min-h-screen bg-[#f1eff6] pb-20 md:pb-10">
      {/* header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-purple-950/5">
        <div className="max-w-[1100px] mx-auto px-3 sm:px-4 h-[54px] flex items-center gap-3">
          <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={goToMyPage}>
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center shadow-[0_3px_10px_rgba(124,58,237,.35)]">
              <Activity className="w-5 h-5 text-white" strokeWidth={2.8} />
            </div>
            <span className="font-extrabold text-[18px] text-[#1e1b2e] hidden sm:block">Pulse</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-[320px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9b95b0]" />
            <input
              placeholder="Поиск в Pulse"
              className="w-full h-[36px] rounded-lg bg-[#f1eff6] pl-9 pr-3 text-[13.5px] outline-none focus:bg-white focus:ring-2 focus:ring-[#7c3aed]/20 border border-transparent focus:border-[#7c3aed]/30 transition placeholder:text-[#9b95b0]"
            />
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <div className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#4a445d] cursor-default select-none">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7c3aed] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                {profile.id === "lola" ? 3 : 5}
              </span>
            </div>
            <div className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-[#4a445d] cursor-default select-none">
              <Music4 className="w-5 h-5" />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowUserMenu((s) => !s)}
                className="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-full hover:bg-purple-500/10 transition"
              >
                <img src={profile.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <ChevronDown className={`w-4 h-4 text-[#6b6580] transition ${showUserMenu ? "rotate-180" : ""}`} />
              </button>
              {showUserMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                  <div className="absolute right-0 top-[44px] z-50 w-[220px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(76,29,149,.16)] border border-purple-950/5 p-2 animate-pop">
                    <div className="px-3 py-2.5 border-b border-purple-950/5 mb-1">
                      <div className="font-bold text-[14px] text-[#1e1b2e]">
                        {profile.firstName} {profile.lastName}
                      </div>
                      <div className="text-[12px] text-[#22c55e] font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" /> {profile.onlineText}
                      </div>
                    </div>
                    {[
                      { icon: Settings, t: "Настройки" },
                      { icon: ShieldCheck, t: "Безопасность" },
                      { icon: Info, t: "Помощь" },
                    ].map((r) => (
                      <div key={r.t} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13.5px] font-medium text-[#4a445d] cursor-default select-none">
                        <r.icon className="w-4 h-4 text-[#7c3aed]" /> {r.t}
                      </div>
                    ))}
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#ffeded] text-[13.5px] font-bold text-[#d70000] mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Выйти
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-3 sm:px-4 pt-4 flex gap-4 items-start">
        {/* left nav desktop */}
        <aside className="hidden md:block w-[168px] shrink-0 sticky top-[70px]">
          <nav className="space-y-[1px]">
            {sidebarItems.map((n, i) => {
              const target = n.target;
              if (target) {
                const isActive = tab === target;
                return (
                  <button
                    key={i + n.label}
                    type="button"
                    onClick={() => target === "profile" ? goToMyPage() : setTab(target)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13.5px] font-medium transition ${
                      isActive
                        ? "bg-white shadow-sm text-[#1e1b2e] font-semibold"
                        : "text-[#4a445d] hover:bg-white/70"
                    }`}
                  >
                    <n.icon className="w-[19px] h-[19px] text-[#7c3aed]" />
                    <span className="truncate">{n.label}</span>
                    {!!n.badge && (
                      <span className="ml-auto min-w-[20px] h-5 px-1.5 rounded-full bg-[#7c3aed] text-white text-[11px] font-bold flex items-center justify-center">
                        {n.badge}
                      </span>
                    )}
                  </button>
                );
              }

              // Некликабельные пункты меню (Новости, Друзья, Сообщества, Музыка, Видео, Клипы, Игры, Маркет)
              return (
                <div
                  key={i + n.label}
                  className="w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13.5px] font-medium text-[#4a445d] cursor-default select-none"
                >
                  <n.icon className="w-[19px] h-[19px] text-[#8b5cf6]" />
                  <span className="truncate">{n.label}</span>
                </div>
              );
            })}
          </nav>
          <div className="mt-5 px-2.5 text-[12px] text-[#9b95b0] leading-relaxed select-none">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {["Блог", "Разработчикам", "Вакансии", "Реклама"].map((t) => (
                <span key={t} className="cursor-default">{t}</span>
              ))}
            </div>
            <div className="mt-2 font-semibold">Pulse © 2026</div>
          </div>
        </aside>

        {/* center */}
        <main className="flex-1 min-w-0">
          {tab === "profile" && (
            <div className="space-y-4 animate-fade-up">
              {viewedProfile && <button onClick={goToMyPage} className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#6b6580] shadow-sm hover:text-[#7c3aed]">← На мою страницу · {profile.firstName}</button>}
              {/* cover + info */}
              <div className="bg-white rounded-[16px] border border-purple-950/5 overflow-hidden shadow-sm">
                <div
                  className="h-[150px] sm:h-[190px] relative"
                  style={{ background: `linear-gradient(120deg, ${pageProfile.coverFrom}, ${pageProfile.coverTo})` }}
                >
                  <div className="absolute inset-0 cover-pattern" />
                  <div className="absolute -right-6 -bottom-10 text-[130px] opacity-20 select-none">{pageProfile.coverEmoji}</div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <div className="flex items-center gap-1.5 bg-black/25 backdrop-blur text-white text-[12.5px] font-semibold px-3 py-1.5 rounded-full cursor-default select-none">
                      <Camera className="w-3.5 h-3.5" /> Обложка профиля
                    </div>
                  </div>
                </div>
                <div className="px-4 sm:px-5 pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 sm:-mt-12">
                    <div className="relative shrink-0">
                      <img
                        src={pageProfile.avatar}
                        alt=""
                        onClick={() => setLightboxSrc(pageProfile.avatar)}
                        className="w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] rounded-full object-cover border-4 border-white shadow-lg cursor-pointer"
                      />
                      <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-[#22c55e] border-[3px] border-white online-dot" />
                    </div>
                    <div className="flex-1 min-w-0 sm:pb-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h1 className="text-[21px] sm:text-[23px] font-extrabold text-[#1e1b2e] tracking-tight">
                          {pageProfile.firstName} {pageProfile.lastName}
                        </h1>
                        <BadgeCheck className="w-5 h-5 text-[#7c3aed]" />
                      </div>
                      <div className="text-[13px] text-[#6b6580] mt-0.5 leading-snug max-w-[520px]">{pageProfile.status}</div>
                      <div className="text-[12.5px] text-[#22c55e] font-medium mt-1">{pageProfile.onlineText}</div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setTab("messages")}
                        className="h-[36px] px-4 rounded-lg bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-[13.5px] font-bold flex items-center gap-1.5 transition"
                      >
                        <MessageCircle className="w-4 h-4" /> Сообщение
                      </button>
                      <div className="h-[36px] px-3 rounded-lg bg-[#ede9fe] text-[#7c3aed] flex items-center justify-center cursor-default">
                        <MoreHorizontal className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-[13.5px] border-t border-purple-950/5 pt-4">
                    <InfoRow icon={MapPin} label="Город:" value={pageProfile.city} />
                    <InfoRow icon={Cake} label="День рождения:" value={pageProfile.birthday} />
                    <InfoRow icon={Briefcase} label="Работа:" value={pageProfile.work} />
                    <InfoRow icon={GraduationCap} label="Образование:" value={pageProfile.education} />
                  </div>

                  <div className="mt-3 flex gap-5 text-[13px] border-t border-purple-950/5 pt-3">
                    <span className="cursor-default select-none">
                      <b className="text-[#1e1b2e]">{pageProfile.friendsCount}</b> <span className="text-[#6b6580]">друзей</span>
                    </span>
                    <span className="cursor-default select-none">
                      <b className="text-[#1e1b2e]">{pageProfile.followers}</b> <span className="text-[#6b6580]">подписчиков</span>
                    </span>
                    <button onClick={() => setTab("photos")} className="hover:underline">
                      <b className="text-[#1e1b2e]">{pageProfile.photosCount}</b> <span className="text-[#6b6580]">фотографий</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* stories */}
              <div className="bg-white rounded-[16px] border border-purple-950/5 p-3.5 shadow-sm">
                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                  <div className="shrink-0 w-[86px] text-center cursor-default select-none">
                    <div className="w-[64px] h-[64px] mx-auto rounded-full p-[2.5px] bg-gradient-to-tr from-[#7c3aed] to-[#ec4899]">
                      <img src={pageProfile.avatar} alt="" className="w-full h-full rounded-full object-cover border-[2.5px] border-white" />
                    </div>
                    <div className="mt-1.5 text-[11.5px] font-semibold text-[#1e1b2e] leading-tight">Моя история</div>
                  </div>
                  {pageProfile.friends.slice(0, 5).map((f) => (
                    <div key={f.name} className="shrink-0 w-[86px] text-center cursor-default select-none">
                      <div className="w-[64px] h-[64px] mx-auto rounded-full p-[2.5px] bg-gradient-to-tr from-[#a855f7] via-[#d946ef] to-[#f472b6]">
                        <div className="w-full h-full rounded-full border-[2.5px] border-white overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center text-white text-[15px] font-extrabold" style={{ background: f.color }}>
                            {f.initials}
                          </div>
                        </div>
                      </div>
                      <div className="mt-1.5 text-[11.5px] font-medium text-[#4a445d] leading-tight truncate">{f.name.split(" ")[0]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* posting is only available on the signed-in user's own page */}
              {!viewedProfile && <div className="bg-white rounded-[16px] border border-purple-950/5 p-3.5 shadow-sm">
                <div className="flex gap-2.5">
                  <img src={pageProfile.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <input
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && publishPost()}
                    placeholder="Что у вас нового?"
                    className="flex-1 h-[38px] rounded-full bg-[#f1eff6] px-4 text-[13.5px] outline-none focus:ring-2 focus:ring-[#7c3aed]/20 focus:bg-white border border-transparent focus:border-[#7c3aed]/30 transition placeholder:text-[#9b95b0]"
                  />
                  <button onClick={publishPost} disabled={!newPost.trim()} className="w-[38px] h-[38px] rounded-full bg-[#7c3aed] disabled:opacity-40 text-white flex items-center justify-center hover:bg-[#6d28d9] transition shrink-0">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2.5 flex gap-1 text-[12.5px] font-semibold text-[#6b6580] select-none">
                  {[ { icon: ImageIcon, t: "Фото" }, { icon: Video, t: "Видео" }, { icon: Music, t: "Музыка" }, { icon: Pencil, t: "Статья" } ].map((a) => (
                    <span key={a.t} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cursor-default">
                      <a.icon className="w-4 h-4 text-[#7c3aed]" /> {a.t}
                    </span>
                  ))}
                </div>
              </div>}

              {/* posts */}
              {!viewedProfile && extraPosts.map((p) => (
                <PostCard
                  key={p.id}
                  profile={pageProfile}
                  text={p.text}
                  time={p.time}
                  likes={0}
                  comments={0}
                  reposts={0}
                  views="1"
                  liked={liked.has(p.id)}
                  bump={likeBump === p.id}
                  onLike={() => toggleLike(p.id)}
                  onImageClick={setLightboxSrc}
                />
              ))}
              {pageProfile.posts.map((p) => (
                <PostCard
                  key={p.id}
                  profile={pageProfile}
                  text={p.text}
                  time={p.time}
                  likes={p.likes + (liked.has(p.id) ? 1 : 0)}
                  comments={p.comments}
                  reposts={p.reposts}
                  views={p.views}
                  image={p.image}
                  pinned={p.pinned}
                  liked={liked.has(p.id)}
                  bump={likeBump === p.id}
                  onLike={() => toggleLike(p.id)}
                  onImageClick={setLightboxSrc}
                />
              ))}
            </div>
          )}

          {tab === "messages" && (
            <div className="bg-white rounded-[16px] border border-purple-950/5 shadow-sm overflow-hidden animate-fade-up min-h-[560px] flex flex-col md:flex-row">
              {/* list */}
              <div className={`${activeId && typeof window !== "undefined" && window.innerWidth < 768 ? "hidden" : "flex"} md:flex w-full md:w-[320px] shrink-0 flex-col border-r border-purple-950/5`}>
                <div className="p-3 border-b border-purple-950/5">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9b95b0]" />
                    <input
                      value={msgSearch}
                      onChange={(e) => setMsgSearch(e.target.value)}
                      placeholder="Поиск сообщений"
                      className="w-full h-[36px] rounded-lg bg-[#f1eff6] pl-9 pr-3 text-[13px] outline-none focus:ring-2 focus:ring-[#7c3aed]/20 placeholder:text-[#9b95b0]"
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[540px]">
                  {filteredDialogs.map((d) => {
                    const last = d.messages[d.messages.length - 1];
                    return (
                      <div
                        key={d.id}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setActiveId(d.id); setDialogs((prev) => prev.map((x) => (x.id === d.id ? { ...x, unread: 0 } : x))); } }}
                        onClick={() => {
                          setActiveId(d.id);
                          setDialogs((prev) => prev.map((x) => (x.id === d.id ? { ...x, unread: 0 } : x)));
                        }}
                        className={`w-full flex gap-2.5 px-3 py-2.5 text-left transition hover:bg-purple-500/[.04] ${active?.id === d.id ? "bg-[#ede9fe]" : ""}`}
                      >
                        <div className="relative shrink-0 w-11 h-11 rounded-full overflow-hidden">
                          {avatarFor(d.id, d.initials, d.color)}
                          {d.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[13.5px] text-[#1e1b2e] truncate">{d.name}</span>
                            {d.pinned && <Pin className="w-3 h-3 text-[#9b95b0] rotate-45 shrink-0" />}
                            <span className="ml-auto text-[11.5px] text-[#9b95b0] shrink-0">{d.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[12.5px] text-[#6b6580] truncate flex-1">{last?.text}</span>
                            {!!d.unread && (
                              <span className="shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-[#7c3aed] text-white text-[11px] font-bold flex items-center justify-center">
                                {d.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* chat */}
              {active && (
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="px-4 py-2.5 border-b border-purple-950/5 flex items-center gap-2.5 bg-white">
                    <button className="md:hidden w-8 h-8 rounded-full hover:bg-purple-500/10 flex items-center justify-center" onClick={() => setActiveId("")}>
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => openFriendPage(active.name)} className="w-9 h-9 rounded-full overflow-hidden shrink-0" aria-label={`Профиль: ${active.name}`}>
                      {avatarFor(active.id, active.initials, active.color)}
                    </button>
                    <button onClick={() => openFriendPage(active.name)} className="min-w-0 text-left">
                      <div className="font-bold text-[14px] text-[#1e1b2e] truncate">{active.name}</div>
                      <div className={`text-[12px] ${active.online ? "text-[#22c55e]" : "text-[#9b95b0]"}`}>
                        {active.online ? "online" : active.lastOnline ?? "был(а) недавно"}
                      </div>
                    </button>
                    <div className="ml-auto flex gap-1 text-[#6b6580]">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center cursor-default"><PhoneCall className="w-[18px] h-[18px]" /></div>
                      <div className="w-9 h-9 rounded-full hidden sm:flex items-center justify-center cursor-default"><Video className="w-[18px] h-[18px]" /></div>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center cursor-default"><Search className="w-[18px] h-[18px]" /></div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5 bg-[#f7f5fb] min-h-[380px] max-h-[500px]">
                    {active.messages.map((m) => (
                      <div key={m.id}>
                        {m.date && (
                          <div className="text-center my-2.5">
                            <span className="inline-block bg-purple-950/5 text-[#6b6580] text-[11.5px] font-medium px-3 py-1 rounded-full">
                              {m.date}
                            </span>
                          </div>
                        )}
                        <div className={`flex ${m.fromMe ? "justify-end" : "justify-start"} animate-fade-up`}>
                          <div
                            className={`max-w-[78%] px-3.5 py-2 rounded-2xl text-[13.5px] leading-relaxed shadow-sm ${
                              m.fromMe
                                ? "bg-[#7c3aed] text-white rounded-br-md"
                                : "bg-white text-[#1e1b2e] rounded-bl-md border border-purple-950/5"
                            }`}
                          >
                            {m.image && (
                              <img
                                src={m.image}
                                alt=""
                                onClick={() => setLightboxSrc(m.image!)}
                                className="mb-2 rounded-xl max-h-[240px] w-full object-cover cursor-pointer hover:opacity-95 transition"
                              />
                            )}
                            <div className="whitespace-pre-line">{m.text}</div>
                            <div className={`mt-1 text-[10.5px] flex items-center gap-1 justify-end ${m.fromMe ? "text-white/70" : "text-[#9b95b0]"}`}>
                              {m.time} {m.fromMe && <CheckCheck className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  <div className="p-3 border-t border-purple-950/5 bg-white">
                    <div className="flex items-center gap-1.5">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-[#6b6580] shrink-0 cursor-default"><Paperclip className="w-5 h-5" /></div>
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Напишите сообщение…"
                        className="flex-1 h-[40px] rounded-full bg-[#f1eff6] px-4 text-[13.5px] outline-none focus:ring-2 focus:ring-[#7c3aed]/20 placeholder:text-[#9b95b0]"
                      />
                      <div className="w-9 h-9 rounded-full hidden sm:flex items-center justify-center text-[#6b6580] shrink-0 cursor-default"><Smile className="w-5 h-5" /></div>
                      {draft.trim() ? (
                        <button onClick={sendMessage} className="w-10 h-10 rounded-full bg-[#7c3aed] text-white flex items-center justify-center hover:bg-[#6d28d9] transition shrink-0">
                          <Send className="w-[18px] h-[18px]" />
                        </button>
                      ) : (
                        <div className="w-10 h-10 rounded-full text-[#6b6580] flex items-center justify-center shrink-0 cursor-default"><Mic className="w-5 h-5" /></div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "photos" && (
            <div className="bg-white rounded-[16px] border border-purple-950/5 shadow-sm p-4 sm:p-5 animate-fade-up">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="font-extrabold text-[17px] text-[#1e1b2e]">Фотографии {profile.firstName}</h2>
                <span className="text-[13px] text-[#9b95b0] font-medium">{profile.photos.length}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {profile.photos.map((ph, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxSrc(ph.src)}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer bg-[#f1eff6]"
                  >
                    <img
                      src={ph.src}
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-purple-950/10 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="flex">
          {[
            { target: "profile" as Tab, icon: Home, t: "Главная" },
            { icon: Newspaper, t: "Новости" },
            { target: "messages" as Tab, icon: MessageCircle, t: "Чаты", badge: totalUnread },
            { icon: Users, t: "Друзья" },
            { target: "photos" as Tab, icon: ImageIcon, t: "Фото" },
          ].map((n) => {
            if (n.target) {
              const target = n.target;
              return (
                <button
                  key={n.t}
                  type="button"
                  onClick={() => target === "profile" ? goToMyPage() : setTab(target)}
                  className={`flex-1 flex flex-col items-center gap-[2px] py-2 relative ${tab === target ? "text-[#7c3aed]" : "text-[#9b95b0]"}`}
                >
                  <n.icon className="w-[22px] h-[22px]" />
                  <span className="text-[10px] font-semibold">{n.t}</span>
                  {!!n.badge && (
                    <span className="absolute top-1 right-1/2 translate-x-[16px] min-w-[18px] h-[18px] px-1 rounded-full bg-[#7c3aed] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                      {n.badge}
                    </span>
                  )}
                </button>
              );
            }
            return (
              <div
                key={n.t}
                className="flex-1 flex flex-col items-center gap-[2px] py-2 text-[#b4aec7] cursor-default select-none"
              >
                <n.icon className="w-[22px] h-[22px]" />
                <span className="text-[10px] font-semibold">{n.t}</span>
              </div>
            );
          })}
        </div>
      </nav>

      {/* photo lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[70] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxSrc(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightboxSrc}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-[88vh] rounded-2xl object-contain shadow-2xl animate-pop"
          />
        </div>
      )}

      {/* welcome modal */}
      {welcome && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#1e1b2e]/60 backdrop-blur-sm animate-fade-up">
          <div className="w-full max-w-[400px] bg-white rounded-[20px] p-7 text-center shadow-2xl animate-pop">
            {welcome === "lola" ? (
              <>
                <div className="w-16 h-16 mx-auto rounded-full bg-[#ede9fe] flex items-center justify-center">
                  <ShieldCheck className="w-9 h-9 text-[#7c3aed]" />
                </div>
                <h3 className="mt-4 text-[19px] font-extrabold text-[#1e1b2e]">Доступ восстановлен!</h3>
                <p className="mt-1.5 text-[13.5px] text-[#6b6580] leading-relaxed">
                  Код принят. Добро пожаловать,
                  <br />
                  <b className="text-[#1e1b2e]">Лола! 🤍</b>
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto rounded-full bg-[#ede9fe] flex items-center justify-center">
                  <KeyRound className="w-8 h-8 text-[#7c3aed]" />
                </div>
                <h3 className="mt-4 text-[19px] font-extrabold text-[#1e1b2e]">Вход выполнен</h3>
                <p className="mt-1.5 text-[13.5px] text-[#6b6580] leading-relaxed">
                  Добро пожаловать, <b className="text-[#1e1b2e]">Виктор!</b>
                  <br />
                  Вход с этого устройства • только что
                </p>
                <div className="mt-3 text-[11.5px] text-[#9b95b0] bg-[#f7f5fb] rounded-xl px-3 py-2">
                  Если это были не вы — срочно смените пароль в настройках безопасности
                </div>
              </>
            )}
            <button
              onClick={onCloseWelcome}
              className="mt-5 w-full h-[46px] rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold text-[15px] transition"
            >
              Перейти в профиль
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex gap-2 min-w-0">
      <Icon className="w-4 h-4 text-[#9b95b0] shrink-0 mt-[2px]" />
      <span className="text-[#9b95b0] shrink-0">{label}</span>
      <span className="text-[#1e1b2e] font-medium truncate">{value}</span>
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PostCard({
  profile,
  text,
  time,
  likes,
  comments,
  reposts,
  views,
  image,
  pinned,
  liked,
  bump,
  onLike,
  onImageClick,
}: {
  profile: ProfileData;
  text: string;
  time: string;
  likes: number;
  comments: number;
  reposts: number;
  views: string;
  image?: string;
  pinned?: boolean;
  liked: boolean;
  bump: boolean;
  onLike: () => void;
  onImageClick: (src: string) => void;
}) {
  return (
    <article className="bg-white rounded-[16px] border border-purple-950/5 shadow-sm p-4 sm:p-5">
      <div className="flex items-center gap-2.5">
        <img src={profile.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
        <div className="min-w-0">
          <div className="font-bold text-[14px] text-[#1e1b2e] flex items-center gap-1">
            {profile.firstName} {profile.lastName}
            <BadgeCheck className="w-4 h-4 text-[#7c3aed]" />
          </div>
          <div className="text-[12px] text-[#9b95b0]">{time}</div>
        </div>
        <div className="ml-auto flex items-center gap-2 text-[#9b95b0]">
          {pinned && (
            <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-[#6b6580]">
              <Pin className="w-3.5 h-3.5 rotate-45" /> закрепа
            </span>
          )}
          <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-default">
            <MoreHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>

      <p className="mt-3 text-[14px] leading-relaxed text-[#221e33] whitespace-pre-line">{text}</p>

      {image && (
        <div className="mt-3 rounded-xl overflow-hidden border border-purple-950/5">
          <img
            src={image}
            alt=""
            onClick={() => onImageClick(image)}
            className="w-full max-h-[380px] object-cover hover:scale-[1.01] transition duration-500 cursor-pointer"
          />
        </div>
      )}

      <div className="mt-3.5 flex items-center gap-1 text-[13px] font-semibold text-[#6b6580]">
        <button
          onClick={onLike}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition active:scale-95 ${
            liked ? "text-[#e11d48] bg-[#ffe4e6]" : "hover:bg-purple-500/10 hover:text-[#e11d48]"
          } ${bump ? "scale-110" : ""}`}
        >
          <Heart className={`w-[18px] h-[18px] transition ${liked ? "fill-[#e11d48]" : ""}`} />
          {likes}
        </button>
        <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-default select-none">
          <MessageSquare className="w-[18px] h-[18px]" /> {comments}
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg cursor-default select-none">
          <Repeat2 className="w-[19px] h-[19px]" /> {reposts}
        </span>
        <span className="ml-auto flex items-center gap-1 text-[#9b95b0] font-medium text-[12.5px]">
          <Eye className="w-4 h-4" /> {views}
        </span>
      </div>
    </article>
  );
}
