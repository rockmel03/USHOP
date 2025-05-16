import { NavLink } from "react-router-dom";

const links = [
  {
    name: "dashboard",
    icon: <i className="ri-dashboard-line"></i>,
    link: "/dashboard",
    role: "",
  },
  {
    name: "users",
    icon: <i className="ri-group-line"></i>,
    link: "admin/users",
    role: "admin",
  },
  {
    name: "sellers",
    icon: <i className="ri-user-community-line"></i>,
    link: "admin/sellers",
    role: "admin",
  },
  {
    name: "products",
    icon: <i className="ri-list-indefinite"></i>,
    link: "products",
    role: "",
  },
  {
    name: "catergories",
    icon: <i className="ri-file-list-3-line"></i>,
    link: "categories",
    role: "",
  },
  {
    name: "orders",
    icon: <i className="ri-box-3-line"></i>,
    link: "orders",
    role: "",
  },
];

export default function SideNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-1">
        {links.map((item, idx) => {
          return (
            <NavLink
              key={idx}
              to={item.link}
              className={({ isActive }) =>
                `ml-4 hover:bg-zinc-200 rounded-l-md ${
                  isActive ? "bg-zinc-200" : ""
                }`
              }
            >
              <li className="font-medium cursor-pointer transition duration-200 ease flex items-center">
                <span className="m-3 text-xl">{item.icon}</span>
                <span className="capitalize">{item.name}</span>
              </li>
            </NavLink>
          );
        })}
      </ul>
    </nav>
  );
}
