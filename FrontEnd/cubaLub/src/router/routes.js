const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/",
        name: "Principal",
        component: () => import("pages/Index.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("pages/Login.vue"),
      },
      {
        path: "/cambiarpass",
        name: "Cambiar_Password",
        component: () => import("src/pages/Cambiar_pass.vue"),
      },
      {
        path: "/entermail",
        name: "Entrar_Email",
        component: () => import("src/pages/Enter_mail.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
