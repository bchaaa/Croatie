import { redirect } from "next/navigation";

// La racine redirige vers la vue « Aujourd'hui ».
export default function Home() {
  redirect("/aujourd-hui");
}
