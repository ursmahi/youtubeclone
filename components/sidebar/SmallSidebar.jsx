import { IconsVideoLibrary,IconsHome,IconsTrending } from "../icon-components/sidebar-icons/SidebarIconComponents";
import Link from "next/link";
const MinSlideBarCard = () => {
    const minSidebarItems = [
      { Icon: IconsHome, title: "Home", link: "/" },
      { Icon: IconsTrending, title: "Trending", link: "/trending" },
      { Icon: IconsVideoLibrary, title: "Shorts", link: "/" },
      { Icon: IconsVideoLibrary, title: "Library", link: "/" },
    ];
    return (
      <div className="flex items-center justify-between border-t bg-white">
        {minSidebarItems.map((item, index) => (
          <Link href={item.link} key={index}>
            <button className="px-3 py-4  hover:bg-gray-100 w-full rounded-lg flex flex-col items-center">
              <item.Icon className="w-7 h-6" />
              <span className="text-xs">{item.title}</span>
            </button>
          </Link>
        ))}
      </div>
    );
  };

const SmallSidebar =()=>{
    return(
        <div className="">
            <MinSlideBarCard />
        </div>
    )
}
export default SmallSidebar;