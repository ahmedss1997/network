import { DashBoard, User, List, Cart } from "@/components/svg";
import { Users } from "lucide-react";

export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick: () => void;
}

export const menusConfig = {
  mainNav: [
    {
      title: "Dashboard",
      icon: DashBoard,
      href: "/dashboard",
    },
    {
      title: "Users",
      icon: User,
      child: [
        {
          title: "Users List",
          icon: List,
          href: "/users/usersList",
        },
        {
          title: "Online Users",
          icon: List,
          href: "/users/onlineUsers",
        },
        {
          title: "Support Tickets",
          icon: List,
          href: "/users/supportTickets",
        },
      ],
    },
    {
      title: "Groups",
      icon: Users,
      href: "/groups",
    },
    {
      title: "NewGroups",
      icon: Users,
      href: "/newsGroup",
    },
    // {
    //   title: "NewUser",
    //   icon: Users,
    //   href: "/newUser",
    // },
    {
      title: "Managers",
      icon: DashBoard,
      href: "/managers",
    },
    {
      title: "Nas",
      icon: DashBoard,
      href: "/nas",
    },
    {
      title: "Cards System",
      icon: Cart,
      href: "/cards",
    },
    {
      title: "Profiles",
      icon: DashBoard,
      href: "/profile",
      child: [
        {
          title: "Profiles List",
          icon: List,
          href: "/users/profilesList",
        },
        {
          title: "Pricing List",
          icon: List,
          href: "/users/pricingList",
        },
        {
          title: "Usage Notifications",
          icon: List,
          href: "/users/notifications",
        },
        {
          title: "Addons",
          icon: List,
          href: "/users/addons",
        },
      ],
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Users",
        icon: User,
        child: [
          {
            title: "Users List",
            icon: List,
            href: "/users/usersList",
          },
          {
            title: "Online Users",
            icon: List,
            href: "/users/onlineUsers",
          },
          {
            title: "Support Tickets",
            icon: List,
            href: "/users/supportTickets",
          },
        ],
      },
      {
        title: "Groups",
        icon: Users,
        href: "/groups",
      },
      {
        title: "NewGroups",
        icon: Users,
        href: "/newsGroup",
      },
      {
        title: "NewUser",
        icon: Users,
        href: "/newUser",
      },
      {
        title: "Managers",
        icon: DashBoard,
        href: "/managers",
      },
      {
        title: "Nas",
        icon: DashBoard,
        href: "/nas",
      },
      {
        title: "Cards System",
        icon: Cart,
        href: "/cards",
      },
      {
        title: "Profiles",
        icon: DashBoard,
        href: "/profile",
        child: [
          {
            title: "Profiles List",
            icon: List,
            href: "/users/profilesList",
          },
          {
            title: "Pricing List",
            icon: List,
            href: "/users/pricingList",
          },
          {
            title: "Usage Notifications",
            icon: List,
            href: "/users/notifications",
          },
          {
            title: "Addons",
            icon: List,
            href: "/users/addons",
          },
        ],
      },
    ],
    classic: [
      {
        isHeader: true,
        title: "menu",
      },
      {
        title: "Dashboard",
        icon: DashBoard,
        href: "/dashboard",
      },
      {
        title: "Users",
        icon: User,
        child: [
          {
            title: "Users List",
            icon: List,
            href: "/users/usersList",
          },
          {
            title: "Online Users",
            icon: List,
            href: "/users/onlineUsers",
          },
          {
            title: "Support Tickets",
            icon: List,
            href: "/users/supportTickets",
          },
        ],
      },
      {
        title: "Groups",
        icon: Users,
        href: "/groups",
      },
      {
        title: "NewGroups",
        icon: Users,
        href: "/newsGroup",
      },
      {
        title: "NewUser",
        icon: Users,
        href: "/newUser",
      },
      {
        title: "Managers",
        icon: DashBoard,
        href: "/managers",
      },
      {
        title: "Nas",
        icon: DashBoard,
        href: "/nas",
      },
      {
        title: "Cards System",
        icon: Cart,
        href: "/cards",
      },
      {
        title: "Profiles",
        icon: DashBoard,
        href: "/profile",
        child: [
          {
            title: "Profiles List",
            icon: List,
            href: "/users/profilesList",
          },
          {
            title: "Pricing List",
            icon: List,
            href: "/users/pricingList",
          },
          {
            title: "Usage Notifications",
            icon: List,
            href: "/users/notifications",
          },
          {
            title: "Addons",
            icon: List,
            href: "/users/addons",
          },
        ],
      },
    ],
  },
};

export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number];
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
export type MainNavType = (typeof menusConfig.mainNav)[number];
