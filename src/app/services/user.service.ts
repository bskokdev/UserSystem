import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:3000/users"
  }

  // http GET (baseUrl/users)
  // gets all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // gets users sorted by their creation date
  getSortedUsersByDate(): Observable<User[]> {
    return this.getUsers().pipe(map(value => {
      return value.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      })
    }));
  }

  // http GET (baseUrl/users/{id}
  // gets single user by his id
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`)
  }

  // http POST (baseUrl/users)
  // adds a user
  addUser(user: User): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  // http DELETE (baseUrl/users/{id}
  // removes a user by his id
  removeUser(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
  }
}
