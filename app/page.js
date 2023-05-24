"use client";
import Header from "@/components/Header/Header";
import store from "@/utils/redux/store";
import { Provider } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import Homepage from "@/components/Home/Homepage";
export default function Home() {
  return (
    <main className="">
      <Provider store={store}>
        <div className="sticky top-0 bg-white z-50">
          <Header />
        </div>
        <div
          className="flex">
          <div className="">
            <Sidebar />
          </div>
          <div className="ml-12">
            <Homepage />
          </div>
        </div>
      </Provider>
    </main>
  );
}
