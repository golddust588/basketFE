const validation = (email: string, password: string, name: string) => {
  try {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordPattern = /^(?=.*[0-9])[a-zA-Z0-9]{6,}$/;
    const namePattern = /^[a-zA-Z0-9]{3,25}$/;

    if (!emailPattern.test(email)) {
      alert("Please enter correct email");
      return false;
    } else if (!passwordPattern.test(password)) {
      alert("Password must contain at least 5 letters and a number");
      return false;
    } else if (!namePattern.test(name)) {
      alert(
        "Name must be from 3 to 25 characters long and contain letters or numbers"
      );
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export default validation;
