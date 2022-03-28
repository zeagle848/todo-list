import Project from './Project';
import TodoItem from './TodoItem';

export function getDefaultState() {
  const todoItems = [];
  const projects = [];

  const today = new Date();
  const fullYear = today.getFullYear();
  const fullMonth = `0${today.getMonth() + 1}`.slice(-2);
  const fullDay = `0${today.getDate()}`.slice(-2);
  const currentDate = `${fullYear}-${fullMonth}-${fullDay}`;

  projects.push(Project({ name: 'Garden' }));
  projects.push(Project({ name: 'Work' }));
  projects.push(Project({ name: 'Play' }));

  todoItems.push(
    TodoItem({
      name: 'Mow the lawn',
      description: 'Can be done with the new lawnmower',
      priority: 'low',
      dueDate: currentDate,
      project: 'Garden',
      isComplete: false,
      id: 8673,
    })
  );

  todoItems.push(
    TodoItem({
      name: 'Plant the roses',
      description: 'Only plant on the stoep',
      priority: 'medium',
      dueDate: '2022-01-03',
      project: 'Garden',
      isComplete: false,
      id: 643,
    })
  );

  todoItems.push(
    TodoItem({
      name: 'Cut down the tree',
      description: 'Call 072 987 2628',
      priority: 'high',
      dueDate: '2022-01-09',
      project: 'Garden',
      isComplete: false,
      id: 3248,
    })
  );

  todoItems.push(
    TodoItem({
      name: 'Call Mike',
      description: 'Call to organize meeting with Jill',
      priority: 'high',
      dueDate: '2022-10-21',
      project: 'Work',
      isComplete: false,
      id: 6642,
    })
  );

  todoItems.push(
    TodoItem({
      name: 'Do taxes',
      description: 'From January to February',
      priority: 'medium',
      dueDate: currentDate,
      project: 'Work',
      isComplete: false,
      id: 8406,
    })
  );

  todoItems.push(
    TodoItem({
      name: 'Buy more paperclips',
      description: 'James needs paperclips too',
      priority: 'low',
      dueDate: '2022-10-20',
      project: 'Work',
      isComplete: false,
      id: 246,
    })
  );

  todoItems.push(
    TodoItem({
      name: 'Beat little Ricky',
      description: 'Need to level up to level 67 in borderlands to do this',
      priority: 'low',
      dueDate: currentDate,
      project: 'Play',
      isComplete: false,
      id: 890,
    })
  );

  todoItems.push(
    TodoItem({
      name: 'Learn Invoker',
      description: 'Have to learn more heroes',
      priority: 'medium',
      dueDate: '2022-10-16',
      project: 'Play',
      isComplete: false,
      id: 1199,
    })
  );

  todoItems.push(
    TodoItem({
      name: 'Buy Death Trash',
      description: 'Have to support the developers',
      priority: 'high',
      dueDate: '2022-10-14',
      project: 'Play',
      isComplete: false,
      id: 4121,
    })
  );

  return { todoItems, projects };
}
