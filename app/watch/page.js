"use client";
import Header from "@/components/Header/Header";
import store from "@/utils/redux/store";
import { Provider } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import Watchpage from "@/components/watchpage/Watchpage";
import { redirect, useSearchParams } from "next/navigation";
import SmallHeader from "@/components/Header/SmallHeader";
export default function Home() {
  const location = useSearchParams();
  console.log(location.get("v"));
  if (location.get("v") == null) {
    redirect("/");
  } else if (location.get("v").length == 0) {
    redirect("/");
  }
  return (
    <main className="">
      <Provider store={store}>
        <div className="sticky top-0 bg-white z-50">
          <div className="hidden md:block">
            <Header />
          </div>
          <div className="md:hidden">
            <SmallHeader />
          </div>
        </div>
        <div className="flex">
          <div className="md:hidden">
            <Sidebar />
          </div>
          <div className="md:ml-12">
            <Watchpage />
          </div>
        </div>
      </Provider>
    </main>
  );
}
