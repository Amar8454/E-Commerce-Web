const displayCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumIntegerDigits: 2,
  });

  return formatter.format(num);
};

export default displayCurrency;
