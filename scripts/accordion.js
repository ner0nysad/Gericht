const faqCards = document.querySelectorAll(".faq__card-title");

faqCards.forEach((card) => {
  card.addEventListener("click", function () {
    card.closest(".faq__card").classList.toggle("faq__card-open");
  });
});