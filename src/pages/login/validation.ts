const validation = (email: string, password: string) => {
  try {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[0-9])[a-zA-Z0-9]{6,}$/;

    if (!emailPattern.test(email)) {
      alert("Neteisingas el. paštas arba slaptažodis");
      return false;
    } else if (!passwordPattern.test(password)) {
      alert("Neteisingas el. paštas arba slaptažodis");
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export default validation;
