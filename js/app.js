let state = { all: [], activeCategory: "all", search: "", selectedId: null };

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

async function refresh() {
  state.all = await DTVT_DB.all();
  renderSidebar();
  renderList();
  renderDetail();
}

function renderSidebar() {
  const counts = {};
  state.all.forEach((e) => { counts[e.category] = (counts[e.category] || 0) + 1; });
  const total = state.all.length;

  let html = `
    <div class="sidebar-group">
      <div class="sidebar-item ${state.activeCategory === "all" ? "active" : ""}" data-cat="all">
        <span>📚 Tất cả</span><span class="n">${total}</span>
      </div>
    </div>
    <div class="sidebar-group">
      <div class="sidebar-group-title">13 Quyển Canon</div>
  `;
  CATEGORY_ORDER.forEach((cat) => {
    const def = CATEGORIES[cat];
    const n = counts[cat] || 0;
    html += `
      <div class="sidebar-item ${state.activeCategory === cat ? "active" : ""}" data-cat="${cat}">
        <span>${def.label}</span><span class="n">${n}</span>
      </div>
    `;
  });
  html += `</div>`;
  $("#sidebar").innerHTML = html;

  $$(".sidebar-item").forEach((el) => {
    el.addEventListener("click", () => {
      state.activeCategory = el.dataset.cat;
      state.selectedId = null;
      renderSidebar();
      renderList();
      renderDetail();
    });
  });
}

function filteredEntries() {
  let list = state.all;
  if (state.activeCategory !== "all") {
    list = list.filter((e) => e.category === state.activeCategory);
  }
  const q = state.search.trim().toLowerCase();
  if (q) {
    list = list.filter((e) => {
      const hay = [e.name, e.summary, e.id, ...(e.tags || []), JSON.stringify(e.fields || {})]
        .join(" ").toLowerCase();
      return hay.includes(q);
    });
  }
  return list.sort((a, b) => (a.name || "").localeCompare(b.name || "", "vi"));
}

function renderList() {
  const list = filteredEntries();
  const title = state.activeCategory === "all" ? "Tất cả" : CATEGORIES[state.activeCategory].label;
  $("#listTitle").textContent = title;
  $("#listCount").textContent = `${list.length} mục`;

  if (list.length === 0) {
    $("#entryList").innerHTML = `<div class="empty-state">Chưa có mục nào. Bấm "+ Mục mới" để thêm Canon đầu tiên.</div>`;
    return;
  }

  $("#entryList").innerHTML = list.map((e) => {
    const def = CATEGORIES[e.category] || {};
    return `
      <div class="entry-card ${state.selectedId === e.id ? "selected" : ""}" data-id="${e.id}">
        <div class="row1">
          <span class="name">${escapeHtml(e.name)}</span>
          <span class="tag">${def.label || e.category}</span>
        </div>
        <div class="summary">${escapeHtml((e.summary || "").slice(0, 140))}</div>
        <div class="row1" style="margin-top:6px;">
          <span class="id-chip">${e.id}</span>
          <span class="status status-${e.status}">${e.status}</span>
        </div>
      </div>
    `;
  }).join("");

  $$(".entry-card").forEach((el) => {
    el.addEventListener("click", () => {
      state.selectedId = el.dataset.id;
      renderList();
      renderDetail();
    });
  });
}

function renderDetail() {
  const panel = $("#detailPanel");
  if (!state.selectedId) {
    panel.classList.add("hidden");
    return;
  }
  const entry = state.all.find((e) => e.id === state.selectedId);
  if (!entry) { panel.classList.add("hidden"); return; }
  panel.classList.remove("hidden");

  const def = CATEGORIES[entry.category] || {};
  let fieldsHtml = "";
  (def.fields || []).forEach((f) => {
    const val = (entry.fields || {})[f];
    if (val === undefined || val === "" || val === null) return;
    fieldsHtml += `
      <div class="field-block">
        <div class="field-label">${humanizeField(f)}</div>
        <div class="field-value">${escapeHtml(String(val))}</div>
      </div>
    `;
  });

  $("#detailInner").innerHTML = `
    <span class="id-chip">${entry.id}</span>
    <h2>${escapeHtml(entry.name)}</h2>
    <div class="field-block">
      <div class="field-label">Loại · Quyển</div>
      <div class="field-value">${def.label} · Quyển ${def.quyen}</div>
    </div>
    <div class="field-block">
      <div class="field-label">Trạng thái Canon</div>
      <div class="field-value"><span class="status status-${entry.status}">${entry.status}</span></div>
    </div>
    <div class="field-block">
      <div class="field-label">Tóm tắt</div>
      <div class="field-value">${escapeHtml(entry.summary || "—")}</div>
    </div>
    ${fieldsHtml}
    <div class="detail-actions">
      <button class="btn primary" id="btnEdit">Sửa</button>
      <button class="btn danger" id="btnDelete">Xóa</button>
    </div>
  `;

  $("#btnEdit").addEventListener("click", () => openEditor(entry));
  $("#btnDelete").addEventListener("click", async () => {
    if (confirm(`Xóa "${entry.name}" khỏi Canon? Hành động không thể hoàn tác.`)) {
      await DTVT_DB.remove(entry.id);
      state.selectedId = null;
      await refresh();
    }
  });
}

