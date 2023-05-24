"use client";
import Header from "@/components/Header/Header";
import store from "@/utils/redux/store";
import { Provider } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import { redirect, useSearchParams } from "next/navigation";
import Searchpage from "@/components/search/Searchpage";
import SmallHeader from "@/components/Header/SmallHeader";
import SmallSidebar from "@/components/sidebar/SmallSidebar";
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
          <div className="hidden md:block">
            <Header />
          </div>
          <div className="md:hidden">
            <SmallHeader />
          </div>
        </div>
        <div className="flex">
          <div className="hidden md:block">
            <Sidebar />
          </div>
          <div className="md:ml-12">
            <Searchpage />
          </div>
        </div>
        <div className="sticky bottom-0 mb-0 bg-white z-50 md:hidden">
          <SmallSidebar />
        </div>
      </Provider>
    </main>
  );
}
