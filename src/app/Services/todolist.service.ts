import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoList } from '../Entity/TodoList.model';

@Injectable({
  providedIn: 'root'
})

export class TodolistService {
  private url = 'http://localhost:8080/todoapp/';

  constructor(
   private http:HttpClient
  ) { }

  createTodo(todoListModel: TodoList){
    return this.http.post(this.url + "create" , todoListModel);
  }

  getTodoList(){
    return this.http.get<TodoList[]>(this.url + "list");
  }


  changeStatus(ids:number[] ,status:string){
    return this.http.get<number[]>(this.url + "statuschange/updateall?ids=" + ids + "&status=" + status);

  }

  updateAllDataById(ids:number[], status: string) {
    return this.http.get<number[]>(this.url + "data/updateAll?ids="+ids+"&status="+status);
  }

  deleteById(id:number){
    return this.http.delete(this.url + "deletebyid/" + id)
  }

}
