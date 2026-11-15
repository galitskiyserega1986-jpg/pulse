import { useState } from "react";
import { LoginScreen, ForgotLoginScreen, CodeScreen } from "./components/AuthScreens";
import { ProfileShell } from "./components/ProfileShell";
import { LOLA_PROFILE, VIKTOR_PROFILE } from "./game/profiles";

type Screen =
  | { name: "login" }
  | { name: "forgot-login" }
  | { name: "forgot-code" }
  | { name: "profile"; user: "lola" | "viktor"; welcome: boolean };

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
        onSuccess={() => setScreen({ name: "profile", user: "lola", welcome: true })}
      />
    );
  }

  const profile = screen.user === "lola" ? LOLA_PROFILE : VIKTOR_PROFILE;

  return (
    <ProfileShell
      key={screen.user}
      profile={profile}
      welcome={screen.welcome ? screen.user : null}
      onCloseWelcome={() => setScreen({ name: "profile", user: screen.user, welcome: false })}
      onLogout={() => setScreen({ name: "login" })}
    />
  );
}
