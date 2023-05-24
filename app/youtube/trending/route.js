import { NextResponse } from "next/server";
import { YouTube } from "youtube-sr";

export async function GET(request) {
  let ytData;
  await YouTube.trending()
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