function humanizeField(f) {
  return f.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}function openEditor(existing) {
  const isEdit = !!existing;
  const category = existing ? existing.category : (state.activeCategory !== "all" ? state.activeCategory : "lore");

  const categoryOptions = CATEGORY_ORDER.map((c) =>
    `<option value="${c}" ${c === category ? "selected" : ""}>${CATEGORIES[c].label}</option>`
  ).join("");

  const statusOptions = STATUS_OPTIONS.map((s) =>
    `<option value="${s}" ${existing && existing.status === s ? "selected" : ""}>${s}</option>`
  ).join("");

  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-box">
      <h3>${isEdit ? "Sửa mục Canon" : "Thêm mục Canon mới"}</h3>
      <div class="form-row">
        <label>Loại (Quyển)</label>
        <select id="f_category">${categoryOptions}</select>
      </div>
      <div class="form-row">
        <label>Tên</label>
        <input id="f_name" type="text" value="${existing ? escapeAttr(existing.name) : ""}" placeholder="Vd: Lâm Vô Trần" />
      </div>
      <div class="form-row">
        <label>Tóm tắt</label>
        <textarea id="f_summary">${existing ? existing.summary || "" : ""}</textarea>
      </div>
      <div class="form-row">
        <label>Trạng thái Canon</label>
        <select id="f_status">${statusOptions}</select>
      </div>
      <div id="dynamicFields"></div>
      <div class="modal-actions">
        <button class="btn ghost" id="btnCancel">Hủy</button>
        <button class="btn primary" id="btnSave">${isEdit ? "Lưu thay đổi" : "Tạo mục"}</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  function renderDynamicFields(cat) {
    const def = CATEGORIES[cat];
    const box = modal.querySelector("#dynamicFields");
    box.innerHTML = (def.fields || []).map((f) => {
      const val = existing && cat === existing.category ? (existing.fields || {})[f] || "" : "";
      return `
        <div class="form-row">
          <label>${humanizeField(f)}</label>
          <textarea data-field="${f}" style="min-height:44px;">${escapeHtml(String(val))}</textarea>
        </div>
      `;
    }).join("");
  }
  renderDynamicFields(category);

  modal.querySelector("#f_category").addEventListener("change", (e) => renderDynamicFields(e.target.value));
  modal.querySelector("#btnCancel").addEventListener("click", () => modal.remove());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });

  modal.querySelector("#btnSave").addEventListener("click", async () => {
    const cat = modal.querySelector("#f_category").value;
    const name = modal.querySelector("#f_name").value.trim();
    if (!name) { alert("Vui lòng nhập Tên."); return; }
    const summary = modal.querySelector("#f_summary").value.trim();
    const status = modal.querySelector("#f_status").value;
    const fields = {};
    modal.querySelectorAll("[data-field]").forEach((el) => {
      fields[el.dataset.field] = el.value.trim();
    });

    const entry = existing
      ? { ...existing, category: cat, name, summary, status, fields, updatedAt: Date.now() }
      : {
          id: genId(CATEGORIES[cat].prefix),
          category: cat, name, summary, status, fields, tags: [],
          createdAt: Date.now(), updatedAt: Date.now(),
        };

    await DTVT_DB.put(entry);
    modal.remove();
    state.selectedId = entry.id;
    await refresh();
  });
}

function escapeAttr(str) { return String(str).replace(/"/g, "&quot;"); }

async function exportJson() {
  const all = await DTVT_DB.all();
  const blob = new Blob([JSON.stringify(all, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dtvt-canon-export-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!Array.isArray(data)) throw new Error("File JSON phải là một mảng các mục Canon.");
      await DTVT_DB.bulkPut(data);
      await refresh();
      alert(`Đã nhập ${data.length} mục.`);
    } catch (err) {
      alert("Lỗi khi nhập file: " + err.message);
    }
  };
  reader.readAsText(file);
}

window.addEventListener("DOMContentLoaded", async () => {
  await ensureSeeded();
  await refresh();

  $("#globalSearch").addEventListener("input", (e) => {
    state.search = e.target.value;
    renderList();
  });

  $("#btnNew").addEventListener("click", () => openEditor(null));
  $("#btnExport").addEventListener("click", exportJson);
  $("#btnImport").addEventListener("click", () => $("#importFile").click());
  $("#importFile").addEventListener("change", (e) => {
    if (e.target.files[0]) importJson(e.target.files[0]);
    e.target.value = "";
  });
});
