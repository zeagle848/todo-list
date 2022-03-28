function generateID() {
  return Math.floor(Math.random() * 10000 + 1).toString();
}

export default function TodoItem({
  name,
  description,
  priority,
  dueDate,
  project,
  isComplete,
  id = generateID(),
}) {
  return {
    id,
    name,
    description,
    priority,
    dueDate,
    project,
    isComplete,
  };
}
