exports.scoreToProficiency = (score) => {
  const s = parseInt(score, 10);
  if (isNaN(s)) throw new Error("Invalid score");
  if (s < 0 || s > 100) throw new Error("proficiencyScore must be 0-100");

  if (s <= 39) return "Beginner";
  if (s <= 69) return "Intermediate";
  if (s <= 89) return "Advanced";
  return "Expert";
};
