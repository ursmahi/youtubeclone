import { NextResponse } from "next/server";
import { YouTube } from "youtube-sr";
import { Innertube } from "youtubei.js/web";

export async function GET(request) {
  // const YouTube = await Innertube.create({
  //   fetch: (input, init) => fetch(input, init),
  // });
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  let ytData;
  await YouTube.homepage()
    .then((data) => {
        ytData = data;
        // ytData = data?.contents?.contents;
    })
    .catch((error) => {
      console.log(error);
      ytData = { error: "Error" };
    });
  const data = ytData;

  return NextResponse.json(data);
}
