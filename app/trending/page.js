"use client";
import Header from "@/components/Header/Header";
import store from "@/utils/redux/store";
import { Provider } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import Trendingpage from "@/components/Trending/Trendingpage";
import SmallHeader from "@/components/Header/SmallHeader";
import SmallSidebar from "@/components/sidebar/SmallSidebar";
import Searchpage from "@/components/search/Searchpage";
export default function Home() {
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
            <Trendingpage />
          </div>
        </div>
        <div className="sticky bottom-0 mb-0 bg-white z-50 md:hidden">
          <SmallSidebar />
        </div>
      </Provider>
    </main>
  );
}
