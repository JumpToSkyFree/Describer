import type { MetaFunction } from "@remix-run/node";
import Teaser from "~/components/Teaser";

export const meta: MetaFunction = () => {
  return [
    { title: "Welcome to Describer" },
    {
      name: "description",
      content:
        "Describer is a social network for artists, designers, brands, everyone.",
    },
  ];
};

export default function Index() {
  return (
    <div className="h-screen flex items-center">
      <div className="grid lg:grid-cols-12 gap-4">
        <Teaser />
      </div>
    </div>
  );
}
