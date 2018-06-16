export function formatQuestion(question, author, authedUser) {
  const { id, timestamp, optionOne, optionTwo } = question;
  const { name, avatarURL } = author;

  return {
    name,
    id,
    avatar: avatarURL,
    timestamp,
    optionOne,
    optionTwo
  };
}
