const validation = (question_title: string, question_text?: string) => {
  try {
    const titlePattern = /^.{10,200}$/;
    const textPattern = /^.{10,1000}$/;

    if (!titlePattern.test(question_title)) {
      alert("Prašome užrašyti temos pavadinimą. Mažiausiai 10 simbolių.");
      return false;
    } else if (!!question_text && !textPattern.test(question_text)) {
      alert("Temos tekstas yra mažiausiai 10 simbolių.");
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export default validation;
