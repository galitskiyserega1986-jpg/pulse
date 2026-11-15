import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Eye,
  EyeOff,
  User,
  Lock,
  Clock,
  ArrowRight,
  ShieldAlert,
  TriangleAlert,
  Mail,
  ArrowLeft,
  KeyRound,
  Smartphone,
  CheckCircle2,
  QrCode,
  Users,
  MessageCircle,
  Play,
} from "lucide-react";
import { LOLA_LOGIN, LOLA_CODE, LOLA_EMAIL_MASKED, VIKTOR_LOGIN } from "../game/config";
import {
  attemptViktorLogin,
  formatLeft,
  getViktorState,
  resetViktorState,
} from "../game/viktorAuth";

/* ---------------- LOGIN ---------------- */

type LoginError =
  | null
  | { kind: "invalid" }
  | { kind: "viktor1" }
  | { kind: "viktor2" }
  | { kind: "locked"; until: number };

export function LoginScreen({
  onSuccess,
  onForgot,
}: {
  onSuccess: (u: "lola" | "viktor") => void;
  onForgot: () => void;
}) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LoginError>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [failed, setFailed] = useState(() => getViktorState().failed);

  const showError = (e: NonNullable<LoginError>) => {
    setError(e);
    setShakeKey((k) => k + 1);
  };

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (loading) return;
    if (!login.trim() || !password) {
      showError({ kind: "invalid" });
      return;
    }
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);

      // любой логин, кроме логина Виктора, — всегда неверные данные
      if (login.trim() !== VIKTOR_LOGIN) {
        showError({ kind: "invalid" });
        return;
      }

      const result = attemptViktorLogin(password);
      setFailed(getViktorState().failed);

      switch (result.kind) {
        case "success":
          onSuccess("viktor");
          return;
        case "warn-first":
          showError({ kind: "viktor1" });
          return;
        case "warn-last":
          showError({ kind: "viktor2" });
          return;
        case "locked":
          showError({ kind: "locked", until: result.until });
          return;
        default:
          showError({ kind: "invalid" });
      }
    }, 750);
  };

  return (
    <div className="min-h-screen bg-[#f1eff6] flex flex-col">
      {/* top bar */}
      <div className="bg-white border-b border-purple-950/5">
        <div className="max-w-[1120px] mx-auto px-4 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center shadow-[0_4px_14px_rgba(124,58,237,.4)]">
              <Activity className="w-5 h-5 text-white" strokeWidth={2.8} />
            </div>
            <span className="font-extrabold text-[19px] tracking-tight text-[#1e1b2e]">
              Pulse
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-[13.5px] font-medium text-[#6b6580]">
            <span className="cursor-default select-none">О проекте</span>
            <span className="cursor-default select-none">Помощь</span>
            <span className="cursor-default select-none">Безопасность</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1120px] mx-auto px-4 py-6 lg:py-10 grid lg:grid-cols-[1.05fr_.95fr] gap-6 items-start">
        {/* left hero */}
        <div className="hidden lg:block sticky top-6">
          <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[#8b5cf6] via-[#6d28d9] to-[#2e1065] text-white p-9 min-h-[540px] flex flex-col shadow-[0_20px_60px_-15px_rgba(109,40,217,.55)]">
            <div className="absolute inset-0 cover-pattern opacity-60" />
            <div className="absolute -right-20 -top-20 w-[320px] h-[320px] rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-16 bottom-10 w-[260px] h-[260px] rounded-full bg-[#e879f9]/25 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-3 py-1.5 rounded-full text-[12.5px] font-semibold border border-white/20">
                <span className="w-2 h-2 rounded-full bg-[#22ff88] animate-pulse" />
                12 480 человек сейчас онлайн
              </div>
              <h1 className="mt-5 text-[38px] leading-[1.05] font-extrabold tracking-tight">
                Твой пульс.
                <br />
                Твои люди.
                <br />
                <span className="text-[#e9d5ff]">Твой Pulse.</span>
              </h1>
              <p className="mt-3 text-white/75 text-[15px] leading-relaxed max-w-[380px]">
                Сообщения, клипы, музыка и друзья — всё, что важно, бьётся в одном ритме.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  { icon: MessageCircle, t: "Мессенджер без границ", d: "Чаты, звонки и истории" },
                  { icon: Users, t: "Сообщества по интересам", d: "От керамики до юриспруденции" },
                  { icon: Play, t: "Клипы и музыка", d: "Смотри и слушай без пауз" },
                ].map((f) => (
                  <div
                    key={f.t}
                    className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-2xl px-4 py-3 backdrop-blur"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white text-[#7c3aed] flex items-center justify-center shrink-0">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-[14px] leading-tight">{f.t}</div>
                      <div className="text-white/65 text-[12.5px]">{f.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-auto pt-6 flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {["АК", "ЛМ", "ВГ", "НС"].map((t, i) => (
                  <div
                    key={t}
                    className="w-9 h-9 rounded-full border-2 border-[#4c1d95] flex items-center justify-center text-[11px] font-extrabold"
                    style={{
                      background: ["#ec4899", "#7c3aed", "#3b0764", "#a855f7"][i],
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
              <div className="text-[12.5px] text-white/70 leading-tight">
                <b className="text-white">2 млн+ людей</b>
                <br />
                уже нашли своих в Pulse
              </div>
            </div>
          </div>
        </div>

        {/* right auth */}
        <div className="w-full max-w-[440px] mx-auto lg:mx-0 lg:justify-self-end lg:sticky lg:top-6 space-y-4">
          <div className="lg:hidden flex items-center justify-center gap-2 py-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" strokeWidth={2.8} />
            </div>
            <span className="font-extrabold text-2xl text-[#1e1b2e]">Pulse</span>
          </div>

          <div
            key={shakeKey}
            className={`bg-white rounded-[20px] border border-purple-950/5 shadow-[0_8px_30px_rgba(76,29,149,.07)] p-6 sm:p-7 ${shakeKey ? "animate-shake" : ""}`}
          >
            <h2 className="text-[20px] font-extrabold text-[#1e1b2e] text-center">
              Вход в Pulse
            </h2>
            <p className="text-center text-[13.5px] text-[#6b6580] mt-1">
              Войдите по телефону или логину
            </p>

            <form onSubmit={handleLogin} className="mt-5 space-y-3">
              <label className="block">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9b95b0]" />
                  <input
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Телефон или логин"
                    autoComplete="username"
                    className="w-full h-[46px] rounded-xl bg-[#f4f2f8] border border-transparent focus:border-[#7c3aed] focus:bg-white focus:ring-4 focus:ring-[#7c3aed]/15 outline-none pl-10 pr-3 text-[14.5px] placeholder:text-[#9b95b0] transition"
                  />
                </div>
              </label>
              <label className="block">
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9b95b0]" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPass ? "text" : "password"}
                    placeholder="Пароль"
                    autoComplete="current-password"
                    className="w-full h-[46px] rounded-xl bg-[#f4f2f8] border border-transparent focus:border-[#7c3aed] focus:bg-white focus:ring-4 focus:ring-[#7c3aed]/15 outline-none pl-10 pr-11 text-[14.5px] placeholder:text-[#9b95b0] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((s) => !s)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg hover:bg-purple-500/10 flex items-center justify-center text-[#6b6580]"
                  >
                    {showPass ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                  </button>
                </div>
              </label>

              {/* ошибки и предупреждения */}
              {error?.kind === "invalid" && (
                <div className="animate-fade-up flex items-start gap-2.5 bg-[#ffeded] border border-[#ff3b30]/20 text-[#c81e1e] rounded-xl px-3.5 py-3 text-[13.5px] leading-snug font-medium">
                  <ShieldAlert className="w-[18px] h-[18px] shrink-0 mt-[1px]" />
                  <span>Неверный логин или пароль. Проверьте правильность введённых данных.</span>
                </div>
              )}

              {error?.kind === "viktor1" && (
                <div className="animate-fade-up bg-[#fff8e6] border border-[#f59e0b]/40 rounded-xl px-3.5 py-3">
                  <div className="flex items-start gap-2.5 text-[#92400e]">
                    <TriangleAlert className="w-[18px] h-[18px] shrink-0 mt-[1px]" />
                    <div className="text-[13.5px] leading-snug">
                      <b>Неверный пароль.</b> У вас осталось <b>2 попытки</b>, иначе вход будет заблокирован на <b>24 часа</b>.
                    </div>
                  </div>
                  <div className="mt-2.5 flex gap-1">
                    <div className="h-1.5 flex-1 rounded-full bg-[#f59e0b]" />
                    <div className="h-1.5 flex-1 rounded-full bg-black/10" />
                    <div className="h-1.5 flex-1 rounded-full bg-black/10" />
                  </div>
                  <div className="mt-1.5 text-[11.5px] font-semibold text-[#b45309]">Попытка 1 из 3</div>
                </div>
              )}

              {error?.kind === "viktor2" && (
                <div className="animate-fade-up bg-[#ffecec] border-2 border-[#ff3b30] rounded-xl px-3.5 py-3 shadow-[0_0_0_4px_rgba(255,59,48,.1)]">
                  <div className="flex items-start gap-2.5 text-[#d70000]">
                    <ShieldAlert className="w-5 h-5 shrink-0 mt-[1px] animate-pulse" />
                    <div className="leading-snug">
                      <div className="text-[13px] font-semibold">Неверный пароль!</div>
                      <div className="mt-0.5 text-[14.5px] font-extrabold uppercase tracking-wide">
                        У вас осталась 1 попытка
                      </div>
                      <div className="text-[14.5px] font-extrabold uppercase tracking-wide">
                        Блокировка 24 часа
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5 flex gap-1">
                    <div className="h-1.5 flex-1 rounded-full bg-[#ff3b30]" />
                    <div className="h-1.5 flex-1 rounded-full bg-[#ff3b30]" />
                    <div className="h-1.5 flex-1 rounded-full bg-black/10" />
                  </div>
                  <div className="mt-1.5 text-[11.5px] font-extrabold text-[#d70000] uppercase">Попытка 2 из 3 • последняя!</div>
                </div>
              )}

              {error?.kind === "locked" && <LockNotice until={error.until} />}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[46px] rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-[.99] disabled:opacity-70 text-white font-bold text-[15px] flex items-center justify-center gap-2 transition shadow-[0_8px_20px_-6px_rgba(124,58,237,.6)]"
              >
                {loading ? (
                  <span className="w-5 h-5 border-[2.5px] border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Войти <ArrowRight className="w-[18px] h-[18px]" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={onForgot}
                  className="text-[13.5px] font-semibold text-[#7c3aed] hover:underline"
                >
                  Забыли пароль?
                </button>
                <span className="text-[12px] text-[#9b95b0]">
                  {login.trim() === VIKTOR_LOGIN && failed > 0 ? `Неудачных входов: ${failed}` : ""}
                </span>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-[20px] border border-purple-950/5 p-5 text-center">
            <div className="flex items-center justify-center gap-2 text-[13.5px] text-[#6b6580]">
              <QrCode className="w-4 h-4" /> Вход по QR-коду
            </div>
            <div className="mt-3 w-full h-[44px] rounded-xl bg-[#ede9fe] text-[#7c3aed] font-bold text-[14.5px] flex items-center justify-center cursor-default select-none">
              Создать аккаунт
            </div>
            <p className="mt-3 text-[11.5px] leading-relaxed text-[#9b95b0]">
              Нажимая «Войти», вы принимаете условия использования Pulse и политику конфиденциальности
            </p>
          </div>

          <div className="text-center text-[11.5px] text-[#9b95b0] space-x-2">
            <span>Pulse © 2026</span>
            <span>•</span>
            <span className="cursor-default">Правила</span>
            <span>•</span>
            <span className="cursor-default">Помощь</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                resetViktorState();
                setFailed(0);
                setError(null);
              }}
              className="hover:underline"
              title="Для организатора игры: сбросить попытки, блокировку и сохранённый вход"
            >
              Сбросить демо
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Плашка блокировки с обратным отсчётом. Исчезает, когда срок истёк. */
function LockNotice({ until }: { until: number }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (now >= until) return null;

  return (
    <div className="animate-fade-up bg-[#2b2b2e] text-white rounded-xl px-3.5 py-3">
      <div className="flex items-start gap-2.5">
        <Lock className="w-[18px] h-[18px] shrink-0 mt-[1px]" />
        <div className="text-[13.5px] leading-snug">
          <div className="font-extrabold uppercase tracking-wide">Вход заблокирован на 24 часа</div>
          <div className="mt-0.5 text-white/75">
            Все попытки использованы. Войти в этот аккаунт можно после окончания блокировки.
          </div>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-2 bg-white/10 rounded-lg px-3 py-2 text-[12.5px]">
        <span className="flex items-center gap-1.5 text-white/80">
          <Clock className="w-4 h-4" /> Повторить вход через
        </span>
        <b className="tabular-nums">{formatLeft(until - now)}</b>
      </div>
    </div>
  );
}

/* ---------------- FORGOT LOGIN ---------------- */

export function ForgotLoginScreen({
  onBack,
  onFound,
}: {
  onBack: () => void;
  onFound: () => void;
}) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(0);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (loading) return;
    setLoading(true);
    setErr(false);
    setTimeout(() => {
      setLoading(false);
      if (val.trim() === LOLA_LOGIN) {
        onFound();
      } else {
        setErr(true);
        setShake((k) => k + 1);
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f1eff6] flex flex-col">
      <div className="bg-white border-b border-purple-950/5">
        <div className="max-w-[1120px] mx-auto px-4 h-[56px] flex items-center gap-2">
          <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" strokeWidth={2.8} />
          </div>
          <span className="font-extrabold text-[19px] text-[#1e1b2e]">Pulse</span>
          <span className="ml-2 text-[13px] text-[#9b95b0] font-medium">/ восстановление доступа</span>
        </div>
      </div>
      <div className="flex-1 flex items-start sm:items-center justify-center px-4 py-10">
        <div
          key={shake}
          className={`w-full max-w-[440px] bg-white rounded-[20px] border border-purple-950/5 shadow-[0_8px_30px_rgba(76,29,149,.07)] p-7 animate-fade-up ${shake ? "animate-shake" : ""}`}
        >
          <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] font-semibold text-[#6b6580] hover:text-[#7c3aed] mb-4">
            <ArrowLeft className="w-4 h-4" /> Назад ко входу
          </button>
          <div className="w-12 h-12 rounded-2xl bg-[#ede9fe] flex items-center justify-center mb-4">
            <KeyRound className="w-6 h-6 text-[#7c3aed]" />
          </div>
          <h2 className="text-[20px] font-extrabold text-[#1e1b2e]">Восстановление доступа</h2>
          <p className="mt-1 text-[13.5px] text-[#6b6580] leading-relaxed">
            Введите <b>логин</b> аккаунта. Мы отправим код для восстановления на привязанную почту.
          </p>
          <form onSubmit={submit} className="mt-5 space-y-3">
            <div className="relative">
              <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#9b95b0]" />
              <input
                value={val}
                onChange={(e) => {
                  setVal(e.target.value);
                  setErr(false);
                }}
                placeholder="Логин"
                autoFocus
                className={`w-full h-[46px] rounded-xl bg-[#f4f2f8] border outline-none pl-10 pr-3 text-[14.5px] transition focus:bg-white focus:ring-4 ${
                  err
                    ? "border-[#ff3b30] focus:border-[#ff3b30] focus:ring-[#ff3b30]/10"
                    : "border-transparent focus:border-[#7c3aed] focus:ring-[#7c3aed]/15"
                }`}
              />
            </div>
            {err && (
              <div className="text-[13px] font-medium text-[#c81e1e] bg-[#ffeded] border border-[#ff3b30]/20 rounded-xl px-3.5 py-2.5">
                Пользователь с таким логином не найден. Проверьте логин и попробуйте снова.
              </div>
            )}
            <button
              type="submit"
              disabled={loading || !val.trim()}
              className="w-full h-[46px] rounded-xl bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white font-bold text-[15px] flex items-center justify-center gap-2 transition"
            >
              {loading ? (
                <span className="w-5 h-5 border-[2.5px] border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>Продолжить <ArrowRight className="w-[18px] h-[18px]" /></>
              )}
            </button>
          </form>
          <div className="mt-5 flex items-start gap-2 text-[12px] text-[#9b95b0] leading-relaxed bg-[#f7f5fb] rounded-xl p-3">
            <Mail className="w-4 h-4 shrink-0 mt-[1px]" />
            Код придёт на почту, привязанную к аккаунту. Проверьте папку «Спам», если письма нет дольше минуты.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- CODE ---------------- */

export function CodeScreen({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [shake, setShake] = useState(0);
  const [checking, setChecking] = useState(false);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(47);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const setDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (clean && i < 3) refs.current[i + 1]?.focus();

    const code = next.join("");
    if (code.length === 4) {
      setChecking(true);
      setTimeout(() => {
        setChecking(false);
        if (code === LOLA_CODE) {
          setDone(true);
          setTimeout(onSuccess, 900);
        } else {
          // по сценарию: на другие коды — нет реакции (только лёгкая тряска)
          setShake((k) => k + 1);
        }
      }, 550);
    }
  };

  const onKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
      const next = [...digits];
      next[i - 1] = "";
      setDigits(next);
    }
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const t = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!t) return;
    e.preventDefault();
    const next = ["", "", "", ""];
    t.split("").forEach((c, i) => (next[i] = c));
    setDigits(next);
    if (t.length === 4) {
      setChecking(true);
      setTimeout(() => {
        setChecking(false);
        if (t === LOLA_CODE) {
          setDone(true);
          setTimeout(onSuccess, 900);
        } else {
          setShake((k) => k + 1);
        }
      }, 550);
    } else {
      refs.current[t.length]?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#f1eff6] flex flex-col">
      {/* верхняя надпись — как в сценарии */}
      <div className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] text-white">
        <div className="max-w-[1120px] mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="text-[13.5px] sm:text-[14.5px] leading-snug">
            <span className="opacity-85">Код для восстановления на вашей почте</span>
            <br className="sm:hidden" />
            <b className="font-bold tracking-wide"> {LOLA_EMAIL_MASKED}</b>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-1.5 text-[12px] bg-white/15 rounded-full px-3 py-1.5 border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22ff88] animate-pulse" />
            письмо отправлено
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-purple-950/5">
        <div className="max-w-[1120px] mx-auto px-4 h-[52px] flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" strokeWidth={2.8} />
          </div>
          <span className="font-extrabold text-[17px] text-[#1e1b2e]">Pulse</span>
        </div>
      </div>

      <div className="flex-1 flex items-start sm:items-center justify-center px-4 py-10">
        <div className="w-full max-w-[440px] bg-white rounded-[20px] border border-purple-950/5 shadow-[0_8px_30px_rgba(76,29,149,.07)] p-7 animate-fade-up">
          <button onClick={onBack} className="flex items-center gap-1.5 text-[13px] font-semibold text-[#6b6580] hover:text-[#7c3aed] mb-4">
            <ArrowLeft className="w-4 h-4" /> Изменить логин
          </button>

          {!done ? (
            <>
              <h2 className="text-[20px] font-extrabold text-[#1e1b2e] text-center">Введите код из письма</h2>
              <p className="mt-1 text-center text-[13.5px] text-[#6b6580]">
                Мы отправили 4-значный код на <b className="text-[#1e1b2e]">{LOLA_EMAIL_MASKED}</b>
              </p>

              <div key={shake} className={`mt-6 flex justify-center gap-3 ${shake ? "animate-shake" : ""}`} onPaste={onPaste}>
                {digits.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    value={d}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => onKey(i, e)}
                    inputMode="numeric"
                    maxLength={1}
                    className={`w-[62px] h-[68px] text-center text-[26px] font-extrabold rounded-2xl outline-none transition border-2 ${
                      d
                        ? "border-[#7c3aed] bg-[#ede9fe] text-[#7c3aed]"
                        : "border-[#e4e0ef] bg-[#f4f2f8] focus:border-[#7c3aed] focus:bg-white"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-4 h-6 flex items-center justify-center">
                {checking ? (
                  <span className="text-[13px] font-medium text-[#6b6580] flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#7c3aed]/30 border-t-[#7c3aed] rounded-full animate-spin" />
                    Проверяем код…
                  </span>
                ) : (
                  <span className="text-[12px] text-[#a9a3bd]">Введите 4 цифры из письма</span>
                )}
              </div>

              <div className="mt-4 text-center text-[13.5px]">
                {timer > 0 ? (
                  <span className="text-[#9b95b0]">
                    Отправить код повторно через <b className="text-[#1e1b2e] tabular-nums">0:{String(timer).padStart(2, "0")}</b>
                  </span>
                ) : (
                  <button
                    onClick={() => setTimer(47)}
                    className="font-bold text-[#7c3aed] hover:underline"
                  >
                    Отправить код ещё раз
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="py-6 text-center animate-pop">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#ede9fe] flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-[#7c3aed]" />
              </div>
              <h2 className="mt-4 text-[19px] font-extrabold text-[#1e1b2e]">Код принят!</h2>
              <p className="mt-1 text-[13.5px] text-[#6b6580]">Открываем профиль…</p>
            </div>
          )}

          <div className="mt-6 bg-[#f7f5fb] rounded-xl p-3 text-[12px] text-[#9b95b0] leading-relaxed">
            Не пришло письмо? Проверьте папку «Спам» и правильность почты <b>{LOLA_EMAIL_MASKED}</b>.
          </div>
        </div>
      </div>
    </div>
  );
}
