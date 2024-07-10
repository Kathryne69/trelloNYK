import { SignIn } from "@clerk/nextjs";
import { Logo } from "@/components/logo";

export default function Page() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Logo  />
      <SignIn />
    </div>
  );
}
