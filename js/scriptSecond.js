$("#contact-form").validate({
  rules: {
    imePrezime: {
      minlength: 4,
    },
    imeKompanija: {
      minlength: 2,
    },
    email: {
      email: true,
    },
    telefon: {
      number: true,
      minlength: 8,
      maxlength: 9,
    },
  },
  messages: {
    imePrezime: {
      required: "Внесете го вашето име.",
      minlength: "Име и презиме мора да има минимум 4 букви.",
    },
    imeKompanija: {
      required: "Внесете го името на вашата компанија.",
      minlength: "Име на компанија мора да има минимум 2 букви.",
    },
    email: "Внесете контакт е-пошта.",
    telefon: "Внесете го вашиот контакт телефон.",
    tipStudenti: "Одберете тип на студент.",
  },
  submitHandler: function (form) {
    form.submit();
  },
});
