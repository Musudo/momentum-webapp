import {TStatCardProps} from "../../components/dashboard/homeView/StatCard.tsx";
import {IActivity} from "../../types/models/IActivity.ts";
import {ITask} from "../../types/models/ITask.ts";
import {IEmail} from "../../types/models/IEmail.ts";

export const mapActivitiesToStatCard = (activities: IActivity[]): TStatCardProps => {
    return {
        title: 'Activities Stat',
        value: activities.length,
        trend: 'neutral',
        interval: 'Last month',
        data: createEntityData(activities, activity => new Date(activity.createdAt)),
        month: new Date(activities[0]?.createdAt).getMonth() + 1,
        year: new Date(activities[0]?.createdAt).getFullYear()
    };
};

export const mapEmailsToStatCard = (emails: IEmail[]): TStatCardProps => {
    return {
        title: 'Emails Stat',
        value: emails.length,
        trend: 'neutral',
        interval: 'Last month',
        data: createEntityData(emails, email => new Date(email.createdAt)),
        month: new Date(emails[0]?.createdAt).getMonth() + 1,
        year: new Date(emails[0]?.createdAt).getFullYear()
    };
}

export const mapTasksToStatCard = (tasks: ITask[]): TStatCardProps => {
    return {
        title: 'Tasks Stat',
        value: tasks.length,
        trend: 'neutral',
        interval: 'Last month',
        data: createEntityData(tasks, task => new Date(task.createdAt)),
        month: new Date(tasks[0]?.createdAt).getMonth() + 1,
        year: new Date(tasks[0]?.createdAt).getFullYear()
    };
}

/**
 * Creates a data array representing the count of entities (with date fields) for the last `days` days.
 * Each index corresponds to a day: index 0 is `days - 1` days ago and the last index is today.
 *
 * @param entities Array of generic entities.
 * @param getDate Function that returns a Date from an entity.
 * @returns An array of counts per day.
 */
const createEntityData = <T>(
    entities: T[],
    getDate: (entity: T) => Date
): number[] => {
    if (entities.length === 0) return [];

    // Use the first entity's date to determine the target month and year.
    const firstEntityDate = new Date(getDate(entities[0]));
    firstEntityDate.setHours(0, 0, 0, 0);
    const targetMonth = firstEntityDate.getMonth();
    const targetYear = firstEntityDate.getFullYear();

    // Determine the number of days in the target month.
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
    const counts = new Array(daysInMonth).fill(0);

    // Count each entity that belongs to the same month and year.
    entities.forEach(entity => {
        const entityDate = new Date(getDate(entity));
        entityDate.setHours(0, 0, 0, 0);

        if (
            entityDate.getMonth() === targetMonth &&
            entityDate.getFullYear() === targetYear
        ) {
            // Convert day (1-indexed) to zero-based index.
            counts[entityDate.getDate() - 1]++;
        }
    });

    return counts;
};
