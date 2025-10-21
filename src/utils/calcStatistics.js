

// priority: low = 1, medium = 5, high = 8
// difficulty: easy = 1, medium = 3, hard = 5
const points = {
    low: 2,
    medium: 5,
    high: 8,
    easy: 1,
    medium_difficulty: 3,
    hard: 5,
}
export function calculteYourProgress(todos) {
    if (todos.length === 0) return 0;
    let totalPoints = 0;
    let earnedPoints = 0;
    todos.forEach((task) => {
        if (task.status === 'completed') {
            earnedPoints += points[task.priority] + points[task.difficulty === 'medium' ? 'medium_difficulty' : task.difficulty];
        }
        totalPoints += points[task.priority] + points[task.difficulty === 'medium' ? 'medium_difficulty' : task.difficulty];

    
    });
    return Math.round((earnedPoints / totalPoints) * 100);

}