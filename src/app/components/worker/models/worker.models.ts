import { Team } from 'src/app/shared/models/team.model';

export class WorkerModel {
    firstName: string;
    lastName: string;
    email: string;
    birthday: Date;
    photoUrl: string;
    roleId: number;
    teamId: number;
}

export class CurrentWorker {
    workerId: string;
    firstName: string;
    lastName: string;
    email: string;
    birthday: Date;
    photoUrl: string;
    teamId: number;
    status: string;
    statusId: number;
    role: string;
    roleId: number;
    lastModificationTime: Date;
    isBirthdayToday: boolean;
    teams: Array<Team>;
}
