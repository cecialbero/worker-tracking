import { Team } from 'src/app/shared/models/team.model';

export class OtherUsersInfoResponse {
    pageNumber: number;
    totalResults: number;
    pageSize: number;
    orderBy: null;
    data: Array<WorkerInfo>;
}

export class WorkerInfo {
    workerId: string;
    firstName: string;
    lastName: string;
    email: string;
    birthday: Date;
    photoUrl: string;
    statusId: number;
    statusName: string;
    roleId: number;
    role: string;
    lastModificationTime: Date;
    isBirthdayToday: boolean;
    teams: Array<Team>;
}

// export class Team {
//     teamId: string;
//     name: string;
// }
