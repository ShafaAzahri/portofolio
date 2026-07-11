import prisma from "@/lib/prisma";
import ProfileForm from "./ProfileForm";

export default async function ProfileAdminPage() {
  let profile = await prisma.profile.findUnique({
    where: { id: 1 },
  });

  // If for some reason the seed failed or didn't run, create a default in memory
  // but it should exist.
  if (!profile) {
    profile = {
      id: 1,
      name: "",
      headline: "",
      shortBio: "",
      email: "",
      linkedinUrl: "",
      githubUrl: "",
      heroTerminal1: "",
      heroTerminal2: "",
      heroTerminal3: "",
      aboutTitle: "",
      aboutDescription: "",
      location: "",
      focus: "",
      updatedAt: new Date(),
    };
  }

  return (
    <div>
      <ProfileForm profile={profile} />
    </div>
  );
}
