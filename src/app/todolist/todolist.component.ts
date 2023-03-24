import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TodoList } from '../Entity/TodoList.model';
import { TodolistService } from '../Services/todolist.service';
import Swal from 'sweetalert2';
import { StorageService } from '../Services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent implements OnInit {
  todoListForm!: FormGroup;

  listOfTodos!: TodoList[];

  // ==============Table Properties===========
  datasource: any;
  displayedColumns: string[] = ['select', 'todoDetails', 'status', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sorting!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue;
  }

  onSelect(status: any) {
    if (this.selectedIDs.length <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Item is not selected!',
        text: 'Please select at least an item to change The status.',
      });
    } else if (status == 'pending') {
      this.todoService
        .changeStatus(this.selectedIDs, 'pending')
        .subscribe((data) => {
          this.ngOnInit();
          this.selectedIDs = [];
        });
    } else if (status == 'done') {
      this.todoService
        .changeStatus(this.selectedIDs, 'done')
        .subscribe((data) => {
          this.ngOnInit();
          this.selectedIDs = [];
        });
    }
  }

  // ==============Table Properties===========

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodolistService,
    private storage: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todoListForm = this.formBuilder.group({
      todoID: [],
      todoDetails: [''],
      status: [''],
    });

    this.getTodoList();
    this.getRole();
  }

  TodoStatus = 'pending';
  createTodo() {
    this.todoListForm.value.status = this.TodoStatus;
    this.todoService.createTodo(this.todoListForm.value).subscribe((data) => {
      this.ngOnInit();
    });
  }

  getTodoList() {
    this.todoService.getTodoList().subscribe((data: TodoList[]) => {
      this.listOfTodos = data;

      // ===========data table properties===============
      this.datasource = new MatTableDataSource<TodoList>(this.listOfTodos);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sorting;
    });
  }

  selectedIDs: number[] = [];
  tableCheckbox(todoId: number, check: any) {
    if (check) {
      this.selectedIDs.push(todoId);
    } else {
      const index = this.selectedIDs.indexOf(todoId);
      if (index > -1) {
        this.selectedIDs.splice(index, 1);
      }
    }
  }

  deleteByID(id: number) {
    this.todoService.deleteById(id).subscribe((data: any) => {
      this.ngOnInit();
    });
  }

  delAlert(id: number) {
    Swal.fire({
      title: 'Are you sure!',
      text: 'You want to delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        this.deleteByID(id);
        Swal.fire('Removed', 'Your Data Has Been Deleted!', 'error');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Product still in our database.', 'error');
      }
    });
  }

  markAsDone(id: number) {

    Swal.fire({
      title: 'Are you sure to change status!',
      text: 'Have you finished the task?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {

        this.selectedIDs.splice(0);
        this.selectedIDs.push(id);
        this.todoService
          .changeStatus(this.selectedIDs, 'done')
          .subscribe((data) => {
            this.ngOnInit();
          });
        Swal.fire('Success!', 'Your Task is marked as Completed!', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Product still in our database.', 'error');
      }
    });






   
  }

  adminPanel = false;
  getRole() {
    if (this.storage.getRole() == 'admin') {
      this.adminPanel = true;
    }
  }

  logOut() {
    this.storage.clearData();
    this.router.navigateByUrl('/login');
  }
}
