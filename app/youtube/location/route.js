import { NextResponse } from "next/server";
// import { YouTube } from "youtube-sr";
import { Innertube } from "youtubei.js/web";

export async function GET(request) {
  const YouTube = await Innertube.create({
    fetch: (input, init) => fetch(input, init),
  });
  let ytData;
  await YouTube.getHomeFeed()
    .then((data) => {
      ytData = data;
    })
    .catch((error) => {
      console.log(error);
      ytData = { error: "Error" };
    });
  const data = ytData;

  return NextResponse.json(data);
}
