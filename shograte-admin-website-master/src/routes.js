import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";

import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";

import Login from "views/Login.js";
import ForgetPassword from "views/ForgetPassword.js";
import ForgetPasswordVerifyOtp from "views/ForgetPasswordVerifyOtp";
import UpdatePassword from "views/UpdatePassword";

import Roles from "views/Roles";
import Categories from "views/categories";
import SubCategories from "views/SubCategories";
import Vendors from "views/Vendors";
import UserPrivileges from "views/UserPrivileges";
import AdminUsers from "views/AdminUsers";
import Products from "views/Products";
import Settings from "views/Settings";
import Deals from "views/Deals";

import Orders from "views/Orders";


var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-tv-2 text-primary",
    component: AdminUsers,
    layout: "/admin",
  },


  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   icon: "ni ni-single-02 text-yellow",
  //   component: Profile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: Tables,
  //   layout: "/admin",
  // },
   {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },

  {
    path: "/forget-password",
    name: "Forget Password",
    icon: "ni ni-key-25 text-info",
    component: ForgetPassword,
    layout: "/auth",
  },
  {
    path: "/verify-otp",
    name: "Verify Password OTP",
    icon: "ni ni-key-25 text-info",
    component: ForgetPasswordVerifyOtp,
    layout: "/auth",
  },
  {
    path: "/update-password",
    name: "Update Password",
    icon: "ni ni-key-25 text-info",
    component: UpdatePassword,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },

  {
    path: "/roles",
    name: "Roles",
    icon: "ni ni-book-bookmark",
    component: Roles,
    layout: "/admin",
    
  },

  {
    path: "/categories",
    name: "Categories",
    icon: "ni ni-book-bookmark",
    component: Categories,
    layout: "/admin",
    
  },
  {
    path: "/subcategories",
    name: "Sub Categories",
    icon: "ni ni-book-bookmark",
    component: SubCategories,
    layout: "/admin",
    
  },

  {
    path: "/vendor",
    name: "Vendors",
    icon: "ni ni-single-02",
    component: Vendors,
    layout: "/admin",    
  },

  {
    path: "/products",
    name: "Products",
    icon: "ni ni-archive-2",
    component: Products,
    layout: "/admin",    
  },

  {
    path: "/deals",
    name: "Deals",
    icon: "ni ni-money-coins",
    component: Deals,
    layout: "/admin",    
  },


  // user privileges
  {
    path: "/user-privileges/:id",
    name: "User Privileges",
    icon: "ni ni-single-02",
    component: UserPrivileges,
    layout: "/admin",
    
  },

  {
    path: "/orders",
    name: "Orders",
    icon: "ni ni-archive-2",
    component: Orders,
    layout: "/admin",    
  },

  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-archive-2",
    component: Settings,
    layout: "/admin",    
  },


  

];
export default routes;
