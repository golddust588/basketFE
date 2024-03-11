const validation = (question_title: string, question_text: string) => {
  try {
    const titlePattern = /^.{10,200}$/;
    const textPattern = /^.{10,1000}$/;

    if (!titlePattern.test(question_title)) {
      alert("Please enter question title. At least 10 symbols.");
      return false;
    } else if (!!question_text && !textPattern.test(question_text)) {
      alert("Question text is at least 10 symbols");
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export default validation;
