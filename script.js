const config = window.LEADGEN_SITE_CONFIG;

const setText = (selector, text) => {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = text;
  });
};

const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

const renderList = (selector, items, className) => {
  const container = document.querySelector(selector);
  if (!container) return;

  container.innerHTML = "";
  items.forEach((item) => {
    container.appendChild(createElement("span", className, item));
  });
};

const renderCards = () => {
  const container = document.querySelector("[data-problems]");
  if (!container) return;

  container.innerHTML = "";
  config.problems.forEach((problem) => {
    const article = createElement("article", "card service-card");
    if (problem.image) {
      const image = createElement("img", "card-thumb");
      image.src = problem.image;
      image.alt = problem.imageAlt || problem.title;
      article.appendChild(image);
    }
    article.appendChild(createElement("h3", null, problem.title));
    article.appendChild(createElement("p", null, problem.text));
    if (problem.href) {
      const link = createElement("a", "text-link", `Learn more about ${problem.title.toLowerCase()} →`);
      link.href = problem.href;
      article.appendChild(link);
    }
    container.appendChild(article);
  });
};

const renderSteps = () => {
  const container = document.querySelector("[data-steps]");
  if (!container) return;

  container.innerHTML = "";
  config.steps.forEach((step, index) => {
    const article = createElement("article", "step");
    article.appendChild(createElement("span", "step-number", String(index + 1)));
    article.appendChild(createElement("h3", null, step.title));
    article.appendChild(createElement("p", null, step.text));
    container.appendChild(article);
  });
};

const renderFaq = () => {
  const container = document.querySelector("[data-faq]");
  if (!container) return;

  container.innerHTML = "";
  config.faqs.forEach((faq) => {
    const details = createElement("details", "faq-item");
    details.appendChild(createElement("summary", null, faq.question));
    details.appendChild(createElement("p", null, faq.answer));
    container.appendChild(details);
  });
};

const renderHeroBullets = () => {
  const container = document.querySelector("[data-hero-bullets]");
  if (!container) return;

  container.innerHTML = "";
  config.heroBullets.forEach((item) => {
    container.appendChild(createElement("li", null, item));
  });
};

const bindNavigation = () => {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    menu.classList.toggle("is-open");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    });
  });
};

const applyConfig = () => {
  if (!config) return;

  document.title = config.seoTitle;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", config.metaDescription);
  }
  setText("[data-site-name]", config.siteName);
  setText("[data-disclaimer]", config.disclaimer);
  setText("[data-service-eyebrow]", config.serviceEyebrow);
  setText("[data-hero-title]", config.heroTitle);
  setText("[data-hero-text]", config.heroText);
  setText("[data-footer-description]", config.footerDescription);

  document.querySelectorAll("[data-cta-link]").forEach((link) => {
    link.href = config.ctaFormUrl;
  });

  document.querySelectorAll("[data-phone-link]").forEach((link) => {
    link.href = config.phoneHref;
  });

  setText("[data-phone-display]", config.phoneDisplay);

  renderHeroBullets();
  renderCards();
  renderList("[data-service-areas]", config.primaryAreas, "area-pill");
  renderSteps();
  renderFaq();
};

applyConfig();
bindNavigation();

const leadForm=document.querySelector("[data-lead-form]");const formStatus=document.querySelector("[data-form-status]");if(leadForm&&formStatus){leadForm.addEventListener("submit",async(event)=>{event.preventDefault();const button=leadForm.querySelector('button[type="submit"]');const label=button.textContent;button.disabled=true;button.textContent="Sending…";formStatus.textContent="";formStatus.className="form-status";try{const response=await fetch(leadForm.action,{method:"POST",body:new FormData(leadForm)});const result=await response.json();if(!response.ok||!result.success)throw new Error("Submission failed");leadForm.reset();formStatus.textContent="Thank you—your request was sent. Please keep your phone nearby.";formStatus.classList.add("is-success")}catch(error){formStatus.textContent="Your request could not be sent. Please call (951) 625-1510 instead.";formStatus.classList.add("is-error")}finally{button.disabled=false;button.textContent=label}})}
