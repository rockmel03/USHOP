import React from "react";
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
    link: "list/users",
    role: "",
  },
  {
    name: "sellers",
    icon: <i className="ri-user-community-line"></i>,
    link: "list/sellers",
    role: "",
  },
  {
    name: "products",
    icon: <i className="ri-list-indefinite"></i>,
    link: "list/products",
    role: "",
  },
  {
    name: "catergories",
    icon: <i className="ri-file-list-3-line"></i>,
    link: "list/categories",
    role: "",
  },
  {
    name: "orders",
    icon: <i className="ri-box-3-line"></i>,
    link: "/seller/orders",
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
