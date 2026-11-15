import { useState } from "react";
import { LoginScreen, ForgotLoginScreen, CodeScreen, SetPasswordScreen } from "./components/AuthScreens";
import { ProfileShell } from "./components/ProfileShell";
import { LOLA_PROFILE, VIKTOR_PROFILE, KRISTINA_PROFILE, YANA_PROFILE, LENYA_PROFILE } from "./game/profiles";

type Screen =
  | { name: "login" }
  | { name: "forgot-login" }
  | { name: "forgot-code" }
  | { name: "set-password" }
  | { name: "profile"; user: "lola" | "viktor" | "kristina" | "yana" | "lenya"; welcome: boolean };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "login" });

  if (screen.name === "login") {
    return (
      <LoginScreen
        onSuccess={(u) => setScreen({ name: "profile", user: u, welcome: true })}
        onForgot={() => setScreen({ name: "forgot-login" })}
      />
    );
  }

  if (screen.name === "forgot-login") {
    return (
      <ForgotLoginScreen
        onBack={() => setScreen({ name: "login" })}
        onFound={() => setScreen({ name: "forgot-code" })}
      />
    );
  }

  if (screen.name === "forgot-code") {
    return (
      <CodeScreen
        onBack={() => setScreen({ name: "forgot-login" })}
        onSuccess={() => setScreen({ name: "set-password" })}
      />
    );
  }

  if (screen.name === "set-password") {
    return <SetPasswordScreen onSuccess={() => setScreen({ name: "login" })} />;
  }

  const profile = screen.user === "lola" ? LOLA_PROFILE : screen.user === "viktor" ? VIKTOR_PROFILE : screen.user === "kristina" ? KRISTINA_PROFILE : screen.user === "yana" ? YANA_PROFILE : LENYA_PROFILE;

  return (
    <ProfileShell
      key={screen.user}
      profile={profile}
      welcome={screen.welcome ? screen.user : null}
      onCloseWelcome={() => setScreen({ name: "profile", user: screen.user, welcome: false })}
      onLogout={() => setScreen({ name: "login" })}
      onOpenProfile={(user) => setScreen({ name: "profile", user, welcome: false })}
    />
  );
}
