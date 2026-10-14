"use strict";

// Small, local line icons keep every screen visually consistent.
(() => {
    const paths = {
        "⌖": '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>',
        "🔍": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>',
        "📦": '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 5v10l9 5 9-5V8M12 13v10M7.5 5.5l9 5"/>',
        "🔔": '<path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5l-2 3Zm5 3h4M12 2v2"/>',
        "💬": '<path d="M21 11a9 9 0 0 1-9 9c-2 0-4-.5-5.5-1.5L3 20l1.5-3.5A9 9 0 1 1 21 11Z"/><path d="M8 10h8m-8 4h5"/>',
        "📍": '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        "🗺️": '<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16"/>',
        "🔎": '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>',
        "🐾": '<ellipse cx="7" cy="7" rx="2" ry="3"/><ellipse cx="17" cy="7" rx="2" ry="3"/><ellipse cx="3" cy="12" rx="1.5" ry="2"/><ellipse cx="21" cy="12" rx="1.5" ry="2"/><path d="M6 18c0-3 4-7 6-7s6 4 6 7c0 4-4 2-6 2s-6 2-6-2Z"/>',
        "📱": '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/>',
        "👛": '<rect x="3" y="7" width="18" height="14" rx="3"/><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M3 12h18"/><path d="M14 15h7v4h-7z"/>',
        "🔑": '<circle cx="8" cy="8" r="5"/><path d="m11.5 11.5 9 9m-3-3 3-3m-6 0 3-3"/><circle cx="7" cy="7" r="1"/>',
        "📄": '<path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 12h8m-8 4h8"/>',
        "⌚": '<rect x="6" y="6" width="12" height="12" rx="4"/><path d="M8 6V2h8v4M8 18v4h8v-4m-4-9v4l2 1"/>',
        "👕": '<path d="m8 3-6 4 3 5 3-2v11h8V10l3 2 3-5-6-4a4 4 0 0 1-8 0Z"/>',
        "🎒": '<rect x="5" y="6" width="14" height="16" rx="4"/><path d="M9 6V4a3 3 0 0 1 6 0v2M8 14h8v5H8v-5Zm1-4h6"/>',
        "⚽": '<circle cx="12" cy="12" r="9"/><path d="m12 7 5 4-2 6H9l-2-6 5-4ZM12 3v4m-9 5 4-1m13 1-3-1m-1 8-1-2m-7 2 1-2"/>',
        "🧸": '<circle cx="7" cy="6" r="3"/><circle cx="17" cy="6" r="3"/><circle cx="12" cy="9" r="6"/><ellipse cx="12" cy="18" rx="5" ry="4"/><path d="M10 9h.01M14 9h.01m-3 3h2M7 16l-3 2m13-2 3 2"/>',
        "📷": '<path d="M3 7h4l2-3h6l2 3h4v14H3V7Z"/><circle cx="12" cy="13" r="4"/>',
        "🖼️": '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="2"/><path d="m3 17 5-5 4 4 4-6 5 7"/>',
        "🚫": '<circle cx="12" cy="12" r="9"/><path d="m6 6 12 12"/>',
        "📊": '<path d="M4 21V11h4v10m2 0V3h4v18m2 0V7h4v14M2 21h20"/>',
        "📋": '<rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M9 11h6m-6 5h6"/>',
        "🧠": '<path d="M12 4c-4-4-8 0-7 3-4 0-4 6-1 7-2 4 2 7 5 5 0 3 3 3 3 0V4Zm0 0c4-4 8 0 7 3 4 0 4 6 1 7 2 4-2 7-5 5 0 3-3 3-3 0M5 7l3 2m-4 5 4-1m11-6-3 2m4 5-4-1"/>',
        "🆕": '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8m-8 4h8m-8 4h4m3-1v4m-2-2h4"/>',
        "📞": '<path d="m7 3 3 5-3 3c1 3 3 5 6 6l3-3 5 3c-1 4-4 5-7 3C8 18 6 16 3 10 1 7 3 4 7 3Z"/>',
        "✅": '<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>',
        "🔒": '<rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3"/>'
    };
    function decorate(root) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const replacements = [];
        while (walker.nextNode()) {
            const node = walker.currentNode;
            if (paths[node.textContent.trim()] && !node.parentElement.closest("script, style, svg, option")) {
                replacements.push(node);
            }
        }
        replacements.forEach(node => {
            const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            icon.setAttribute("viewBox", "0 0 24 24");
            icon.setAttribute("class", "ui-icon");
            icon.setAttribute("aria-hidden", "true");
            const title = document.createElementNS("http://www.w3.org/2000/svg", "title");
            title.textContent = node.textContent.trim();
            icon.innerHTML = paths[node.textContent.trim()];
            icon.prepend(title);
            node.replaceWith(icon);
        });
    }
    decorate(document.body);
    const observer = new MutationObserver(records => {
        records.forEach(record => record.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== "svg") decorate(node);
        }));
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
