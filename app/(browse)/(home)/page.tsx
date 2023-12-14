import { UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <p>
      <UserButton afterSignOutUrl="/" />
    </p>
  );
}
