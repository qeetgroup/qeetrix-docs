/**
 * The navigation rail keeps its place from page to page. A click on a link in the rail saves where
 * that link sat in the rail's list; the next page scrolls its list so the current page sits in the
 * same place, under the pointer. Without a saved place (a first visit, a link in the page, the
 * header or the search), a current page out of sight is scrolled to the middle of the list.
 * Inlined after the rail (DocsLayout), so the list is placed before the first paint.
 */
export const railPlaceScript = `(() => {
  const list = document.querySelector(".doc-nav .qx-sidebar-nav");
  if (!list) return;
  const key = "qx-doc-nav-place";
  const path = (url) => new URL(url, location.href).pathname.replace(/\\/$/, "");
  const offset = (el) => el.getBoundingClientRect().top - list.getBoundingClientRect().top;
  let saved = null;
  try {
    saved = JSON.parse(sessionStorage.getItem(key) || "null");
    sessionStorage.removeItem(key);
  } catch {}
  const current = list.querySelector('[data-doc-nav-tree] [aria-current="page"]');
  if (current) {
    if (saved && saved.path === path(location.href)) list.scrollTop += offset(current) - saved.top;
    else if (offset(current) < 0 || offset(current) + current.offsetHeight > list.clientHeight)
      list.scrollTop += offset(current) - (list.clientHeight - current.offsetHeight) / 2;
  }
  list.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    try {
      sessionStorage.setItem(key, JSON.stringify({ path: path(link.href), top: offset(link) }));
    } catch {}
  });
})();`;
