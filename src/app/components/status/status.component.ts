import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/services/status.service';
import { Status } from 'src/app/shared/models/status.model';
import { StatusModel } from './models/status.model';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  public status = new StatusModel();
  public statusResponse = new Array<Status>();

  constructor(
    public statusService: StatusService,
  ) { }

  deleteStatus(id: string): void {
    this.statusService.deleteStatus(id)
    .subscribe(result => {
      console.log(result);
      this.getAll();
    });
  }

  createStatus(): void {
    this.statusService.createStatus(this.status)
      .subscribe(result => {
        this.getAll();
      });
  }

  getAll(): Array<Status> {
    this.statusService.getAllStatus()
      .subscribe(data => {
        this.statusResponse = data;
      });
    return this.statusResponse;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
