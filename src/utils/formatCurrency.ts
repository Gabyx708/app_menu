const formatCurrency = (number:number) => {

    const formattedTotal = number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formattedTotal;
}

export default formatCurrency;