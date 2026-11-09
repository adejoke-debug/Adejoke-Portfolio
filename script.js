// Shared interactions for the portfolio website.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
      menuButton.textContent = isOpen ? "×" : "☰";
    });
  }

  // Academic planner: array state + DOM rendering + localStorage persistence.
  const taskForm = document.querySelector("#task-form");
  if (taskForm) {
    const STORAGE_KEY = "eunicePortfolioTasks";
    let tasks = [];
    try { tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { tasks = []; }
    let activeFilter = "all";
    const list = document.querySelector("#task-list");
    const titleInput = document.querySelector("#task-title");
    const dateInput = document.querySelector("#task-date");
    const priorityInput = document.querySelector("#task-priority");
    const today = new Date();
    document.querySelector("#planner-date").textContent = today.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });

    const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    const render = () => {
      const completed = tasks.filter(task => task.completed).length;
      const percent = tasks.length ? Math.round(completed / tasks.length * 100) : 0;
      document.querySelector("#progress-number").textContent = `${percent}%`;
      document.querySelector("#progress-fill").style.width = `${percent}%`;
      document.querySelector("#progress-caption").textContent = `${completed} of ${tasks.length} tasks completed`;
      document.querySelector("#task-count").textContent = `${tasks.length} ${tasks.length === 1 ? "TASK" : "TASKS"}`;
      const visible = tasks.filter(task => activeFilter === "all" || (activeFilter === "active" && !task.completed) || (activeFilter === "completed" && task.completed));
      list.innerHTML = "";
      if (!visible.length) {
        const empty = document.createElement("li");
        empty.className = "empty-state";
        empty.textContent = tasks.length ? "Nothing in this view just yet." : "Your list is clear. Add your first task above ✳";
        list.append(empty); return;
      }
      visible.forEach(task => {
        const item = document.createElement("li");
        item.className = `task-item${task.completed ? " is-complete" : ""}`;
        const check = document.createElement("input");
        check.type = "checkbox"; check.checked = task.completed; check.setAttribute("aria-label", `Mark ${task.title} completed`);
        check.addEventListener("change", () => { task.completed = check.checked; save(); render(); });
        const content = document.createElement("div"); content.className = "task-content";
        const name = document.createElement("b"); name.textContent = task.title;
        const meta = document.createElement("span");
        const due = task.date ? `Due ${new Date(`${task.date}T00:00:00`).toLocaleDateString(undefined, {day:"numeric", month:"short"})}` : "No due date";
        meta.textContent = `${due} · ${task.priority}`;
        content.append(name, meta);
        const priority = document.createElement("span"); priority.className = `priority priority-${task.priority.toLowerCase()}`; priority.textContent = task.priority;
        const remove = document.createElement("button"); remove.type = "button"; remove.className = "delete-task"; remove.textContent = "×"; remove.setAttribute("aria-label", `Delete ${task.title}`);
        remove.addEventListener("click", () => { tasks = tasks.filter(entry => entry.id !== task.id); save(); render(); });
        item.append(check, content, priority, remove); list.append(item);
      });
    };
    taskForm.addEventListener("submit", event => {
      event.preventDefault();
      const title = titleInput.value.trim();
      if (!title) { titleInput.focus(); return; }
      tasks.unshift({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, title, date: dateInput.value, priority: priorityInput.value, completed: false });
      save(); render(); taskForm.reset(); titleInput.focus();
    });
    document.querySelectorAll(".filter-btn").forEach(button => button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.toggle("selected", btn === button));
      render();
    }));
    render();
  }

  // Contact form validation: required fields, email format and digits-only phone.
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const fields = {
        name: document.querySelector("#full-name"),
        email: document.querySelector("#email"),
        phone: document.querySelector("#phone"),
        message: document.querySelector("#message")
      };
      const errors = {
        name: fields.name.value.trim() ? "" : "Please enter your name.",
        email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.value.trim()) ? "" : "Enter a valid email address.",
        phone: /^\d+$/.test(fields.phone.value.trim()) ? "" : "Use digits only, with no spaces or symbols.",
        message: fields.message.value.trim() ? "" : "Please write a message."
      };
      let valid = true;
      Object.entries(fields).forEach(([key, input]) => {
        const error = input.parentElement.querySelector(".field-error");
        error.textContent = errors[key];
        input.classList.toggle("invalid", Boolean(errors[key]));
        if (errors[key]) valid = false;
      });
      const feedback = document.querySelector("#form-feedback");
      if (!valid) {
        feedback.textContent = "Please check the highlighted fields and try again.";
        feedback.className = "form-feedback error";
        contactForm.querySelector(".invalid")?.focus();
        return;
      }
      feedback.textContent = "Your details look good. Your email app will open with the message ready to send.";
      feedback.className = "form-feedback success";
      const subject = encodeURIComponent(`Portfolio message from ${fields.name.value.trim()}`);
      const body = encodeURIComponent(`Name: ${fields.name.value.trim()}\nEmail: ${fields.email.value.trim()}\nPhone: ${fields.phone.value.trim()}\n\nMessage:\n${fields.message.value.trim()}`);
      // Replace this placeholder with the student's real email address before publishing.
      window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
    });
    contactForm.querySelectorAll("input, textarea").forEach(input => input.addEventListener("input", () => {
      input.classList.remove("invalid");
      input.parentElement.querySelector(".field-error").textContent = "";
    }));
  }
});