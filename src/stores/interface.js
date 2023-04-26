import { defineStore } from "pinia";

export const useInterfaceStore = defineStore("interface", {
  state: () => ({
    isDark: true, // 'light' or 'dark'
  }),
  getters: {
    isDarkTheme() {
      return this.isDark;
    },
  },
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem("color-theme", this.isDark ? "dark" : "light");
      document.body.classList.toggle("dark", this.isDark);
    },
    setTheme(isDark) {
      this.isDark = isDark;
      localStorage.setItem("color-theme", this.isDark ? "dark" : "light");
      document.body.classList.toggle("dark", this.isDark);
    },
  },
});
