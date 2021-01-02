import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import { CurrentWorker, WorkerModel } from './models/worker.models';
import { Worker } from 'src/app/shared/models/worker.model';
import { WorkerService } from 'src/app/services/worker.service';
import { Team } from 'src/app/shared/models/team.model';
import { TeamsService } from 'src/app/services/teams.service';
import { Role } from 'src/app/shared/models/role.model';
import { RolesService } from 'src/app/services/roles.service';
import { Status } from 'src/app/shared/models/status.model';
import { StatusService } from 'src/app/services/status.service';
import { UserService } from 'src/app/services/identity/user.service';
import { User } from 'src/app/shared/models/user.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FilterModel } from 'src/app/shared/models/filterModel.model';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {

  public workerForm: FormGroup;
  public filterForm: FormGroup;
  public photoFile: File;
  public preview: string;
  public worker = new WorkerModel();
  public workerList = new Array<Worker>();
  public currentWorker = new CurrentWorker();
  public filterModel = new FilterModel();
  public filter = '';
  public statusToFilter = '';
  public teamToFilter = '';
  public teams = new Array<Team>();
  public roles = new Array<Role>();
  public status = new Array<Status>();
  public hasMore = true;
  public currentPage = 1;
  private user$: Observable<User>;
  private admin: boolean;
  private currentUser: string;
  /// To customize config read this => https://www.npmjs.com/package/ng-multiselect-dropdown
  public dropdownSettingsTeams: IDropdownSettings;
  public dropdownSettingsRoles: IDropdownSettings;
  /// To customize config read this => https://www.tutorialspoint.com/ngx_bootstrap/ngx_bootstrap_datepicker.htm
  public bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private workerService: WorkerService,
    private teamService: TeamsService,
    private roleService: RolesService,
    private statusService: StatusService,
    private userService: UserService,
  ) { }


  getAllWorkers(): Array<Worker> {
    this.workerService.getAllWorkers(this.filterModel)
      .subscribe(response => {
        this.workerList = response.data;
      }, () => {
        this.toastrService.warning('400 😥');
        this.router.navigate(['']);
      });
    return this.workerList;
  }

  getCurrentWorkerInfo(): CurrentWorker {
    this.workerService.getWorkerByUserName(this.currentUser)
      .subscribe(response => {
        this.currentWorker = response;
      }, () => {
        this.toastrService.warning('400 😥');
      });
    return this.currentWorker;
  }

  public concatNames(teams: Array<Team>): string {
    if (teams === null || teams === undefined) {
      return '';
    } else {
      return teams.map(x => x.name).join(', ');
    }
  }

  getTeams(): Array<Team> {
    this.teamService.getAllTeams()
      .subscribe(response => {
        this.teams = response;
      }, err => {
        err.error.errorMessages.forEach(
          (msg: string) => this.toastrService.error(msg)
        );
      });
    return this.teams;
  }

  getRoles(): Array<Role> {
    this.roleService.getAllRoles()
      .subscribe(response => {
        this.roles = response;
      }, err => {
        err.error.errorMessages.forEach(
          (msg: string) => this.toastrService.error(msg)
        );
      });
    return this.roles;
  }

  getStatus(): Array<Status> {
    this.statusService.getAllStatus()
      .subscribe(response => {
        this.status = response;
      }, err => {
        err.error.errorMessages.forEach(
          (msg: string) => this.toastrService.error(msg)
        );
      });
    return this.status;
  }

  filterResults(keyword: string): void {
    this.filterModel.keyword = keyword;
    this.workerService.getAllWorkers(this.filterModel)
      .subscribe(response => {
        this.workerList = response.data;
      }, err => {
        err.error.errorMessages.forEach(
          (msg: string) => this.toastrService.error(msg)
        );
      });
  }

  applyFilter(): Array<Worker> {
    this.teamToFilter = this.filterForm.get('teams').value;
    this.statusToFilter = this.filterForm.get('status').value;

    this.filterModel.role = '';
    this.filterModel.status = this.statusToFilter;
    this.filterModel.team = this.teamToFilter;

    this.workerService.getAllWorkers(this.filterModel)
      .subscribe(response => {
        this.workerList = response.data;
      }, () => {
        this.toastrService.warning('400 😥');
        this.router.navigate(['']);
      });
    return this.workerList;
  }

  loadMore(): void {
    this.workerService.getAllWorkers(this.filterModel, ++this.currentPage)
      .subscribe(response => {
        this.workerList.push(...response.data);
        if (!response.data.length) {
          this.hasMore = false;
        }
      }, err => {
        err.error.errorMessages.forEach(
          (msg: string) => this.toastrService.error(msg)
        );
      });
  }

  private getAllInfo(): any {

    this.getTeams();
    this.getRoles();
    this.getStatus();
    this.getAllWorkers();
  }

  private setConfigs(): void {
    this.dropdownSettingsTeams = {
      singleSelection: false,
      idField: 'teamId',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      enableCheckAll: true,
    };

    this.dropdownSettingsRoles = {
      singleSelection: true,
      idField: 'roleId',
      textField: 'roleName',
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.bsConfig = {
      startView: 'year',
      isAnimated: true,
      adaptivePosition: true
    };

    this.workerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
      role: ['', Validators.required],
      team: ['', Validators.required],
      file: ['', Validators.required],
    });

    this.filterForm = this.formBuilder.group({
      status: [''],
      teams: [''],
    });
  }

  private getCurrentUserInfo(): void {
    this.user$ = this.userService.getUser();
    this.user$.subscribe(u => {
      this.currentUser = u.email;
      this.admin = 'True' === u.admin;
    });
  }

  ngOnInit(): void {
    this.setConfigs();
    this.getCurrentUserInfo();
    this.getCurrentWorkerInfo();
    this.getAllInfo();
  }



  createWorker(): void {

    const worker = new WorkerModel();
    worker.firstName = this.workerForm.get('firstName').value;
    worker.lastName = this.workerForm.get('lastName').value;
    worker.email = this.workerForm.get('email').value;
    worker.birthday = this.workerForm.get('birthday').value;
    worker.roleId = this.workerForm.get('role').value[0].roleId;
    worker.teamId = this.workerForm.get('team').value.map(x => x.teamId);
    // tslint:disable-next-line: max-line-length
    worker.photoUrl = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`; // TODO: photoFile; new Blob([this.photoFile], { type: 'image/*' });

    this.workerService.createWorker(worker).subscribe(result => {
      if (result.commandResponse === null || result.commandResponse === undefined) {
        this.toastrService.info(`${result.infoMessage?.message}`);
      } else {
        this.toastrService.success(`${result.commandResponse}`);
      }
      this.getAllWorkers();
    }, err => {
      if (err.error?.traceId === undefined) {
        this.toastrService.error(err.error, '🚫Action denied🚫');
      } else {
        const validationName = Object.keys(err.error.errors);
        const validationMessage = Object.values(err.error.errors);
        validationName.forEach(errorValitation =>
          this.toastrService.error(
            validationMessage.shift().toString(),
            errorValitation
          ));
      }
    });
  }
}
