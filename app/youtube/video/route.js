import { NextResponse } from "next/server";
import { YouTube } from "youtube-sr";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  let ytData;
  await YouTube.getVideo(`https://www.youtube.com/watch?v=${id}`)
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
