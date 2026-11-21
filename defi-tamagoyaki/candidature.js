const subject = document.querySelector('#entry-subject');
const template = document.querySelector('#entry-template');
const feedback = document.querySelector('#entry-feedback');
const prepare = document.querySelector('#prepare-entry');

document.querySelector('#copy-entry').addEventListener('click', async () => {
  const text = `Objet : ${subject.textContent}\n\n${template.value}`;
  try {
    await navigator.clipboard.writeText(text);
    feedback.textContent = 'Le modèle et son objet ont été copiés.';
  } catch {
    template.focus();
    template.select();
    feedback.textContent = 'Le corps du message est sélectionné. Copie-le avec la commande de ton appareil, puis reprends l’objet indiqué au-dessus.';
  }
});

prepare.addEventListener('click', () => {
  if (template.value.includes('[VERSION À CONFIRMER]')) {
    feedback.textContent = 'La version du règlement est encore en préparation.';
    return;
  }
  const emailSubject = encodeURIComponent(subject.textContent);
  const body = encodeURIComponent(template.value);
  window.location.href = `mailto:${prepare.dataset.recipient}?subject=${emailSubject}&body=${body}`;
});
