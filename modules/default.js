export default {
    returnwholeprice: (whole, sub) => {
      if (!whole || !sub) return null;
      return `${whole}${sub}`;
    },
  };
  