"use client";
import Header from "@/components/Header/Header";
import store from "@/utils/redux/store";
import { Provider } from "react-redux";
import Sidebar from "@/components/sidebar/Sidebar";
import Watchpage from "@/components/watchpage/Watchpage";
import { redirect, useSearchParams } from "next/navigation";
export default function Home() {
  const location = useSearchParams()
  console.log(location.get('v')
  )
  if(location.get('v')==null){
    redirect('/')
  }
  else if(location.get('v').length==0){
    redirect('/')
  }
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
            <Watchpage />
          </div>
        </div>
      </Provider>
    </main>
  );
}
