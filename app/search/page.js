"use client";
import Header from "@/components/Header/Header";
import store from "@/utils/redux/store";
import { Provider } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import { redirect, useSearchParams } from "next/navigation";
import Searchpage from "@/components/search/Searchpage";
export default function Home() {
  const location = useSearchParams();
  if (location.get("query") == null) {
    redirect("/");
  } else if (location.get("query").length == 0) {
    redirect("/");
  }
  return (
    <main className="">
      <Provider store={store}>
        <div className="sticky top-0 bg-white z-50">
          <Header />
        </div>
        <div className="flex">
          <div className="">
            <Sidebar />
          </div>
          <div className="ml-12">
            <Searchpage />
          </div>
        </div>
      </Provider>
    </main>
  );
}
