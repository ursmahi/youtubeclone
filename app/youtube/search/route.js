import { NextResponse } from "next/server";
import { YouTube } from "youtube-sr";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const search_query = searchParams.get('query');
  let ytData;
  await YouTube.search(search_query)
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
