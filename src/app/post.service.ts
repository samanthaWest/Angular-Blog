import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from './BlogPost'
import { Observable } from 'rxjs';

const perPage = 6;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(page,tag,category): Observable<BlogPost[]>{
    let url = `https://assign-5-backend.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`
    if(tag) url += `&tag=${tag}`;
    if(category) url += `&category=${category}`
    
    return this.http.get<BlogPost[]>(url);
  }

  getPostById(id): Observable<BlogPost>{
    return this.http.get<BlogPost>(`https://assign-5-backend.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any>{
    return this.http.get<any>('https://assign-5-backend.herokuapp.com/api/categories/');
  } 

  getTags(): Observable<string[]>{
    return this.http.get<string[]>('https://assign-5-backend.herokuapp.com/api/tags/');
  } 

  getAllPosts(): Observable<BlogPost[]> {
    let maxInteger = Number.MAX_SAFE_INTEGER;
    return this.http.get<BlogPost[]>(`https://assign-5-backend.herokuapp.com/api/posts?page=1&perPage=${maxInteger}`);
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://assign-5-backend.herokuapp.com/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://assign-5-backend.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`https://assign-5-backend.herokuapp.com/api/posts/${id}`);
  }

}