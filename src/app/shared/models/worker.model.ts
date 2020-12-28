import { Team } from './team.model';

export interface WorkersResponse {
    pageSize: number;
    pageNumber: number;
    totalResults: number;
    data: Array<Worker>;
}

export interface Worker {
    workerId: string;
    firstName: string;
    lastName: string;
    email: string;
    birthday: Date;
    photoUrl: string;
    statusId: number;
    status: string;
    roleId: number;
    role: string;
    isActive: boolean;
    lastModificationTime: Date;
    isBirthdayToday: boolean;
    teams: Array<Team>;
}
