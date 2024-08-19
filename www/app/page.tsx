import { getScreenshotCount } from "@/actions/screenshot-count";
import { NumberOfUses } from "@/components/number-of-uses";
import { SearchComponent } from "@/components/search-component";
import { FEATURES } from "@/constants";

export default async function Home() {
  const getScreenshotCountResult = await getScreenshotCount();

  return (
    <main className="flex-1 flex flex-col items-center pt-52 gap-10">
      <h1 className="text-[5rem] leading-none font-extrabold [word-spacing:5px] tracking-tight">
        Snapshot Your Website
      </h1>

      <h2 className="text-xl text-zinc-500 font-light ">
        Take perfect website snapshots with this user-friendly screenshot tool.
      </h2>

      <div className="flex flex-col items-center gap-8 w-full">
        <SearchComponent />
        {getScreenshotCountResult.success && (
          <NumberOfUses data={{ count: getScreenshotCountResult.count }} />
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
        {FEATURES.map((feature, index) => (
          <div key={index} className="border p-4 flex flex-col gap-2 shadow-sm">
            <h2 className="text-xl font-medium text-black">{feature.title}</h2>
            <p className="text-zinc-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
