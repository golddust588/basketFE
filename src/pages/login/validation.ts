const validation = (email: string, password: string) => {
  try {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[0-9])[a-zA-Z0-9]{6,}$/;

    if (!emailPattern.test(email)) {
      alert("Please enter correct email or password");
      return false;
    } else if (!passwordPattern.test(password)) {
      alert("Please enter correct email or password");
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export default validation;
