diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..92c6f16e1687984dcc192111639a08a909146ab4
--- /dev/null
+++ b/script.js
@@ -0,0 +1,33 @@
+const tabs = document.querySelectorAll('.tab');
+const listingGrid = document.getElementById('listing-grid');
+const contactForm = document.querySelector('.contact-form');
+
+if (contactForm) {
+  contactForm.addEventListener('submit', (event) => {
+    event.preventDefault();
+    contactForm.reset();
+    alert('Thanks for reaching out! Danny and the Voro team will respond within one business day.');
+  });
+}
+
+function filterListings(type) {
+  const cards = listingGrid.querySelectorAll('.listing-card');
+  cards.forEach((card) => {
+    const match = type === 'all' || card.dataset.type === type;
+    card.style.display = match ? 'block' : 'none';
+  });
+}
+
+tabs.forEach((tab) => {
+  tab.addEventListener('click', () => {
+    tabs.forEach((btn) => {
+      btn.classList.remove('active');
+      btn.setAttribute('aria-pressed', 'false');
+    });
+    tab.classList.add('active');
+    tab.setAttribute('aria-pressed', 'true');
+    filterListings(tab.dataset.filter);
+  });
+});
+
+filterListings('all');
