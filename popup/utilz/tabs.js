const tabSystem = {
  init() {
    document.querySelectorAll(".tabs-menu").forEach((tabMenu) => {
      Array.from(tabMenu.children).forEach((child, ind) => {
        child.addEventListener("click", () => {
          tabSystem.toggle(child.dataset.target);
        });
        if (child.className.includes("is-active")) {
          tabSystem.toggle(child.dataset.target);
        }
      });
    });
  },
  toggle(targetId) {
    document.querySelectorAll(".tab-content").forEach((contentElement) => {
      contentElement.style.display =
        contentElement.id === targetId ? "block" : "none";
      document
        .querySelector(`[data-target="${contentElement.id}"]`)
        .classList[contentElement.id === targetId ? "add" : "remove"](
          "is-active"
        );
    });
  },
};
// use it
tabSystem.init();
